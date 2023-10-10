import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const multer = require("multer");
const path = require("path");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// enables Node.js to serve the contents of an uploads folder
// refers to static files such as images, CSS, JS files
app.use("/uploads", express.static("uploads"));

// storage var gives us full control of images
// func stores images in the upload folder and renames images to upload time
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// passes config to Multer and set size limit of 5MB of images
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

reportWebVitals();
