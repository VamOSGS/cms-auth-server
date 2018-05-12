const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const { createToken } = require('jwt-koa');

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
    ctx.response.body = { success: false, message: 'Wrong username!' };
  } else if (password !== PASSWORD) {
    ctx.response.body = { success: false, message: 'Wrong password!' };
  } else {
    const token = createToken({ tokenData: { secret: SECRET } });
    ctx.response.body = { success: true, message: 'Logged in!', data: { secret: SECRET, token } };
  }
});

module.exports = root;
