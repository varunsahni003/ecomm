// const User = require('../models/user-model');
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt  = require('passport-jwt').ExtractJwt;
// const config = require('../config/config');
 
// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.secret
// }
 
// module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findById(jwt_payload.id, function (err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     });
// });