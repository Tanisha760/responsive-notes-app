Responsive Notes App:-

This project is a simple notes management web application built using React, Vite, and Tailwind CSS.
The app allows users to create, edit, delete, search, and categorize notes.
All data is stored in the browser using localStorage, and some initial notes are loaded from a JSON file.

Features:-

Add, edit, and delete notes
Sidebar for category selection
Filter notes by category
Search notes by title or description
Sort notes (Newest, Oldest, A–Z)
Dark and light mode
Responsive layout for both mobile and desktop
Notes stored in localStorage
Import/Export notes support
Basic duplicate title handling

Technologies Used:-

React
Vite
Tailwind CSS
Day.js
localStorage API

Folder Structure:-
responsive-notes-app/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── NoteCard.jsx
│   │   └── NoteModal.jsx
│   │
│   ├── data/
│   │   └── notes.json
│   │
│   ├── utils/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tailwind.config.cjs
├── package.json
└── README.md

Deployment

This project was deployed using Vercel.
Basic Vercel settings:
Framework: Vite
Build command: npm run build
Output directory: dist

Live demo link:- https://responsive-notes-app.vercel.app/
