const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/authentication');

const { getAllBookmark, addBookmark } = require('../controllers/bookmark');

router.get('/bookmarks', isAuth, getAllBookmark);
router.post('/bookmark', isAuth, addBookmark);

module.exports = router;
