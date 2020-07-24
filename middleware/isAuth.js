const jwt = require('jsonwebtoken');

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
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    res.status(422).json({
        message: 'could not verify token',
        error: err
      });
  }
  if (!decodedToken) {
    console.log('not an registered user');
    // res.status(422).json({
    //     message: 'not authenticated'
    //   });
  }
  else{
    console.log('registered user entered');
    next();
  }
  
};
