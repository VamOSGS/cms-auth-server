require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Koa = __webpack_require__(2);

const app = new Koa();
const routes = __webpack_require__(3);
// eslint-disable-next-line global-require
if (false) require('dotenv').config();

const { PORT, HOST } = process.env;

app.use(routes);
app.listen(PORT, () => {
  console.log(`started in http://${HOST}:${PORT}`);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const { combineRouters } = __webpack_require__(4);
const root = __webpack_require__(7);

const routes = combineRouters([root]);

module.exports = routes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const combineRouters = __webpack_require__(5);

module.exports = {
  combineRouters
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const compose = __webpack_require__(6);

module.exports = function combine(routers) {
  if (!Array.isArray(routers)) throw Error('Argument of combine() must be array of Routers');
  let middleware = [];
  routers.forEach(router => {
    middleware = [...middleware, router.routes(), router.allowedMethods()];
  });
  return compose(middleware);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(8);
const koaBody = __webpack_require__(9);

const root = new Router();
// eslint-disable-next-line global-require
if (false) require('dotenv').config();

const { PASSWORD, USERNAME, SECRET } = process.env;
root.get('/', async ctx => {
  ctx.body = '<h2>Working..</h2>';
});

root.post('/auth', koaBody(), async ctx => {
  const { password, username } = ctx.request.body;
  if (username !== USERNAME) {
    ctx.response.body = { success: false, message: 'Wrong username!' };
  } else if (password !== PASSWORD) {
    ctx.response.body = { success: false, message: 'Wrong password!' };
  } else {
    ctx.response.body = { success: true, message: 'Logged in!', data: { secret: SECRET } };
  }
});

module.exports = root;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map