# Personal Blog Website

A full-stack blog website built with React.js, Node.js/Express, and MySQL. This application allows an admin to write and manage blog posts while providing a beautiful reading experience for visitors.

## 🎨 Color Scheme

The website uses a custom color palette throughout:
- **Primary**: `#004030` (Dark Green)
- **Secondary**: `#4A9782` (Teal)
- **Accent**: `#DCD0A8` (Beige)

## ✨ Features

### Public Features
- **Home Page**: Displays latest blog posts with pagination
- **Single Post View**: Full blog article with featured image, content, and share functionality
- **Categories Page**: Browse posts by topic
- **About Page**: Information about the blog author
- **Contact Page**: Contact form for readers to reach out
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **SEO Friendly**: Proper meta tags and URL slugs

### Admin Features
- **Secure Authentication**: JWT-based login system
- **Dashboard**: Overview of all posts with statistics
- **Create Posts**: Rich text editor with image upload
- **Edit Posts**: Modify existing posts
- **Delete Posts**: Remove unwanted posts
- **Draft System**: Save posts as drafts before publishing
- **Category Management**: Organize posts by categories

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router v6
- Tailwind CSS
- React Quill (Rich Text Editor)
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Bcrypt.js
- Multer (File Upload)

## 📁 Project Structure

```
Blog_Post_web/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── db.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── categoryRoutes.js
│   ├── utils/
│   │   └── slugify.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── PostCard.js
    │   │   ├── Loading.js
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── SinglePost.js
    │   │   ├── Categories.js
    │   │   ├── About.js
    │   │   ├── Contact.js
    │   │   ├── Login.js
    │   │   └── admin/
    │   │       ├── Dashboard.js
    │   │       └── PostEditor.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blog_db
JWT_SECRET=your_super_secret_jwt_key
ADMIN_EMAIL=admin@blog.com
ADMIN_PASSWORD=admin123
```

5. Create the database and tables:
```bash
mysql -u your_username -p < config/db.sql
```

6. Create uploads directory:
```bash
mkdir uploads
```

7. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the `.env` file if needed (default is already set):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 👤 Creating Admin Account

After setting up the database, you need to create an admin account:

### Option 1: Using API
Send a POST request to `http://localhost:5000/api/auth/register`:
```json
{
  "email": "admin@blog.com",
  "password": "your_secure_password",
  "name": "Your Name"
}
```

### Option 2: Using MySQL
```sql
INSERT INTO users (email, password, name, role) 
VALUES ('admin@blog.com', '$2a$10$hashedpassword', 'Your Name', 'admin');
```

## 📝 Usage

### Admin Workflow

1. **Login**: Navigate to `/login` and enter your credentials
2. **Dashboard**: View all posts and statistics at `/admin`
3. **Create Post**: Click "New Post" button
4. **Write Content**: Use the rich text editor to write your post
5. **Add Image**: Upload a featured image
6. **Select Category**: Choose a category for your post
7. **Save**: Save as draft or publish immediately
8. **Edit**: Click edit icon on any post to modify it
9. **Delete**: Click delete icon to remove a post

### Public User Experience

1. **Browse Posts**: Visit homepage to see latest posts
2. **Read Post**: Click "Read More" to view full article
3. **Filter by Category**: Use categories page to browse by topic
4. **Contact**: Use contact form to send messages
5. **Share**: Share posts on social media

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all published posts (public)
- `GET /api/posts/slug/:slug` - Get post by slug (public)
- `GET /api/posts/admin/all` - Get all posts including drafts (admin)
- `GET /api/posts/admin/:id` - Get post by ID (admin)
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

### Categories
- `GET /api/categories` - Get all categories (public)
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- SQL injection prevention with parameterized queries
- File upload validation
- CORS configuration

## 🎨 Customization

### Colors
Update colors in `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#004030',
  secondary: '#4A9782',
  accent: '#DCD0A8',
}
```

### Site Information
- Update site name in `frontend/src/components/Navbar.js`
- Modify about page content in `frontend/src/pages/About.js`
- Update contact information in `frontend/src/pages/Contact.js`
- Change footer content in `frontend/src/components/Footer.js`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MySQL database is accessible
3. Run `npm install` and `npm start`

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)
3. Update `REACT_APP_API_URL` to point to your production backend

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions, please use the contact form on the website or create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MySQL**
