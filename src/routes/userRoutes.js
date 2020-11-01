const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/authentication');
const { uploadAvatar } = require('../middleware/uploadFile');
// const { upload } = require('../middleware/uploadFile2');
const { upload } = require('../middleware/uploadCloudinary');

const {
  getAllUsers,
  updateUserAvatar,
  deleteUser,
} = require('../controllers/user');

router.get('/users', getAllUsers);
// router.patch(
//   '/user/:id',
//   isAuth,
//   uploadAvatar.single('avatar'),
//   updateUserAvatar
// );
router.patch('/user/:id', isAuth, upload('avatar'), updateUserAvatar);
router.delete('/user/:id', isAuth, deleteUser);

module.exports = router;
