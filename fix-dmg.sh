#!/bin/bash

# Fix DMG for distribution by removing quarantine attributes
# This helps bypass Gatekeeper warnings for development builds

echo "🔧 Fixing DMG for distribution..."

# Find the DMG file
DMG_FILE=$(find dist -name "*.dmg" | head -1)

if [ -z "$DMG_FILE" ]; then
    echo "❌ No DMG file found in dist/ folder"
    echo "   Please run 'npm run build' first"
    exit 1
fi

echo "📦 Found DMG: $DMG_FILE"

# Remove extended attributes
echo "🧹 Removing quarantine attributes..."
xattr -cr "$DMG_FILE"

# Verify attributes were removed
REMAINING_ATTRS=$(xattr "$DMG_FILE" 2>/dev/null)
if [ -z "$REMAINING_ATTRS" ]; then
    echo "✅ Successfully removed all extended attributes"
    echo "📱 DMG is now ready for distribution"
    echo ""
    echo "📋 Users can install by:"
    echo "   1. Right-clicking the app and selecting 'Open'"
    echo "   2. Or following instructions in INSTALL_INSTRUCTIONS.md"
else
    echo "⚠️  Some attributes remain: $REMAINING_ATTRS"
fi

echo ""
echo "📂 DMG location: $(pwd)/$DMG_FILE"
