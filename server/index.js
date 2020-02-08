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
  if (Number.isInteger(productId) && productId > 0) {
    const sql = `
      select "price"
        from "products"
        where "productId" = $1`;
    const params = [productId];
    db.query(sql, params)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError(`Cannot Find Product with productId ${productId}`, 400);
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
          return db.query(sql)
            .then(result => {
              const cartWithPrice = {};
              cartWithPrice.price = response.rows[0].price;
              cartWithPrice.newCartId = result.rows[0].cartId;
              return cartWithPrice;
            });
        }
      })
      .then(response => {
        req.session.cartId = response.newCartId;
        const sql = `
          insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"`;
        const params = [response.newCartId, productId, response.price];
        return db.query(sql, params)
          .then(result => {
            const cartItemId = result.rows[0].cartItemId;
            return cartItemId;
          });
      })
      .then(response => {
        const cartItemId = response;
        const sql = `
        select "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1`;
        const params = [cartItemId];
        return db.query(sql, params)
          .then(response => {
            const cartProduct = response.rows[0];
            res.status(200).json(cartProduct);
          });
      })
      .catch(err => { next(err); });
  }
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    next(new ClientError('Cannot find your cart to place order', 400));
  } else {
    const info = req.body;
    if (info.name && info.creditCardNumber && info.shippingAddress) {
      if (isNaN(info.creditCardNumber)) {
        next(new ClientError('Please enter valid credit card number', 400));
      } else {
        const sql = `
        insert into "orders" ("name", "cartId", "creditCard", "shippingAddress")
        values($1, $2, $3, $4)
          returning *
          `;
        const params = [info.name, req.session.cartId, info.creditCardNumber, info.shippingAddress];
        db.query(sql, params)
          .then(response => {
            if (response.rows.length !== 0) {
              delete req.session.cartId;
              res.json(response.rows[0]);
            }
          })
          .catch(err => { next(err); });
      }
      const params = [info.name, req.session.cartId, info.creditCardNumber, info.shippingAddress];
      db.query(sql, params)
        .then(response => {
          if (response.rows.length !== 0) {
            delete req.session.cartId;
            res.json(response.rows[0]);
          }
        })
        .catch(err => { next(err); });
    } else {
      next(new ClientError('Please Enter Full Name, Credit Card and Shipping Address to Proceed', 400));
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
