# 🍳 Cook-Box | No Distractions, Just Recipes

---

## 🥄 What is CookBox?

CookBox is a minimal web app that extracts and saves recipes from [BBC Good Food](https://www.bbcgoodfood.com/).

Recipe websites are often cluttered with ads, pop-ups, and long intros. CookBox focuses on what actually matters:

- ✅ The **title**, **image**, **ingredients**, and **instructions**
- ✅ Extracted recipe can be saved directly to your personal collection
- ✅ Displayed in a clean, readable format

Ideal for anyone who just wants the recipe — nothing more.

---

## 🌟 Features

- **🔗 Extract Recipes from BBC Good Food**  
  Paste a URL and the app scrapes the essential details.

- **📦 Save to Your Collection**  
  Logged-in users can save recipes to their account. Duplicate URLs are prevented.

- **📖 View Saved Recipes**  
  Browse your saved collection and open any recipe in a detailed modal view.

- **🔐 Auth System**  
  Secure sign up, sign in, and password reset powered by Supabase Auth.

- **✨ Modern UI**  
  Built with shadcn/ui and Tailwind CSS for a responsive, fast experience.

---

## 🛠 Tech Stack

| Layer         | Tooling                 |
| ------------- | ----------------------- |
| Framework     | Next.js 14 (App Router) |
| UI Components | Tailwind CSS, shadcn/ui |
| Auth / DB     | Supabase                |
| Scraping      | Axios + Cheerio         |
| Icons         | Lucide React            |
| Hosting       | Vercel                  |

---

## 💡 Future Ideas

- Ingredient scaling (change servings → auto-adjust quantities)
- Categories or tags for filtering
- Search functionality in your collection
- Print-friendly recipe layout
- Support for more websites

---

## 👨‍🍳 About This Project

CookBox is a personal project I built to improve my own cooking workflow and experiment with modern web technologies.

It's inspired by the idea behind [Just The Recipe](https://www.justtherecipe.com/) — extracting only the essential parts of a recipe.
