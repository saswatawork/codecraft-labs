#!/bin/bash

# YouTube Studio - Master Startup Script
# This script starts both backend and frontend services for end-to-end testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/../../../yt-studio"
FRONTEND_DIR="$SCRIPT_DIR"
WORKSPACE_ROOT="$SCRIPT_DIR/../../.."

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  YouTube Studio - End-to-End Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down services...${NC}"
    jobs -p | xargs -r kill 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Step 1: Check prerequisites
echo -e "${BLUE}[1/5]${NC} Checking prerequisites..."

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed${NC}"
    echo -e "${YELLOW}   Install with: npm install -g pnpm${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites OK${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}[2/5]${NC} Installing dependencies..."

# Backend dependencies
echo -e "${YELLOW}→ Installing Python dependencies...${NC}"
cd "$BACKEND_DIR/api"
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}   Creating virtual environment...${NC}"
    python3 -m venv .venv
fi
source .venv/bin/activate
pip install -q -r requirements.txt
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Frontend dependencies
echo -e "${YELLOW}→ Installing Node dependencies...${NC}"
cd "$WORKSPACE_ROOT"
pnpm install --silent 2>/dev/null || pnpm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# Step 3: Check environment
echo -e "${BLUE}[3/5]${NC} Checking environment configuration..."

if [ ! -f "$FRONTEND_DIR/.env.local" ]; then
    echo -e "${YELLOW}⚠ Creating .env.local for frontend...${NC}"
    cat > "$FRONTEND_DIR/.env.local" << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-change-in-production

# OAuth providers (optional for development)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# GITHUB_CLIENT_ID=your-github-client-id
# GITHUB_CLIENT_SECRET=your-github-client-secret
EOF
    echo -e "${GREEN}✓ Created .env.local${NC}"
else
    echo -e "${GREEN}✓ Frontend environment configured${NC}"
fi

if [ ! -f "$BACKEND_DIR/api/.env" ]; then
    echo -e "${YELLOW}⚠ Creating .env for backend...${NC}"
    cat > "$BACKEND_DIR/api/.env" << 'EOF'
# Database Configuration (Choose one)
DB_BACKEND=sqlalchemy

# SQLite (simplest for dev - no server needed)
DATABASE_URL=sqlite+aiosqlite:///./youtube_studio.db
DATABASE_URL_SYNC=sqlite:///./youtube_studio.db

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Paths
PYTHONPATH=/Users/saswatapal/workspace/yt-studio
EOF
    echo -e "${GREEN}✓ Created .env${NC}"
else
    echo -e "${GREEN}✓ Backend environment configured${NC}"
fi
echo ""

# Step 4: Start services
echo -e "${BLUE}[4/5]${NC} Starting services..."

# Check and kill existing processes on ports 3000 and 8000
echo -e "${YELLOW}→ Checking for existing services...${NC}"
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}   Port 8000 is in use, killing existing process...${NC}"
    kill -9 $(lsof -t -i:8000) 2>/dev/null || true
    sleep 1
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}   Port 3000 is in use, killing existing process...${NC}"
    kill -9 $(lsof -t -i:3000) 2>/dev/null || true
    sleep 1
fi

# Start backend
echo -e "${YELLOW}→ Starting FastAPI backend on http://localhost:8000${NC}"
cd "$BACKEND_DIR/api"
source .venv/bin/activate

# Set PYTHONPATH for module imports
export PYTHONPATH="$BACKEND_DIR:$PYTHONPATH"

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Run database migrations first
echo -e "${YELLOW}   Running database migrations...${NC}"
alembic upgrade head > /tmp/yt-studio-migration.log 2>&1 || true

python -m uvicorn api.server:app --host 0.0.0.0 --port 8000 --reload > /tmp/yt-studio-backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to be ready
echo -e "${YELLOW}   Waiting for backend to start...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1 || curl -s http://localhost:8000/ > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend ready${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Backend failed to start. Check logs: tail /tmp/yt-studio-backend.log${NC}"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done

# Start frontend
echo -e "${YELLOW}→ Starting Next.js frontend on http://localhost:3000${NC}"
cd "$WORKSPACE_ROOT"
pnpm --filter @ccl/youtube-studio dev > /tmp/yt-studio-frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait for frontend to be ready
echo -e "${YELLOW}   Waiting for frontend to start...${NC}"
for i in {1..60}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Frontend ready${NC}"
        break
    fi
    if [ $i -eq 60 ]; then
        echo -e "${RED}❌ Frontend failed to start. Check logs: tail /tmp/yt-studio-frontend.log${NC}"
        kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done
echo ""

# Step 5: Open browser
echo -e "${BLUE}[5/5]${NC} Opening application..."
sleep 2

# Open in browser
if command -v open &> /dev/null; then
    # macOS
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3000
else
    echo -e "${YELLOW}⚠ Could not auto-open browser${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✓ YouTube Studio is running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Frontend:${NC}  http://localhost:3000"
echo -e "${BLUE}Backend:${NC}   http://localhost:8000"
echo -e "${BLUE}API Docs:${NC}  http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo -e "  Backend:  tail -f /tmp/yt-studio-backend.log"
echo -e "  Frontend: tail -f /tmp/yt-studio-frontend.log"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Keep script running
wait
