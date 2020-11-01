const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      const hashedPw = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        password: hashedPw,
        role: ''
      });
      const result = await user.save();
      res.status(201).json({ message: 'User created!', user: result._id });
    }
    else {
      res.status(422).json({ message: 'User exists!', userId: userExist._id });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: 'User was not found!' });
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(422).json({ message: 'password did not match!' });
    }
    let token = null;
    let role = null;
    if(loadedUser.role === 'admin') {
       token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretforadmin',
        { expiresIn: '1h' }
      );
      role = 'admin';
    }
    else{
       token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      role = 'user';
    }
    res.status(200).json({
      userData: {
        token: token, 
        userId: loadedUser._id.toString(), 
        role:role
      },
      message: 'Successfully Logged In'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.body.userId;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(422).json({ message: 'User was not found!' });
    }
    else{
      res.status(201).json({
        message: 'User fetched',
        userData: user
      });
    }
  }
  catch(err) {
    console.log(err);
  }
}
