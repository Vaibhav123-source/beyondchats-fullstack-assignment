import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../models/article.model.js";

dotenv.config();

const BLOG_URL = "https://beyondchats.com/blogs";

async function scrapeBeyondChats() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const links = [];

    // ✅ Grab ALL anchor tags
    $("a").each((_, el) => {
      const href = $(el).attr("href");

      if (
        href &&
        href.includes("/blogs/") &&
        !href.endsWith("/blogs/") &&
        !href.includes("category") &&
        !href.includes("tag")
      ) {
        const fullUrl = href.startsWith("http")
          ? href
          : `https://beyondchats.com${href}`;

        links.push(fullUrl);
      }
    });

    // Remove duplicates
    const uniqueLinks = [...new Set(links)];

    console.log("Total blog links found:", uniqueLinks.length);

    if (uniqueLinks.length < 5) {
      throw new Error("Not enough articles found");
    }

    // ✅ Take oldest 5
    const oldestFive = uniqueLinks.slice(-5);

    for (const url of oldestFive) {
      const articleRes = await axios.get(url);
      const $$ = cheerio.load(articleRes.data);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (!title || !content) {
        console.log("Skipping empty article:", url);
        continue;
      }

      await Article.create({
        title,
        content,
        source: "beyondchats",
        originalUrl: url,
      });

      console.log("Saved:", title);
    }

    console.log("✅ Phase 1 COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (error) {
    console.error("Scraping error:", error.message);
    process.exit(1);
  }
}

scrapeBeyondChats();

        


        


