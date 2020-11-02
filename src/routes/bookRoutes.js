const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../middleware/authentication');
const { uploadBook } = require('../middleware/uploadFile');
// const { upload } = require('../middleware/uploadFile2');
const { upload } = require('../middleware/uploadCloudinary');

const {
  getAllBooks,
  getUserBooks,
  getDetailBook,
  addBook,
  addBookAdmin,
  updateBook,
  deleteBook,
  getAllApprovedBooks,
  bookVerifAdmin,
} = require('../controllers/book');

router.get('/books', getAllBooks);
router.get('/approved-books', isAuth, getAllApprovedBooks);
router.get('/owned-books', isAuth, getUserBooks);
router.get('/book/:id', getDetailBook);
// router.post(
//   '/book',
//   isAuth,
//   uploadBook.fields([
//     {
//       name: 'image',
//       maxCount: 1,
//     },
//     {
//       name: 'file',
//       maxCount: 1,
//     },
//   ]),
//   addBook
// );
router.post('/book', isAuth, upload('bookUpload'), addBook);
// router.post(
//   '/book-admin',
//   isAuth,
//   isAdmin,
//   uploadBook.fields([
//     {
//       name: 'image',
//       maxCount: 1,
//     },
//     {
//       name: 'file',
//       maxCount: 1,
//     },
//   ]),
//   addBookAdmin
// );
router.post('/book-admin', isAuth, isAdmin, upload('bookUpload'), addBookAdmin);
router.patch(
  '/book/:id',
  isAuth,
  uploadBook.fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'file',
      maxCount: 1,
    },
  ]),
  updateBook
);
router.patch('/book-verify/:id', isAuth, isAdmin, bookVerifAdmin);
router.delete('/book/:id', isAuth, deleteBook);

module.exports = router;
