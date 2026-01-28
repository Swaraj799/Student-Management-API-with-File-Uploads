Student Management API with File Uploads
Description

A Node.js and Express API to manage student data with profile picture uploads.
Uses MongoDB for storage and includes robust error handling for file uploads and API operations.

Features:

Connect to MongoDB using Mongoose.

RESTful API routes for Create, Read, Update, Delete operations on students.

Upload and store student profile pictures using Multer.

Global error handling middleware for Multer-specific and other errors.

API Routes:

Base Route: /api/students

Supports GET, POST, PUT, DELETE.

File Uploads: Use multipart/form-data with key profile_pic.


Technologies Used:

Node.js

Express.js

MongoDB & Mongoose

Multer


student-management-api/
│
├── config/
│   └── database.js           # MongoDB connection setup
│
├── routes/
│   └── students.route.js     # Student API routes
│
├── controllers/              # (Optional but recommended)
│   └── students.controller.js # Business logic for student routes
│
├── models/
│   └── Student.js            # Mongoose Student schema
│
├── uploads/                  # Folder to store uploaded profile pictures
│
├── .env                      # Environment variables (PORT, MONGO_URL)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                 # Main Express server file

