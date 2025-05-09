# 🎬 Movie Explorer

**Movie Explorer** is a stylish and responsive movie browsing application built with React and Material UI. It leverages the [TMDb API](https://www.themoviedb.org/documentation/api) to provide users with access to popular and trending movies, advanced search capabilities, and personalized features like favorites.

![Movie Explorer Banner](./src/assets/movie-explorer-logo.png)

---

## 🧰 Tech Stack

- ⚛️ React.js
- 🎨 Material UI (MUI)
- 🗃️ Context API
- 🔐 LocalStorage (for login state)
- 🌐 TMDb API

---

## 📸 Features

- 🔎 Instant Search with Live Suggestions
- 🧠 Smart Filtering (Genre, Year, Rating)
- ⭐ Favorite Movies List (stored in local storage)
- 🎥 Movie Details View with YouTube Trailer
- 📱 Responsive Layout (desktop, tablet, mobile)
- 🔐 Login & Register UI with Session Control
- 🌗 Dark/Light Mode Toggle
- 🔐 Protected Routes for Authenticated Users
- 📦 Persistent Auth State with LocalStorage
- ⬆️ Scroll to Top on Route Change
- 🍔 Mobile Drawer Navigation

---

## 🧪 Pages

| Route          | Description                      |
|----------------|----------------------------------|
| `/login`       | Login screen                     |
| `/register`    | Register screen                  |
| `/`            | Home (popular movies + filters)  |
| `/trending`    | Weekly trending movies           |
| `/favorites`   | User's favorite movie list       |
| `/movie/:id`   | Movie detail with trailer, cast  |

---

## 🧾 Scripts

| Command           | Description                     |
|------------------|---------------------------------|
| `npm start`      | Run development server          |
| `npm run build`  | Build production-ready app      |

---

## 🔐 Auth Mechanism

- Login sets `localStorage.setItem('loggedIn', 'true')`
- Logout clears `localStorage`
- Protected routes via `<PrivateRoute>` component

---

## 📂 Folder Structure

```
src/
│
├── api/                  # Axios config for TMDb
├── assets/               # Images and logos
├── components/           # Reusable UI (Navbar, Footer, etc.)
├── context/              # Favorites context
├── pages/                # Main route pages (Home, Login, etc.)
├── App.js                # Main app logic
├── index.js              # Entry point
└── theme.js              # MUI theme config
```

---

## 🙌 Acknowledgements

- [TMDb API](https://www.themoviedb.org/)
- [Material UI](https://mui.com/)

---

## 📧 Contact

Designed and developed by **Pansilu Perera**