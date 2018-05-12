const Koa = require('koa');

const app = new Koa();
const routes = require('./routes');
const cors = require('@koa/cors');
// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { PORT, HOST } = process.env;

app.use(cors());
app.use(routes);
app.listen(PORT, () => {
  console.log(`started in http://${HOST}:${PORT}`);
});
