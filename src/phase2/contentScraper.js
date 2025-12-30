import axios from "axios";
import * as cheerio from "cheerio";

export default async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(data);

    const paragraphs = [];
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) paragraphs.push(text);
    });

    return paragraphs.slice(0, 8).join("\n\n");
  } catch (err) {
    console.error("Scraping failed:", err.message);
    return null;
  }
}

