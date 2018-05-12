const Router = require('koa-router');
const koaBody = require('koa-bodyparser');

const root = new Router();
// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { PASSWORD, USERNAME } = process.env;
root.get('/', async (ctx) => {
  ctx.body = '<h2>Working..</h2>';
});

module.exports = root;
