#!/bin/bash

# YouTube Studio - Startup Script
# Launches both backend API and frontend in separate terminals

echo "🚀 Starting YouTube Studio..."
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS"
    echo "Please start services manually:"
    echo ""
    echo "Terminal 1: cd /Users/saswatapal/workspace/yt-studio/api && python server.py"
    echo "Terminal 2: cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio && pnpm dev"
    exit 1
fi

# Backend startup script
BACKEND_SCRIPT=$(cat <<'EOF'
#!/bin/bash
cd /Users/saswatapal/workspace/yt-studio/api

# Check if .venv exists, create if not
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
else
    source .venv/bin/activate
fi

# Set PYTHONPATH
export PYTHONPATH="/Users/saswatapal/workspace/yt-studio:$PYTHONPATH"

# Load environment variables from .env file
if [ -f .env ]; then
    echo "Loading environment variables from .env..."
    export $(cat .env | grep -v '^#' | xargs)
fi

echo "🔧 Starting Backend API..."
echo "Running database migrations..."
alembic upgrade head || true

echo "Starting server on http://localhost:8000"
python -m uvicorn api.server:app --host 0.0.0.0 --port 8000 --reload
EOF
)

# Frontend startup script
FRONTEND_SCRIPT=$(cat <<'EOF'
#!/bin/bash
cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio
echo "🎨 Starting Frontend..."
pnpm dev
EOF
)

# Create temporary scripts
BACKEND_TMP="/tmp/yt-backend-start.sh"
FRONTEND_TMP="/tmp/yt-frontend-start.sh"

echo "$BACKEND_SCRIPT" > "$BACKEND_TMP"
echo "$FRONTEND_SCRIPT" > "$FRONTEND_TMP"

chmod +x "$BACKEND_TMP"
chmod +x "$FRONTEND_TMP"

# Launch in separate Terminal windows (macOS)
echo "📡 Launching Backend API (Terminal 1)..."
osascript -e "tell application \"Terminal\" to do script \"$BACKEND_TMP\""

sleep 2

echo "🎨 Launching Frontend UI (Terminal 2)..."
osascript -e "tell application \"Terminal\" to do script \"$FRONTEND_TMP\""

echo ""
echo "✅ Services starting!"
echo ""
echo "Backend API will be available at: http://localhost:8000"
echo "Frontend UI will be available at: http://localhost:3000"
echo ""
echo "Wait ~10 seconds for both services to fully start."
echo ""
echo "To stop services, close the Terminal windows or press Ctrl+C in each."
echo ""
