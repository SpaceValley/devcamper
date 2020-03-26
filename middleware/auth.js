const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errors = require('../errors');
const User = require('../models/User');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if(req.cookies.token) token = req.cookies.token

  //Make sure token exists
  if(!token) return next(errors.NO_ACCESS_TO_ROUTE)

  try {
  //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id)
  }
  catch (e) {
     return next(errors.NO_ACCESS_TO_ROUTE)
  }
});
