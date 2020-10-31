const { User } = require('../../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'gender', 'createdAt', 'updatedAt'],
      },
    });

    if (users.length !== 0) {
      res.send({
        message: 'Fetching all users is success',
        data: users,
      });
    } else {
      res.send({
        message: 'Users is empty',
        data: users,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const id = req.params.id;
    // const { avatar } = req.body;
    const avatarFile = req.file;
    const url = req.protocol + '://' + req.get('host');

    // console.log('avatar: ', req.file);
    const user = await User.update(
      {
        avatar: `${url}/api/v1/${avatarFile.path}`,
      },
      {
        where: {
          id,
        },
      }
    );

    // console.log('user update: ', user);

    if (user[0]) {
      res.send({
        message: 'Photo profile has been successfully uploaded',
        data: user,
      });
    } else {
      res.status(404).send({
        error: {
          message: `User with id of ${id} does not exist`,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: {
        message: err.message,
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });

    console.log('delete: ', deletedUser);
    if (deletedUser) {
      res.send({
        message: 'User has been successfully deleted',
        data: {
          id,
        },
      });
    } else {
      res.send({
        message: `User with id: ${id} does not exist`,
        data: {
          id: '',
        },
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};
