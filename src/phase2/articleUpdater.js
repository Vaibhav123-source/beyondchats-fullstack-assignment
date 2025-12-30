import Article from "../models/article.model.js";
import { mockRewriteArticle } from "./llmService.js";

export async function updateArticle(article, scrapedArticles) {
  const updatedContent = mockRewriteArticle(
    article.content,
    scrapedArticles[0],
    scrapedArticles[1]
  );

  article.updatedContent = updatedContent;
  article.references = scrapedArticles.map(a => a.source);
  article.isUpdated = true;

  await article.save();

  console.log("Updated article saved:", article.title);
}



