const Router = require('koa-router');
const koaBody = require('koa-bodyparser');

const root = new Router();
// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { PASSWORD, USERNAME, SECRET } = process.env;
root.get('/', async (ctx) => {
  ctx.body = '<h2>Working..</h2>';
});

root.post('/auth', koaBody(), async (ctx) => {
  const { password, username } = ctx.request.body;
  if (username !== USERNAME) {
    ctx.response.body = { succes: false, message: 'Wrong username!' };
  } else if (password !== PASSWORD) {
    ctx.response.body = { succes: false, message: 'Wrong password!' };
  } else {
    ctx.response.body = { succes: true, message: 'Logged in!', data: { secret: SECRET } };
  }
});

module.exports = root;
