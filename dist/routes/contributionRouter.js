"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _archetypeJs = _interopRequireDefault(require("archetype-js"));

var _contribution = _interopRequireDefault(require("../models/contribution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var contributionRouter = _express.default.Router(); // Wrap an async function so we catch any errors that might occur


var wrapAsync = function wrapAsync(handler) {
  return function (req, res) {
    return handler(req).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      return res.status(500).json({
        error: error.message
      });
    });
  };
};

contributionRouter.route('/').get(wrapAsync(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.db.collection('Contributions').find(req.query).sort({
              _id: 1
            }).toArray();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())).post(wrapAsync(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var contribution;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            contribution = new _contribution.default(req.body);
            _context2.next = 4;
            return req.db.collection('Contributions').insertOne(contribution);

          case 4:
            return _context2.abrupt("return", {
              contribution: contribution
            });

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));
contributionRouter.route('/:address').get(wrapAsync(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.db.collection('Contributions').findOne({
              address: req.params.address
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));
var _default = contributionRouter;
exports.default = _default;