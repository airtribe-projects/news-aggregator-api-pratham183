const express = require("express");
const router = express.Router();

const { getNews ,searchNews,markAsRead,getReadArticles} = require("../controllers/news.controller");
const { validateJWT } = require("../middleware/auth.middleware");

router.use(validateJWT);
router.get("/", getNews);
router.get("/search", searchNews);
router.post("/read", markAsRead);
router.get("/read", getReadArticles);

module.exports = router;