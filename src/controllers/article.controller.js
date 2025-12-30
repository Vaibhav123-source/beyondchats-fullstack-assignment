import Article from "../models/article.model.js";

/**
 * GET /articles
 */
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /articles/:id
 */
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /articles
 */
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

