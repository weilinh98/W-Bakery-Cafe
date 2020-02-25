require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "image",
          "name",
          "price",
          "productId",
          "shortDescription"
    from "products"`;
  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/products/:productId', (req, res, next) => {
  const id = req.params.productId;
  const params = [id];
  const sql = `
    select *
      from "products"
      where "productId" = $1;`;
  db.query(sql, params)
    .then(response => {
      if (response.rows.length === 0) {
        next(new ClientError(`cannot find the matching product with id ${id}`, 404));
      } else {
        res.json(response.rows[0]);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1`;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(response => {
        res.json(response.rows);
      })
      .catch(err => { next(err); });
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  const quantity = parseInt(req.body.quantity);
  const condition = req.body.condition;
  if (Number.isInteger(productId) && productId > 0) {
    const sql = `
      select "price"
        from "products"
        where "productId" = $1`;
    const params = [productId];
    db.query(sql, params)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError(
            `Cannot Find Product with productId ${productId}`,
            400
          );
        } else if (req.session.cartId) {
          const cartWithPrice = {
            price: response.rows[0].price,
            newCartId: req.session.cartId
          };
          return cartWithPrice;
        } else {
          const sql = `
            insert into "carts" ("cartId", "createdAt")
              values (default, default)
              returning "cartId"`;
          return db.query(sql).then(result => {
            const cartWithPrice = {};
            cartWithPrice.price = response.rows[0].price;
            cartWithPrice.newCartId = result.rows[0].cartId;
            req.session.cartId = cartWithPrice.newCartId;
            return cartWithPrice;
          });
        }
      })
      .then(response => {
        const cartWithPrice = response;
        const sql = `
          select *
            from "cartItems"
            where "cartId" = $1 and "productId" = $2`;
        const params = [cartWithPrice.newCartId, productId];

        return db.query(sql, params).then(response => {
          const existingProduct = response.rows[0];
          if (!response.rows.length) {
            const sql = `
          insert into "cartItems" ("cartId", "productId", "price", "quantity")
          values ($1, $2, $3, $4)
          returning "cartItemId"`;
            const params = [
              cartWithPrice.newCartId,
              productId,
              cartWithPrice.price,
              quantity
            ];
            return db.query(sql, params).then(result => {
              const cartItemId = result.rows[0].cartItemId;
              return cartItemId;
            });
          } else {
            const sql = `
              update "cartItems"
                set "quantity" = $1
                where "cartId" = $2 and "productId" = $3
                returning "cartItemId"`;
            let newQuantity = null;
            if (condition === 'add') {
              newQuantity = existingProduct.quantity + 1;
            } else {
              newQuantity = quantity;
            }
            const params = [newQuantity, cartWithPrice.newCartId, productId];
            return db.query(sql, params).then(result => {
              const cartItemId = result.rows[0].cartItemId;
              return cartItemId;
            });
          }
        });
      })
      .then(response => {
        const cartItemId = response;
        const sql = `
        select "c"."cartItemId",
                "c"."price",
                "c"."quantity",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1`;
        const params = [cartItemId];
        return db.query(sql, params).then(response => {
          const cartProduct = response.rows[0];
          res.status(200).json(cartProduct);
        });
      })
      .catch(err => {
        next(err);
      });
  }
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    next(new ClientError('Cannot find your cart to place order', 400));
  } else {
    const { firstName, lastName, emailAddress, phoneNumber, nameOnCard, creditCardNumber, city, state, zipCode, country, mm, yy, cvv, shippingAddress } = req.body;
    if (firstName && lastName && emailAddress && phoneNumber && nameOnCard && creditCardNumber && city && state && zipCode && country && mm && yy && cvv && shippingAddress) {
      const sql = `
        insert into "orders" ("firstName", "lastName", "emailAddress", "phoneNumber", "nameOnCard", "creditCardNumber", "city", "state", "zipCode", "country", "mm", "yy", "cvv", "shippingAddress", "cartId")
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          returning *
          `;
      const params = [firstName, lastName, emailAddress, phoneNumber, nameOnCard, creditCardNumber, city, state, zipCode, country, mm, yy, cvv, shippingAddress, req.session.cartId];
      console.log(params);
      db.query(sql, params)
        .then(response => {
          if (response.rows.length !== 0) {
            delete req.session.cartId;
            res.json(response.rows[0]);
          }
        })
        .catch(err => { next(err); });
    } else {
      next(new ClientError('Please Enter Full Information to Proceed', 400));
    }
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
