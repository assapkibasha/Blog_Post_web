@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Blog Website - Automated Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)
echo [OK] npm is installed

REM Check if MySQL is installed
where mysql >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] MySQL is not installed
    echo Please install MySQL from https://dev.mysql.com/downloads/
    pause
    exit /b 1
)
echo [OK] MySQL is installed

echo.
echo Step 1: Setting up Backend
echo -----------------------------------

REM Navigate to backend directory
cd backend
if %errorlevel% neq 0 (
    echo [ERROR] Backend directory not found
    pause
    exit /b 1
)

REM Check if .env exists, if not create from .env.example
if not exist .env (
    echo [WARNING] .env file not found
    if exist .env.example (
        copy .env.example .env >nul
        echo [OK] Created .env file from .env.example
        echo [WARNING] Please update .env with your MySQL credentials
        echo           Then run this script again
        pause
        exit /b 0
    ) else (
        echo [ERROR] .env.example not found
        pause
        exit /b 1
    )
)

REM Install backend dependencies
echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed

REM Run database setup script
echo.
echo Setting up database and admin account...
node setup.js
if %errorlevel% neq 0 (
    echo [ERROR] Database setup failed
    pause
    exit /b 1
)

REM Go back to root directory
cd ..

echo.
echo Step 2: Setting up Frontend
echo -----------------------------------

REM Navigate to frontend directory
cd frontend
if %errorlevel% neq 0 (
    echo [ERROR] Frontend directory not found
    pause
    exit /b 1
)

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed

REM Go back to root directory
cd ..

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start your blog:
echo.
echo 1. Start the backend:
echo    cd backend ^&^& npm run dev
echo.
echo 2. In a new terminal, start the frontend:
echo    cd frontend ^&^& npm start
echo.
echo 3. Open your browser to:
echo    http://localhost:3000
echo.
echo 4. Login to admin dashboard:
echo    http://localhost:3000/login
echo    Email: admin@blog.com
echo    Password: admin123
echo.
echo [WARNING] Remember to change the default password!
echo.
pause
