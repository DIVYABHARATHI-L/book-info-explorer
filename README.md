# 📚 Book Info Explorer

Book Info Explorer is a simple Node.js web application that lets users search for books using the Google Books API and save selected books to a PostgreSQL database for later viewing.

## 🚀 Features

- Search books by title
- View detailed information (title, author, description, preview link)
- Save favorite books to a local PostgreSQL database
- View saved books on a separate page

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS (in `/style/style.css`), JavaScript
- **Backend:** Node.js, Express.js, EJS
- **API:** [Google Books API](https://developers.google.com/books/docs/v1/using)
- **Database:** PostgreSQL
- **Environment Config:** dotenv

---

## 📁 Folder Structure

book-info-explorer/
│
├── views/ # EJS Templates
│ ├── home.ejs # Search form
│ ├── book.ejs # Search results
│ └── saved.ejs # Saved books
│
├── style/ # CSS styles
│ └── style.css
│
├── script/ # (Optional) JS scripts
│ └── script.js
│
├── .env # Environment variables
├── index.js # Main server file
├── package.json # NPM configuration
└── README.md # Project documentation
