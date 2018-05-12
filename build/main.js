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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Koa = __webpack_require__(3);

const app = new Koa();
const routes = __webpack_require__(4);
const cors = __webpack_require__(11);
// eslint-disable-next-line global-require
if (true) __webpack_require__(0).config();

const { PORT, HOST } = process.env;

app.use(cors());
app.use(routes);
app.listen(PORT, () => {
  console.log(`started in http://${HOST}:${PORT}`);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const { combineRouters } = __webpack_require__(5);
const root = __webpack_require__(8);

const routes = combineRouters([root]);

module.exports = routes;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const combineRouters = __webpack_require__(6);

module.exports = {
  combineRouters
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const compose = __webpack_require__(7);

module.exports = function combine(routers) {
  if (!Array.isArray(routers)) throw Error('Argument of combine() must be array of Routers');
  let middleware = [];
  routers.forEach(router => {
    middleware = [...middleware, router.routes(), router.allowedMethods()];
  });
  return compose(middleware);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(9);
const koaBody = __webpack_require__(10);

const root = new Router();
// eslint-disable-next-line global-require
if (true) __webpack_require__(0).config();

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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * CORS middleware
 *
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
 * @return {Function} cors middleware
 * @api public
 */
module.exports = function(options) {
  const defaults = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  options = Object.assign({}, defaults, options);

  if (Array.isArray(options.exposeHeaders)) {
    options.exposeHeaders = options.exposeHeaders.join(',');
  }

  if (Array.isArray(options.allowMethods)) {
    options.allowMethods = options.allowMethods.join(',');
  }

  if (Array.isArray(options.allowHeaders)) {
    options.allowHeaders = options.allowHeaders.join(',');
  }

  if (options.maxAge) {
    options.maxAge = String(options.maxAge);
  }

  options.credentials = !!options.credentials;
  options.keepHeadersOnError = options.keepHeadersOnError === undefined || !!options.keepHeadersOnError;

  return function cors(ctx, next) {
    // If the Origin header is not present terminate this set of steps.
    // The request is outside the scope of this specification.
    const requestOrigin = ctx.get('Origin');

    // Always set Vary header
    // https://github.com/rs/cors/issues/10
    ctx.vary('Origin');

    if (!requestOrigin) {
      return next();
    }

    let origin;

    if (typeof options.origin === 'function') {
      // FIXME: origin can be promise
      origin = options.origin(ctx);
      if (!origin) {
        return next();
      }
    } else {
      origin = options.origin || requestOrigin;
    }

    const headersSet = {};

    function set(key, value) {
      ctx.set(key, value);
      headersSet[key] = value;
    }

    if (ctx.method !== 'OPTIONS') {
      // Simple Cross-Origin Request, Actual Request, and Redirects
      set('Access-Control-Allow-Origin', origin);

      if (options.credentials === true) {
        set('Access-Control-Allow-Credentials', 'true');
      }

      if (options.exposeHeaders) {
        set('Access-Control-Expose-Headers', options.exposeHeaders);
      }

      if (!options.keepHeadersOnError) {
        return next();
      }
      return next().catch(err => {
        err.headers = Object.assign({}, err.headers, headersSet);
        throw err;
      });
    } else {
      // Preflight Request

      // If there is no Access-Control-Request-Method header or if parsing failed,
      // do not set any additional headers and terminate this set of steps.
      // The request is outside the scope of this specification.
      if (!ctx.get('Access-Control-Request-Method')) {
        // this not preflight request, ignore it
        return next();
      }

      ctx.set('Access-Control-Allow-Origin', origin);

      if (options.credentials === true) {
        ctx.set('Access-Control-Allow-Credentials', 'true');
      }

      if (options.maxAge) {
        ctx.set('Access-Control-Max-Age', options.maxAge);
      }

      if (options.allowMethods) {
        ctx.set('Access-Control-Allow-Methods', options.allowMethods);
      }

      let allowHeaders = options.allowHeaders;
      if (!allowHeaders) {
        allowHeaders = ctx.get('Access-Control-Request-Headers');
      }
      if (allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', allowHeaders);
      }

      ctx.status = 204;
    }
  };
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.map