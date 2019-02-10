"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _campaignRouter = _interopRequireDefault(require("./routes/campaignRouter"));

var _contractRouter = _interopRequireDefault(require("./routes/contractRouter"));

var _freelancerRouter = _interopRequireDefault(require("./routes/freelancerRouter"));

var _contributionRouter = _interopRequireDefault(require("./routes/contributionRouter"));

var _installationRouter = _interopRequireDefault(require("./routes/installationRouter"));

var _authRouter = _interopRequireDefault(require("./routes/authRouter"));

var _userRouter = _interopRequireDefault(require("./routes/userRouter"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express.default)();
var port = process.env.PORT || 8080; // connect to database

_mongoose.default.connect(process.env.MONGOLAB_WHITE_URI || process.env.MONGODB_URI, {
  useNewUrlParser: true
});

var db = _mongoose.default.connection;
db.once("open", function () {
  return console.log("connected to the database");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(function (req, res, next) {
  // Expose the MongoDB database handle
  req.db = db;
  next();
});
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // TODO: CORS Restrictions - Remember to account for Mobile

app.use((0, _cors.default)()); // routes

app.use('/auth', _authRouter.default);
app.use('/user', _userRouter.default);
app.use('/api/campaigns', _campaignRouter.default);
app.use('/api/contracts', _contractRouter.default);
app.use('/api/contributions', _contributionRouter.default);
app.use('/api/freelancers', _freelancerRouter.default);
app.use('/api/installations', _installationRouter.default);
app.listen(port, function (err) {
  if (err) throw err;
  console.log("Ready on http://localhost:".concat(port));
});