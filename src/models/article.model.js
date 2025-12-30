import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    // ===== PHASE 2 FIELDS =====

    updatedContent: {
      type: String,
      default: "",
    },

    references: {
      type: [String],
      default: [],
    },

    isUpdated: {
      type: Boolean,
      default: false,
    },

    // ===== METADATA =====

    sourceUrl: {
      type: String,
      required: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;



