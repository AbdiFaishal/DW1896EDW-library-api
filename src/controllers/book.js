const { Book, Category, User } = require('../../models');
const { Op } = require('sequelize');

const bookResponse = async (id) => {
  try {
    return await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: [
          'categoryId',
          'userId',
          'CategoryId',
          'UserId',
          'createdAt',
          'updatedAt',
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: [
          'categoryId',
          'userId',
          'createdAt',
          'updatedAt',
          'CategoryId',
          'UserId',
        ],
      },
    });

    if (books.length !== 0) {
      res.send({
        message: 'Fetching all books is success',
        data: books,
      });
    } else {
      res.send({
        message: 'Books is empty',
        data: books,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllApprovedBooks = async (req, res) => {
  try {
    // WHERE NOT Books.status = "Canceled"
    const books = await Book.findAll({
      where: {
        status: 'Approved',
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: [
          'categoryId',
          'userId',
          'CategoryId',
          'UserId',
          'createdAt',
          'updatedAt',
        ],
      },
    });

    if (books.length !== 0) {
      res.send({
        message: 'Fetching all books is success',
        data: books,
      });
    } else {
      res.send({
        message: 'Books is empty',
        data: books,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await Book.findAll({
      where: {
        userId,
        status: { [Op.ne]: ['Canceled'] },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'role'],
          },
        },
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    if (!books.length) {
      return res.status(404).send({
        error: {
          message: "You haven't uploaded any book yet",
        },
      });
    }

    res.send({
      message: 'Fetching all owned books is success',
      data: books,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: ererrror.message,
    });
  }
};

exports.getDetailBook = async (req, res) => {
  try {
    const id = req.params.id;
    const detailBook = await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: [
          'categoryId',
          'userId',
          'CategoryId',
          'UserId',
          'createdAt',
          'updatedAt',
        ],
      },
    });

    if (detailBook) {
      res.send({
        message: 'Fetching detail book is success',
        data: detailBook,
      });
    } else {
      res.status(404).send({
        message: `Book with id of ${id} does not exist`,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    // const {
    //   title,
    //   publication,
    //   categoryId,
    //   userId,
    //   pages,
    //   ISBN,
    //   aboutBook,
    //   file,
    //   status,
    // } = req.body;
    // const url = req.protocol + '://' + req.get('host');
    const uploadFiles = req.files;
    // console.log('files: ', uploadFiles);

    if (!uploadFiles.file || !uploadFiles.image) {
      return res.status(400).send({
        error: {
          message: 'Please upload both image and file of your book',
        },
      });
    }

    const addBook = await Book.create({
      ...req.body,
      userId: req.user.id,
      status: 'Waiting',
      file: uploadFiles.file[0].path,
      image: uploadFiles.image[0].path,
    });

    const bookRes = await bookResponse(addBook.id);

    res.send({
      message: 'Book has been successfully added',
      data: bookRes,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.addBookAdmin = async (req, res) => {
  try {
    // const {
    //   title,
    //   publication,
    //   categoryId,
    //   userId,
    //   pages,
    //   ISBN,
    //   aboutBook,
    //   file,
    //   status,
    // } = req.body;

    const url = req.protocol + '://' + req.get('host');
    const uploadFiles = req.files;

    if (!req.files.file || !req.files.image) {
      return res.status(400).send({
        error: {
          message: 'Please upload both image and file of your book',
        },
      });
    }

    const addBook = await Book.create({
      ...req.body,
      userId: req.user.id,
      status: 'Approved',
      file: uploadFiles.file[0].path,
      image: uploadFiles.image[0].path,
    });

    const bookRes = await bookResponse(addBook.id);

    res.send({
      message: 'Book has been successfully added',
      data: bookRes,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const {
      title,
      publication,
      categoryId,
      userId,
      pages,
      ISBN,
      aboutBook,
      file,
      status,
    } = req.body;

    const id = req.params.id;
    const uploadFiles = req.files;
    const url = req.protocol + '://' + req.get('host');
    console.log('upload files: ', uploadFiles);
    const updateBook = await Book.update(
      {
        ...req.body,
        file: uploadFiles.file[0].path,
        image: uploadFiles.image[0].path,
      },
      {
        where: {
          id,
        },
      }
    );

    console.log('update book: ', updateBook);

    if (updateBook[0]) {
      const bookRes = await bookResponse(id);
      console.log('response: ', bookRes);

      res.send({
        message: 'Book has been successfully updated',
        data: bookRes,
      });
    } else {
      res.status(404).send({
        message: `Book with id of ${id} does not exist`,
        data: {},
      });
    }
  } catch (err) {
    console.log('error: ', err);
    res.status(400).json({
      error: {
        message: err.message,
      },
    });
  }
};

exports.bookVerifAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('body: ', req.body.status);
    const book = await Book.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id,
        },
      }
    );
    const newBook = await bookResponse(id);

    if (book[0]) {
      res.send({
        message: 'The book has been successfully verified',
        data: newBook,
      });
    } else {
      res.status(404).send({
        error: {
          message: `Book with id of ${id} is not found`,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.destroy({
      where: {
        id,
      },
    });

    if (deletedBook) {
      res.send({
        message: 'Book has been successfully deleted',
        data: {
          id,
        },
      });
    } else {
      res.status(404).send({
        message: `Book with id of ${id} does not exist`,
        data: {
          id: '',
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
};
