#!/bin/bash

# YouTube Studio Integration - Quick Test Script
# This script helps verify the integration is working correctly

set -e  # Exit on error

echo "========================================"
echo "YouTube Studio Integration Test"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
check_success() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
        return 0
    else
        echo -e "${RED}✗ $1${NC}"
        return 1
    fi
}

check_port() {
    nc -z localhost $1 2>/dev/null
    return $?
}

# 1. Check dependencies
echo "1. Checking dependencies..."
command -v python3 >/dev/null 2>&1
check_success "Python 3 installed"

command -v ffmpeg >/dev/null 2>&1
check_success "FFmpeg installed"

command -v node >/dev/null 2>&1
check_success "Node.js installed"

command -v pnpm >/dev/null 2>&1
check_success "pnpm installed"

echo ""

# 2. Check directory structure
echo "2. Checking directory structure..."
test -d "/Users/saswatapal/workspace/yt-studio"
check_success "yt-studio directory exists"

test -d "/Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio"
check_success "youtube-studio UI directory exists"

test -d "/Users/saswatapal/workspace/codecraft-labs/packages/yt-api-client"
check_success "yt-api-client package exists"

echo ""

# 3. Check Python environment
echo "3. Checking Python environment..."
test -d "/Users/saswatapal/workspace/yt-studio/.pipeline_venv"
check_success "Pipeline venv exists"

test -f "/Users/saswatapal/workspace/yt-studio/yt-pipeline.py"
check_success "yt-pipeline.py exists"

test -f "/Users/saswatapal/workspace/yt-studio/api/server.py"
check_success "API server.py exists"

echo ""

# 4. Check configuration files
echo "4. Checking configuration..."
test -f "/Users/saswatapal/workspace/yt-studio/config.yaml"
check_success "config.yaml exists"

test -f "/Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio/.env.local"
check_success "Frontend .env.local exists"

echo ""

# 5. Check if services are running
echo "5. Checking running services..."

if check_port 8000; then
    echo -e "${GREEN}✓ Backend API is running on port 8000${NC}"
    
    # Test API health endpoint
    echo "  Testing API health endpoint..."
    HEALTH=$(curl -s http://localhost:8000/health)
    if echo "$HEALTH" | grep -q "healthy"; then
        echo -e "  ${GREEN}✓ API health check passed${NC}"
    else
        echo -e "  ${YELLOW}⚠ API health check returned unexpected response${NC}"
        echo "  Response: $HEALTH"
    fi
else
    echo -e "${YELLOW}⚠ Backend API is NOT running on port 8000${NC}"
    echo "  To start: cd /Users/saswatapal/workspace/yt-studio/api && python server.py"
fi

if check_port 3000; then
    echo -e "${GREEN}✓ Frontend is running on port 3000${NC}"
else
    echo -e "${YELLOW}⚠ Frontend is NOT running on port 3000${NC}"
    echo "  To start: cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio && pnpm dev"
fi

echo ""

# 6. Check output directories
echo "6. Checking output directories..."
YT_STUDIO_ROOT="/Users/saswatapal/workspace/yt-studio"

mkdir -p "$YT_STUDIO_ROOT/outputs/scripts"
check_success "outputs/scripts directory ready"

mkdir -p "$YT_STUDIO_ROOT/outputs/audio"
check_success "outputs/audio directory ready"

mkdir -p "$YT_STUDIO_ROOT/outputs/audio/references"
check_success "outputs/audio/references directory ready"

mkdir -p "$YT_STUDIO_ROOT/outputs/slides"
check_success "outputs/slides directory ready"

mkdir -p "$YT_STUDIO_ROOT/outputs/videos"
check_success "outputs/videos directory ready"

echo ""

# 7. Test API endpoints (if running)
if check_port 8000; then
    echo "7. Testing API endpoints..."
    
    # Test videos endpoint
    echo "  Testing GET /api/videos..."
    VIDEOS=$(curl -s http://localhost:8000/api/videos)
    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✓ Videos endpoint responding${NC}"
        echo "  Response: $(echo $VIDEOS | head -c 100)..."
    else
        echo -e "  ${RED}✗ Videos endpoint failed${NC}"
    fi
    
    # Test voices endpoint
    echo "  Testing GET /api/voices..."
    VOICES=$(curl -s http://localhost:8000/api/voices)
    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✓ Voices endpoint responding${NC}"
        echo "  Response: $(echo $VOICES | head -c 100)..."
    else
        echo -e "  ${RED}✗ Voices endpoint failed${NC}"
    fi
else
    echo "7. Skipping API endpoint tests (API not running)"
fi

echo ""
echo "========================================"
echo "Test Summary"
echo "========================================"
echo ""

if check_port 8000 && check_port 3000; then
    echo -e "${GREEN}✓ System is ready for testing!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Open browser: http://localhost:3000"
    echo "  2. Navigate to Voice Library"
    echo "  3. Upload a test voice"
    echo "  4. Create a test video"
    echo "  5. Monitor progress in real-time"
    echo ""
    echo "API Documentation: http://localhost:8000/docs"
else
    echo -e "${YELLOW}⚠ System needs setup${NC}"
    echo ""
    echo "To start services:"
    echo ""
    echo "Terminal 1 (Backend):"
    echo "  cd /Users/saswatapal/workspace/yt-studio"
    echo "  source .pipeline_venv/bin/activate"
    echo "  cd api"
    echo "  python server.py"
    echo ""
    echo "Terminal 2 (Frontend):"
    echo "  cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio"
    echo "  pnpm dev"
    echo ""
fi

echo "For more information, see:"
echo "  - INTEGRATION_STRATEGY.md"
echo "  - IMPLEMENTATION_SUMMARY.md"
echo ""
