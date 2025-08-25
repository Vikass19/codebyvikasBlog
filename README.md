# CodeByVikas - Blog Website

## Overview

**CodeByVikas** is a modern blog website built using **React** and **Tailwind CSS**, with **Google Sheets** as a lightweight backend for storing and managing blog posts.

This project is designed to provide a simple, fast, and cost-effective way to publish blogs without setting up a traditional database. Google Sheets acts as the CMS (Content Management System), making it easy to manage blogs in real time.

---

## Features

*  Built with **React** for a dynamic frontend.
*  Styled using **Tailwind CSS** for responsive and clean UI.
*  Uses **Google Sheets as a backend** for storing blog data.
*  Category-wise blog filtering.
*  Fully responsive design for all devices.
*  Fast loading and minimal setup.

---

## Tech Stack

* **Frontend**: React (Vite)
* **Styling**: Tailwind CSS
* **Backend**: Google Sheets (via Google Apps Script & Web App API)
* **Deployment**: Vercel

---

## Project Structure

```
codebyvikas-blog/
│── public/               # Static assets  
│── src/  
│   ├── components/       # Reusable components (Navbar, BlogCard, etc.)  
│   ├── pages/            # Page-level components (Home, Blog, Contact)  
│   ├── utils/            # API functions (Google Sheets fetch logic)  
│   ├── App.jsx           # Main App file  
│   ├── index.css         # Tailwind styles  
│   └── main.jsx          # Entry point  
│  
├── .gitignore  
├── package.json  
├── tailwind.config.js  
└── README.md  
```

---

## How It Works

1. Blog posts are stored in a **Google Sheet**.
2. A **Google Apps Script Web App** exposes the sheet data as a JSON API.
3. The React app fetches blog data via this API.
4. Blogs are displayed dynamically on the site with category filtering.

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/codebyvikas-blog.git
cd codebyvikas-blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Tailwind CSS (if not already configured)

Tailwind is preconfigured, but if needed:

```bash
npx tailwindcss init
```

### 4. Configure Google Sheets API

* Create a **Google Sheet** for blog storage.
* Deploy a **Google Apps Script Web App** to expose sheet data.
* Add your deployed **Web App URL** in your API utility file:

```javascript
const BASE = import.meta.env.VITE_SHEETS_WEBAPP_URL;
```

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
```

---

## Deployment

You can deploy easily on:

* **Vercel**: `vercel deploy`
* **Netlify**: Connect repo → Deploy
* **GitHub Pages**: Use `gh-pages` package

---

## Future Enhancements

* Add **blog search functionality**
* Implement **comments & likes**
* Add **dark mode**
* Pagination for long blog lists

---

## Author

**Vikas Bansode**

* Portfolio: [vikass19.github.io](https://codebyvikas.xyz)
* YouTube: [@codebyvikas](https://youtube.com/@codebyvikas)
