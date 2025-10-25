# Quick Setup Guide - Personal Blog Website

This guide will help you get your blog website up and running in minutes.

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ Node.js installed (v14 or higher) - [Download](https://nodejs.org/)
- ✅ MySQL installed (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Prompt access

## 🚀 Step-by-Step Installation

### Step 1: Database Setup (5 minutes)

1. **Open MySQL Command Line or MySQL Workbench**

2. **Create the database:**
```sql
CREATE DATABASE blog_db;
USE blog_db;
```

3. **Run the schema file:**
```bash
# From your terminal, navigate to the project folder
cd "Blog_Post_web/backend"

# Run the SQL file
mysql -u your_username -p blog_db < config/db.sql
```

Or copy and paste the contents of `backend/config/db.sql` into MySQL Workbench and execute.

4. **Verify tables were created:**
```sql
SHOW TABLES;
```
You should see: `users`, `categories`, `posts`, `comments`

---

### Step 2: Backend Setup (3 minutes)

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
# Copy the example file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

4. **Edit the .env file** with your database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_db
JWT_SECRET=my_super_secret_key_12345
```

5. **Create uploads folder:**
```bash
mkdir uploads
```

6. **Start the backend server:**
```bash
npm run dev
```

You should see: `Server is running on port 5000`

✅ **Backend is ready!** Keep this terminal window open.

---

### Step 3: Frontend Setup (3 minutes)

1. **Open a NEW terminal window**

2. **Navigate to frontend folder:**
```bash
cd frontend
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start the development server:**
```bash
npm start
```

The browser should automatically open to `http://localhost:3000`

✅ **Frontend is ready!**

---

### Step 4: Create Admin Account (2 minutes)

You need an admin account to write blog posts.

**Option A: Using Postman or any API client**

Send a POST request to: `http://localhost:5000/api/auth/register`

Body (JSON):
```json
{
  "email": "admin@blog.com",
  "password": "admin123",
  "name": "Your Name"
}
```

**Option B: Using curl (Terminal)**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@blog.com","password":"admin123","name":"Your Name"}'
```

**Option C: Using MySQL directly**
```sql
-- First, generate a hashed password using bcrypt
-- Then insert into database
INSERT INTO users (email, password, name, role) 
VALUES ('admin@blog.com', 'hashed_password_here', 'Your Name', 'admin');
```

✅ **Admin account created!**

---

### Step 5: Login and Start Blogging! (1 minute)

1. **Go to:** `http://localhost:3000/login`

2. **Enter your credentials:**
   - Email: `admin@blog.com`
   - Password: `admin123` (or whatever you set)

3. **Click "Sign In"**

4. **You'll be redirected to the Admin Dashboard!**

5. **Click "New Post"** to create your first blog post

---

## 🎉 You're All Set!

Your blog is now running:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Admin Dashboard:** http://localhost:3000/admin

---

## 📝 Quick Tips

### Writing Your First Post

1. Click **"New Post"** in the dashboard
2. Enter a **title** (e.g., "Welcome to My Blog")
3. Upload a **featured image** (optional)
4. Select a **category** (Technology, Lifestyle, Travel, or Personal)
5. Write an **excerpt** (short summary)
6. Write your **content** using the rich text editor
7. Click **"Publish"** or **"Save as Draft"**

### Viewing Your Post

1. Go to the homepage: `http://localhost:3000`
2. Your post should appear in the grid
3. Click **"Read More"** to view the full post

---

## 🔧 Troubleshooting

### Backend won't start
- ❌ **Error: "Cannot connect to database"**
  - ✅ Check MySQL is running
  - ✅ Verify credentials in `.env` file
  - ✅ Ensure database `blog_db` exists

- ❌ **Error: "Port 5000 already in use"**
  - ✅ Change `PORT=5001` in `.env` file
  - ✅ Update frontend `.env` to match: `REACT_APP_API_URL=http://localhost:5001/api`

### Frontend won't start
- ❌ **Error: "npm install failed"**
  - ✅ Delete `node_modules` folder
  - ✅ Delete `package-lock.json`
  - ✅ Run `npm install` again

- ❌ **Error: "Port 3000 already in use"**
  - ✅ The terminal will ask if you want to use another port, type `Y`

### Can't login
- ❌ **"Invalid credentials"**
  - ✅ Verify admin account was created successfully
  - ✅ Check email and password are correct
  - ✅ Ensure backend is running

### Images not uploading
- ❌ **Upload fails**
  - ✅ Ensure `uploads` folder exists in backend directory
  - ✅ Check image is under 5MB
  - ✅ Use supported formats: jpg, jpeg, png, gif, webp

---

## 📱 Testing on Mobile

1. Find your computer's IP address:
   ```bash
   # On Windows
   ipconfig
   
   # On Mac/Linux
   ifconfig
   ```

2. Update frontend `.env`:
   ```env
   REACT_APP_API_URL=http://YOUR_IP:5000/api
   ```

3. Access from mobile browser:
   ```
   http://YOUR_IP:3000
   ```

---

## 🎨 Customization Quick Start

### Change Site Name
Edit: `frontend/src/components/Navbar.js`
```javascript
<Link to="/" className="text-2xl font-bold">
  Your Blog Name Here
</Link>
```

### Update About Page
Edit: `frontend/src/pages/About.js`
- Replace `[Your Name]` with your actual name
- Update the bio text
- Modify mission/values sections

### Change Contact Info
Edit: `frontend/src/pages/Contact.js`
- Update email, phone, location
- Modify social media links

### Add More Categories
```sql
INSERT INTO categories (name, slug) VALUES ('Food', 'food');
INSERT INTO categories (name, slug) VALUES ('Photography', 'photography');
```

---

## 🚀 Production Deployment (Coming Soon)

Once you're ready to deploy your blog to the internet:

1. **Backend:** Deploy to Heroku, Railway, or DigitalOcean
2. **Database:** Use managed MySQL (AWS RDS, PlanetScale, etc.)
3. **Frontend:** Deploy to Netlify or Vercel
4. **Domain:** Connect your custom domain

Detailed deployment guide available in `README.md`

---

## 📚 Additional Resources

- **Full Documentation:** See `README.md`
- **Project Report:** See `PROJECT_REPORT.md`
- **Database Schema:** See `backend/config/db.sql`

---

## 💡 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the error messages in the terminal
3. Ensure all prerequisites are installed
4. Verify all steps were followed in order

---

## ✅ Checklist

Before you start blogging, make sure:
- [ ] MySQL is running
- [ ] Database `blog_db` is created
- [ ] Backend server is running (port 5000)
- [ ] Frontend server is running (port 3000)
- [ ] Admin account is created
- [ ] You can login successfully
- [ ] Dashboard loads correctly

---

**Happy Blogging! 🎉**

Start sharing your thoughts with the world!
