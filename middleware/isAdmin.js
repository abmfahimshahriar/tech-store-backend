const jwt = require('jsonwebtoken');
const AllConstants = require('../shared/constants');



module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(422).json({
        message: 'not authenticated header'
      });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ADMIN_KEY || AllConstants.KeyConstants.AdminTokenKey);
  } catch (err) {
    res.status(422).json({
        message: 'could not verify token',
        error: err
      });
  }
  if (!decodedToken) {
    console.log('not an admin');
    // res.status(422).json({
    //     message: 'not authenticated'
    //   });
  }
  else{
    console.log('admin entered');
    next();
  }
  
};
