import axios from "axios";
import * as cheerio from "cheerio";

export default async function searchGoogle(query) {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;

    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(data);
    const links = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.startsWith("/url?q=")) {
        const cleanUrl = href.split("/url?q=")[1].split("&")[0];
        if (cleanUrl.startsWith("http")) {
          links.push(cleanUrl);
        }
      }
    });

    return [...new Set(links)].slice(0, 5);
  } catch (err) {
    console.error("Google search failed:", err.message);
    return [];
  }
}



