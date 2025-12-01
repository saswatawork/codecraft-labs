#!/bin/bash
# Progress Tracking Script
# Extracts commit metadata and updates documentation automatically

set -e

# Get commit information
COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_SUBJECT=$(git log -1 --pretty=%s)
DATE=$(date +"%B %d, %Y")
TIME_NOW=$(date +"%H:%M")
DAY_OF_WEEK=$(date +"%A")

# Extract metadata from commit message
TIME=$(echo "$COMMIT_MSG" | grep -E "^Time:" | sed 's/Time: *//' | tr -d '\n' || echo "?h")
PHASE=$(echo "$COMMIT_MSG" | grep -E "^Phase:" | sed 's/Phase: *//' | tr -d '\n' || echo "Unknown")
STATUS=$(echo "$COMMIT_MSG" | grep -E "^Status:" | sed 's/Status: *//' | tr -d '\n' || echo "unknown")
PROGRESS=$(echo "$COMMIT_MSG" | grep -E "^Progress:" | sed 's/Progress: *//' | tr -d '\n' || echo "general")

# File paths
DAILY_LOG="docs/progress/DAILY-LOG.md"
COMMIT_HISTORY="docs/progress/COMMIT-HISTORY.md"
TIME_TRACKING="docs/metrics/TIME-TRACKING.md"

# Create files if they don't exist
if [ ! -f "$DAILY_LOG" ]; then
    echo "# Daily Development Log" > "$DAILY_LOG"
    echo "" >> "$DAILY_LOG"
    echo "Auto-generated progress tracking from commits." >> "$DAILY_LOG"
    echo "" >> "$DAILY_LOG"
fi

if [ ! -f "$COMMIT_HISTORY" ]; then
    echo "# Commit History (Categorized)" > "$COMMIT_HISTORY"
    echo "" >> "$COMMIT_HISTORY"
fi

if [ ! -f "$TIME_TRACKING" ]; then
    echo "# Time Tracking" > "$TIME_TRACKING"
    echo "" >> "$TIME_TRACKING"
    echo "| Date | Time | Task | Hours | Commit | Status |" >> "$TIME_TRACKING"
    echo "|------|------|------|-------|--------|--------|" >> "$TIME_TRACKING"
fi

# Check if today's date header exists in DAILY_LOG
if ! grep -q "## $DATE" "$DAILY_LOG"; then
    echo "" >> "$DAILY_LOG"
    echo "## $DATE ($DAY_OF_WEEK)" >> "$DAILY_LOG"
    echo "" >> "$DAILY_LOG"
fi

# Append to DAILY_LOG
echo "**$TIME_NOW** [$TIME] \`$COMMIT_HASH\` - $COMMIT_SUBJECT" >> "$DAILY_LOG"
if [ "$STATUS" != "unknown" ]; then
    echo "  - Status: $STATUS" >> "$DAILY_LOG"
fi
echo "" >> "$DAILY_LOG"

# Append to COMMIT_HISTORY
echo "- \`$COMMIT_HASH\` [$TIME] - $COMMIT_SUBJECT ($DATE)" >> "$COMMIT_HISTORY"

# Append to TIME_TRACKING
echo "| $DATE | $TIME_NOW | $PROGRESS | $TIME | \`$COMMIT_HASH\` | $STATUS |" >> "$TIME_TRACKING"

echo "✅ Progress tracked: $COMMIT_HASH ($TIME)"
