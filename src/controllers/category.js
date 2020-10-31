const { Category } = require('../../models');

exports.getAllCategories = async (req, res) => {
  // console.log('user data: ', req.user);
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (categories) {
      res.send({
        message: 'Fetching all categories is success',
        data: categories,
      });
    } else {
      res.send({
        message: 'Categories is empty',
        data: categories,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    // console.log('category: ', category);

    if (category) {
      res.send({
        message: 'Fetching category is success',
        data: category,
      });
    } else {
      res.send({
        message: `Category with id: ${id} does not exist`,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.send({
      message: 'Category has been successfully added',
      data: {
        id: category.id,
        name: category.name,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await Category.update(req.body, {
      where: {
        id,
      },
    });

    if (update[0]) {
      res.send({
        message: 'Category has been successfully updated',
        data: {
          id,
          name: req.body.name,
        },
      });
    } else {
      res.send({
        message: `Category with id: ${id} does not exist`,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.destroy({
      where: {
        id,
      },
    });

    if (category) {
      res.send({
        message: 'Category has been successfully deleted',
        data: {
          id,
        },
      });
    } else {
      res.send({
        message: `Category with id: ${id} does not exist`,
        data: {
          id: '',
        },
      });
    }

    console.log('deleted: ', category);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
