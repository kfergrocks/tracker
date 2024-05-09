// import user model
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { handleErrors } = require('../utils/dbUtils');
const { signToken } = require('../utils/auth');

const checkPassword = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new Error('Passwords do not match');
  }

  const regularExpression =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;
  if (!regularExpression.test(password)) {
    throw new Error(
      'Password must be between 6 and 32 characters and contain 1 lower case, 1 uppercase, 1 number and 1 special character'
    );
  }
};

module.exports = {
  // get a single user by either their id or their username
  async createUser(req, res) {
    try {
      const newUser = { ...req.body };
      checkPassword(newUser.password, newUser.passwordConfirm);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      await User.create(newUser);
    } catch (e) {
      const respUser = { ...req.body };
      respUser.errors = handleErrors(e);
      res.status(500).json(respUser);
    }
    res.status(200).end();
  },

  async getUser(req, res) {
    let user;
    const options = {
      attributes: {
        where: {
          id: req.body.user_id,
        },
        exclude: ['password'],
      },
    };

    try {
      user = await User.findOne(options);
    } catch (e) {
      res.status(500).json(e);
    }
    res.status(200).json(user);
  },

  async updateUser(req, res) {
    let user;
    try {
      user = await User.findOne({
        where: {
          id: req.body.user_id,
        },
      });

      const newUser = { ...req.body };

      if (newUser.updatePassword) {
        const validPassword = await user.checkPassword(newUser.loginPw);
        if (!validPassword) {
          throw new Error('Invalid Password');
        }
        checkPassword(newUser.password, newUser.passwordConfirm);
        newUser.password = await bcrypt.hash(newUser.password, 10);
      } else {
        delete newUser.password;
      }

      if (isNaN(parseInt(newUser.schoolId)) || parseInt(newUser.schoolId) < 1) {
        throw new Error('Invalid School');
      }

      user.update(newUser, {
        where: {
          id: req.params.id,
        },
      });
    } catch (e) {
      const respUser = { ...req.body };
      respUser.errors = handleErrors(e);
      res.status(500).json(respUser);
    }
    res.status(200).json();
  },

  async loginUser(req, res) {
    console.log(JSON.stringify(req.body, null, '\t'));
    try {
      const userData = await User.findOne({
        where: { email: req.body.email },
      });

      if (!userData) {
        res.status(400).json({
          message: 'Incorrect email or password, please try again',
        });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect email or password, please try again',
        });
        return;
      }

      res.json({ token: signToken(userData) });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};
