"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authRouter = _express.default.Router();

var MetaAuth = require("meta-auth");

var metaAuth = new MetaAuth({
  banner: "Login to Furiosa"
});
authRouter.route('/:MetaAddress').get(metaAuth, function (req, res) {
  // Request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});
authRouter.route('/:MetaMessage/:MetaSignature').get(metaAuth,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.metaAuth && req.metaAuth.recovered)) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return req.db.collection('Users').findOneAndUpdate({
              address: req.metaAuth.recovered
            }, {
              $setOnInsert: {
                address: req.metaAuth.recovered,
                name: ''
              }
            }, {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true
            },
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(err, user) {
                var token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _jsonwebtoken.default.sign({
                          payload: {
                            user: user._id,
                            address: user.address
                          }
                        }, process.env.SECRET, {
                          expiresIn: '1d'
                        });

                      case 2:
                        token = _context.sent;
                        res.status(200).json({
                          success: 1,
                          jwt: token,
                          recovered: req.metaAuth.recovered
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
            _context2.next = 6;
            break;

          case 5:
            // Sig did not match, invalid authentication
            res.status(400).send();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = authRouter;
exports.default = _default;