import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Article from "./models/article.model.js";


import searchGoogle from "./phase2/googleSearch.js";
import scrapeContent from "./phase2/contentScraper.js";
import updateArticleWithMockLLM from "./phase2/llmService.js";

async function runPhase2() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const articles = await Article.find({ isUpdated: false }).limit(5);

    if (articles.length === 0) {
      console.log("⚠️ No articles found for Phase 2");
      process.exit(0);
    }

    for (const article of articles) {
      console.log(`\n🔍 Processing: ${article.title}`);

      // 1️⃣ Google Search
      const links = await searchGoogle(article.title);

      if (links.length < 2) {
        console.log("⚠️ Not enough Google results, skipping...");
        continue;
      }

      // 2️⃣ Scrape top 2 articles
      const references = [];
      for (const link of links.slice(0, 2)) {
        const content = await scrapeContent(link);
        if (content) {
          references.push({ link, content });
        }
      }

      if (references.length < 2) {
        console.log("⚠️ Scraping failed, skipping...");
        continue;
      }

      // 3️⃣ Mock LLM update
      const updatedContent = updateArticleWithMockLLM(
        article.content,
        references
      );

      // 4️⃣ Save updated article
      article.updatedContent = updatedContent;
      article.references = references.map(r => r.link);
      article.isUpdated = true;

      await article.save();
      console.log("✅ Article updated");
    }

    console.log("\n🎉 PHASE 2 COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ Phase 2 Error:", err);
    process.exit(1);
  }
}

runPhase2();

      




