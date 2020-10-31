const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;
const joi = require('@hapi/joi');

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.send({
      message: 'User Valid',
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, gender, email, password, phone, address } = req.body;
    console.log('body: ', req.body);
    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      gender: joi.string().required(),
      email: joi.string().email().min(6).required().email(),
      password: joi.string().min(6).required(),
      phone: joi.string().min(10).required(),
      address: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: `Email already been registered`,
        },
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      fullName,
      gender,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtkey
    );

    res.send({
      message: 'Your new account has been created successfully',
      data: {
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(6).required().email(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).send({
        error: {
          message: 'Email or Password is incorrect',
        },
      });
    }
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(401).send({
        error: {
          message: 'Email or Password is incorrect',
        },
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtkey
    );

    res.send({
      message: 'Login Success',
      data: {
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
};
