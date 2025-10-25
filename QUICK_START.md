# 🚀 Quick Start - Automated Setup

This guide will help you set up your blog website in just **3 simple steps**!

## Prerequisites

Before running the setup, make sure you have:
- ✅ **Node.js** installed (v14+) - [Download here](https://nodejs.org/)
- ✅ **MySQL** installed and running - [Download here](https://dev.mysql.com/downloads/)
- ✅ MySQL credentials ready (username and password)

---

## 🎯 Automated Setup (Recommended)

### For Linux/Mac Users:

1. **Make the setup script executable:**
```bash
chmod +x setup.sh
```

2. **Run the setup script:**
```bash
./setup.sh
```

### For Windows Users:

1. **Double-click** `setup.bat` or run in Command Prompt:
```cmd
setup.bat
```

---

## 📝 What the Script Does

The automated setup script will:
1. ✅ Check if Node.js and MySQL are installed
2. ✅ Install all backend dependencies
3. ✅ Install all frontend dependencies
4. ✅ Create `.env` file if it doesn't exist
5. ✅ Create the database (`blog_db`)
6. ✅ Create all required tables (users, posts, categories, comments)
7. ✅ Insert default categories
8. ✅ Create admin account with credentials:
   - Email: `admin@blog.com`
   - Password: `admin123`
9. ✅ Create uploads directory

---

## 🔧 Manual Setup (Alternative)

If you prefer to set up manually or the script fails:

### Step 1: Configure Environment
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
```

### Step 2: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 3: Setup Database
```bash
cd backend
npm run setup
```

---

## 🎬 Starting Your Blog

After setup is complete:

### Terminal 1 - Start Backend:
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm start
```
Frontend will open automatically at: `http://localhost:3000`

---

## 🔐 First Login

1. Go to: `http://localhost:3000/login`
2. Enter credentials:
   - **Email:** `admin@blog.com`
   - **Password:** `admin123`
3. Click **"Sign In"**
4. You'll be redirected to the Admin Dashboard!

⚠️ **Important:** Change the default password after first login!

---

## 📝 Create Your First Post

1. Click **"New Post"** button in the dashboard
2. Fill in:
   - Title
   - Category
   - Excerpt (short summary)
   - Content (use the rich text editor)
   - Upload a featured image (optional)
3. Click **"Publish"** or **"Save as Draft"**
4. View your post on the homepage!

---

## 🎨 Customization

### Change Site Name
Edit: `frontend/src/components/Navbar.js`
```javascript
<Link to="/" className="text-2xl font-bold">
  Your Blog Name
</Link>
```

### Update About Page
Edit: `frontend/src/pages/About.js`

### Change Contact Info
Edit: `frontend/src/pages/Contact.js`

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
- ✅ Make sure MySQL is running
- ✅ Check credentials in `backend/.env`
- ✅ Verify database user has proper permissions

### "Port already in use"
- ✅ Backend: Change `PORT` in `backend/.env`
- ✅ Frontend: Terminal will ask to use different port, type `Y`

### "Admin already exists"
- ✅ This is normal if you run setup multiple times
- ✅ Use existing credentials to login

### Dependencies installation fails
- ✅ Delete `node_modules` folder
- ✅ Delete `package-lock.json`
- ✅ Run `npm install` again

---

## 📚 Additional Resources

- **Full Documentation:** See `README.md`
- **Detailed Setup Guide:** See `SETUP_GUIDE.md`
- **Project Report:** See `PROJECT_REPORT.md`

---

## ✅ Setup Checklist

After running the setup script, verify:
- [ ] MySQL is running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Database `blog_db` created
- [ ] Tables created (users, posts, categories, comments)
- [ ] Admin account created
- [ ] Uploads directory exists
- [ ] Backend starts without errors (`npm run dev`)
- [ ] Frontend starts without errors (`npm start`)
- [ ] Can login to admin dashboard
- [ ] Can create a new post

---

## 🎉 You're Ready!

Your blog is now set up and ready to use. Start creating amazing content!

**Happy Blogging! ✍️**
