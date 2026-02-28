const axios = require("axios");
const usersModel = require("../models/users");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const getNews = async (req, res) => {
  const email = req.user.email;

  const user = usersModel.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const preferences = user.preferences || [];

  const query = preferences.join(" OR ");

  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&pageSize=10`
  );

  return res.status(200).send({
    news: response.data.articles
  });
};


const searchNews = async (req, res) => {

  const query = req.query.q;

  if (!query) {
    return res.status(400).send({ message: "Search query required" });
  }

  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&pageSize=10`
  );

  return res.status(200).send({
    news: response.data.articles
  });

};

const markAsRead = (req, res) => {

  const email = req.user.email;
  const articleUrl = req.body.url;

  if (!articleUrl) {
    return res.status(400).send({ message: "Article URL required" });
  }

  const user = usersModel.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!user.readArticles) {
    user.readArticles = [];
  }

  user.readArticles.push(articleUrl);

  return res.status(200).send({ message: "Article marked as read" });

};

const getReadArticles = (req, res) => {

  const email = req.user.email;

  const user = usersModel.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.status(200).send({
    readArticles: user.readArticles || []
  });

};

module.exports = { getNews, searchNews,markAsRead,getReadArticles};
