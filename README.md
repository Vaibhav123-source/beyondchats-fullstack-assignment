# BeyondChats Full Stack Web Development Assignment

##  Overview
This project is a full-stack web application developed as part of the BeyondChats Full Stack Web Developer Internship assignment.

The application:
- Scrapes blog articles from BeyondChats
- Stores them in MongoDB
- Exposes CRUD APIs
- Processes articles using a Node.js script (Phase 2)
- Displays articles in a React-based frontend UI

A **mock LLM service** is used instead of OpenAI, as allowed by the assignment instructions.


 Note: Phase 2 uses a Mock LLM service as instructed (no OpenAI or paid APIs).


---

##  Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Cheerio (Web Scraping)

### Frontend
- React.js
- CSS

### Tools
- Thunder Client (API testing)
- MongoDB Atlas
- Git & GitHub

---

##  Project Structure
backend/
│
├── src/
│ ├── controllers/
│ │ └── article.controller.js
│ ├── models/
│ │ └── article.model.js
│ ├── routes/
│ │ └── article.routes.js
│ ├── scraper/
│ │ └── beyondchats.scraper.js
│ ├── phase2/
│ │ ├── googleSearch.js
│ │ ├── contentScraper.js
│ │ ├── llmService.js
│ │ └── articleUpdater.js
│ ├── runPhase2.js
│ ├── app.js
│ └── server.js
│
├── frontend/
│ └── src/
│ ├── components/
│ │ └── ArticleCard.js
│ ├── pages/
│ │ └── ArticlePages.js
│ ├── App.js
│ └── index.js
│
└── README.md---

## 🛠️ Local Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Git

### Backend Setup
```bash
git clone <your-repo-url>
cd backend
npm install





B. Data Flow / Architecture Diagram 




##  Architecture / Data Flow

1. Phase 1 Scraper fetches articles from BeyondChats blog.
2. Articles are stored in MongoDB using Mongoose.
3. CRUD APIs expose articles via Express routes.
4. Phase 2 script:
   - Fetches articles from API
   - Searches Google (mocked)
   - Scrapes reference content
   - Updates article using Mock LLM
5. Updated articles are saved back to MongoDB.
6. React frontend fetches articles from backend API and displays them.

Live Demo Links
Frontend: http://localhost:3000
Backend API: http://localhost:5000/articles
