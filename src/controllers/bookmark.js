const { Bookmark, Book, User, Category } = require('../../models');

exports.getAllBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log('userId: ', userId);
    const bookmarks = await Bookmark.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Book,
          as: 'book',
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
                exclude: [
                  'createdAt',
                  'updatedAt',
                  'password',
                  'role',
                  'gender',
                  'phone',
                  'address',
                ],
              },
            },
          ],
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'categoryId',
              'userId',
              'CategoryId',
              'UserId',
            ],
          },
        },
        {
          model: User,
          as: 'bookmarkOwner',
          attributes: {
            exclude: [
              'gender',
              'createdAt',
              'updatedAt',
              'password',
              'phone',
              'role',
              'address',
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          'bookId',
          'BookId',
          'categoryId',
          'userId',
          'CategoryId',
          'UserId',
          'createdAt',
          'updatedAt',
        ],
      },
    });

    res.send({
      message: 'Fetching all bookmarks is success',
      data: bookmarks,
    });
    res;
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: err.message,
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.body.bookId;

    const bookmark = await Bookmark.create({
      userId,
      bookId,
    });

    res.send({
      message: 'Bookmark has been successfully added',
      data: bookmark,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: err.message,
    });
  }
};
