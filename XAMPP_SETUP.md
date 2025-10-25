# 🚀 Quick Setup for XAMPP Users

This guide is specifically for users running **XAMPP** instead of standalone MySQL.

## 📋 Prerequisites

1. ✅ **XAMPP** installed - [Download here](https://www.apachefriends.org/)
2. ✅ **Node.js** installed (v14+) - [Download here](https://nodejs.org/)
3. ✅ **XAMPP MySQL/MariaDB** running

---

## 🎯 Step 1: Start XAMPP Services

### Linux:
```bash
sudo /opt/lampp/lampp start
# Or start only MySQL:
sudo /opt/lampp/lampp startmysql
```

### Windows:
1. Open **XAMPP Control Panel**
2. Click **Start** next to **MySQL**
3. Ensure it shows "Running" in green

### Mac:
1. Open **XAMPP** application
2. Click **Start** on MySQL/Database

---

## 🔧 Step 2: Update Backend .env File

Navigate to `backend` folder and edit the `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_EMAIL=admin@blog.com
ADMIN_PASSWORD=admin123
```

**Important for XAMPP:**
- Default user is: `root`
- Default password is: **empty** (leave `DB_PASSWORD=` blank)
- If you set a password in XAMPP, update `DB_PASSWORD` accordingly

---

## 🚀 Step 3: Run Automated Setup

### Option A: Using the Setup Script (Recommended)

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
Double-click `setup.bat` or run:
```cmd
setup.bat
```

### Option B: Manual Setup with XAMPP MySQL

If the script doesn't detect XAMPP automatically, run the Node.js setup directly:

```bash
cd backend
npm install
npm run setup
```

This will:
- ✅ Create database `blog_db`
- ✅ Create all tables
- ✅ Insert default categories
- ✅ Create admin account

---

## 🎬 Step 4: Start Your Blog

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install  # if not already done
npm start
```

---

## 🔐 Step 5: Login

1. Browser will open to: `http://localhost:3000`
2. Go to: `http://localhost:3000/login`
3. Login with:
   - **Email:** `admin@blog.com`
   - **Password:** `admin123`

---

## 🗄️ Alternative: Using phpMyAdmin

If you prefer to set up the database manually using XAMPP's phpMyAdmin:

1. **Open phpMyAdmin:**
   - Go to: `http://localhost/phpmyadmin`

2. **Create Database:**
   - Click "New" in the left sidebar
   - Database name: `blog_db`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

3. **Import SQL:**
   - Select `blog_db` database
   - Click "Import" tab
   - Choose file: `backend/config/db.sql`
   - Click "Go"

4. **Create Admin Account:**
   - Click on `users` table
   - Click "Insert" tab
   - Fill in:
     - `email`: admin@blog.com
     - `password`: (use bcrypt hash - see below)
     - `name`: Your Name
     - `role`: admin
   - Click "Go"

**To generate password hash:**
```bash
cd backend
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10));"
```

---

## 🐛 Troubleshooting XAMPP Issues

### MySQL won't start in XAMPP
- ✅ Check if port 3306 is already in use
- ✅ Stop any other MySQL services
- ✅ Check XAMPP error logs

### "Access denied for user 'root'"
- ✅ Verify password in `.env` matches XAMPP MySQL password
- ✅ Default XAMPP password is empty
- ✅ If you changed it, update `DB_PASSWORD` in `.env`

### "Cannot connect to database"
- ✅ Ensure XAMPP MySQL is running (green in control panel)
- ✅ Check `DB_HOST=localhost` in `.env`
- ✅ Try `DB_HOST=127.0.0.1` if localhost doesn't work

### Port 3000 or 5000 already in use
- ✅ XAMPP Apache might be using port 80
- ✅ Change backend port in `.env`: `PORT=5001`
- ✅ Update frontend `.env`: `REACT_APP_API_URL=http://localhost:5001/api`

---

## 📍 XAMPP MySQL Paths

### Linux:
- MySQL binary: `/opt/lampp/bin/mysql`
- Config: `/opt/lampp/etc/my.cnf`
- Data: `/opt/lampp/var/mysql/`

### Windows:
- MySQL binary: `C:\xampp\mysql\bin\mysql.exe`
- Config: `C:\xampp\mysql\bin\my.ini`
- Data: `C:\xampp\mysql\data\`

### Mac:
- MySQL binary: `/Applications/XAMPP/xamppfiles/bin/mysql`
- Config: `/Applications/XAMPP/xamppfiles/etc/my.cnf`

---

## 🔄 Using XAMPP MySQL Command Line

### Linux:
```bash
/opt/lampp/bin/mysql -u root -p
```

### Windows:
```cmd
C:\xampp\mysql\bin\mysql.exe -u root -p
```

### Mac:
```bash
/Applications/XAMPP/xamppfiles/bin/mysql -u root -p
```

Then you can run SQL commands directly:
```sql
SHOW DATABASES;
USE blog_db;
SHOW TABLES;
SELECT * FROM users;
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] XAMPP MySQL is running
- [ ] Database `blog_db` exists in phpMyAdmin
- [ ] Tables are created (users, posts, categories, comments)
- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can login to admin dashboard
- [ ] Can create a test post

---

## 🎨 Next Steps

1. **Change default password** after first login
2. **Customize About page** with your information
3. **Update Contact page** with your details
4. **Create your first blog post**
5. **Add your own categories**

---

## 📚 Additional Resources

- **XAMPP Documentation:** https://www.apachefriends.org/docs/
- **phpMyAdmin Guide:** http://localhost/phpmyadmin/doc/
- **Full Project Docs:** See `README.md`

---

**Happy Blogging with XAMPP! 🎉**
