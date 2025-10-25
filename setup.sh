#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Blog Website - Automated Setup${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js is installed${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm is installed${NC}"

# Check if MySQL is running (XAMPP or system installation)
MYSQL_CMD=""
if command -v mysql &> /dev/null; then
    MYSQL_CMD="mysql"
    echo -e "${GREEN}✓ MySQL is installed (system)${NC}"
elif [ -f "/opt/lampp/bin/mysql" ]; then
    MYSQL_CMD="/opt/lampp/bin/mysql"
    echo -e "${GREEN}✓ MySQL is installed (XAMPP)${NC}"
elif [ -f "/Applications/XAMPP/xamppfiles/bin/mysql" ]; then
    MYSQL_CMD="/Applications/XAMPP/xamppfiles/bin/mysql"
    echo -e "${GREEN}✓ MySQL is installed (XAMPP - Mac)${NC}"
else
    echo -e "${RED}✗ MySQL is not installed${NC}"
    echo -e "${YELLOW}Please install MySQL or start XAMPP${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 1: Setting up Backend${NC}"
echo "-----------------------------------"

# Navigate to backend directory
cd backend || exit

# Check if .env exists, if not create from .env.example
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ .env file not found${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
        echo -e "${YELLOW}⚠ Please update .env with your MySQL credentials${NC}"
        echo -e "${YELLOW}  Then run this script again${NC}"
        exit 0
    else
        echo -e "${RED}✗ .env.example not found${NC}"
        exit 1
    fi
fi

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
npm install --silent
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi

# Run database setup script
echo ""
echo -e "${BLUE}Setting up database and admin account...${NC}"
node setup.js
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Database setup failed${NC}"
    exit 1
fi

# Go back to root directory
cd ..

echo ""
echo -e "${BLUE}Step 2: Setting up Frontend${NC}"
echo "-----------------------------------"

# Navigate to frontend directory
cd frontend || exit

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
npm install --silent
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Go back to root directory
cd ..

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   ✓ Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}To start your blog:${NC}\n"
echo -e "1. Start the backend:"
echo -e "   ${YELLOW}cd backend && npm run dev${NC}\n"
echo -e "2. In a new terminal, start the frontend:"
echo -e "   ${YELLOW}cd frontend && npm start${NC}\n"
echo -e "3. Open your browser to:"
echo -e "   ${YELLOW}http://localhost:3000${NC}\n"
echo -e "4. Login to admin dashboard:"
echo -e "   ${YELLOW}http://localhost:3000/login${NC}"
echo -e "   Email: admin@blog.com"
echo -e "   Password: admin123\n"
echo -e "${RED}⚠ Remember to change the default password!${NC}\n"
