const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authentication');

const {
  getAllCategories,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');

router.get('/categories', getAllCategories);
router.get('/category/:id', getOneCategory);
router.post('/category', isAuth, addCategory);
router.patch('/category/:id', isAuth, updateCategory);
router.delete('/category/:id', isAuth, deleteCategory);

module.exports = router;
