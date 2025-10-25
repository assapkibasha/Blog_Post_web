const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
};

async function setupDatabase() {
  let connection;
  
  try {
    log.info('Starting database setup...\n');

    // Connect to MySQL without specifying database
    log.info('Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    log.success('Connected to MySQL server');

    // Create database if it doesn't exist
    log.info(`Creating database '${process.env.DB_NAME}'...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    log.success(`Database '${process.env.DB_NAME}' created/verified`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table
    log.info('Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    log.success('Users table created');

    // Create categories table
    log.info('Creating categories table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    log.success('Categories table created');

    // Create posts table
    log.info('Creating posts table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        featured_image VARCHAR(500),
        category_id INT,
        author_id INT NOT NULL,
        status ENUM('draft', 'published') DEFAULT 'draft',
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    log.success('Posts table created');

    // Create comments table
    log.info('Creating comments table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        status ENUM('pending', 'approved', 'spam') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
      )
    `);
    log.success('Comments table created');

    // Insert default categories
    log.info('Inserting default categories...');
    const categories = [
      ['Technology', 'technology'],
      ['Lifestyle', 'lifestyle'],
      ['Travel', 'travel'],
      ['Personal', 'personal']
    ];

    for (const [name, slug] of categories) {
      await connection.query(
        'INSERT INTO categories (name, slug) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name',
        [name, slug]
      );
    }
    log.success('Default categories inserted');

    // Create admin account
    log.info('\nCreating admin account...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@blog.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = 'Admin';

    // Check if admin already exists
    const [existingAdmin] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [adminEmail]
    );

    if (existingAdmin.length > 0) {
      log.warning(`Admin account with email '${adminEmail}' already exists`);
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await connection.query(
        'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
        [adminEmail, hashedPassword, adminName, 'admin']
      );
      log.success(`Admin account created successfully!`);
      log.info(`  Email: ${adminEmail}`);
      log.info(`  Password: ${adminPassword}`);
      log.warning(`  ⚠ Please change the password after first login!`);
    }

    // Create uploads directory
    log.info('\nCreating uploads directory...');
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      log.success('Uploads directory created');
    } else {
      log.success('Uploads directory already exists');
    }

    log.success('\n🎉 Setup completed successfully!');
    log.info('\nNext steps:');
    log.info('1. Start the backend: npm run dev');
    log.info('2. Start the frontend: cd ../frontend && npm start');
    log.info(`3. Login at http://localhost:3000/login with:`);
    log.info(`   Email: ${adminEmail}`);
    log.info(`   Password: ${adminPassword}\n`);

  } catch (error) {
    log.error(`\nSetup failed: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      log.error('Could not connect to MySQL server.');
      log.info('Please make sure MySQL is running and credentials in .env are correct.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      log.error('Access denied. Please check your MySQL username and password in .env file.');
    } else {
      log.error(`Error details: ${error.stack}`);
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  log.warning('.env file not found!');
  log.info('Creating .env file from .env.example...');
  
  const envExamplePath = path.join(__dirname, '.env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    log.success('.env file created');
    log.warning('Please update the .env file with your MySQL credentials and run this script again.');
    process.exit(0);
  } else {
    log.error('.env.example file not found!');
    process.exit(1);
  }
}

// Run setup
setupDatabase();
