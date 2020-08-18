'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  ensureAuth: function ensureAuth(req, res, next) {
    req.user = true;
    next();
  },
  ensureAuthAdmin: function ensureAuthAdmin(req, res, next) {
    //var auth = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    //if(auth===req)
    req.user = true;
    next();
  }
}; //export default ensureAuthAdmin;

exports["default"] = _default;