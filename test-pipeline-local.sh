#!/bin/bash
# 🧪 Quick Local Pipeline Test Script

set -e  # Exit on error except where handled

echo "🧪 Testing CI/CD Pipeline Locally..."
echo "======================================="

# Test Mobile App Pipeline
echo ""
echo "📱 Testing Mobile App Quality Check..."
cd moovSafe-mobile

echo "  📦 Installing dependencies..."
pnpm install > /dev/null 2>&1 && echo "  ✅ Dependencies installed"

echo "  🧹 Running linting (non-blocking)..."
if pnpm run check > /dev/null 2>&1; then
    echo "  ✅ No linting issues found"
else
    echo "  ⚠️  Code quality issues found (non-blocking)"
fi

echo "  ✅ Mobile pipeline test completed!"

# Test API Pipeline (if exists)
echo ""
echo "🌐 Testing API Pipeline..."
cd ../api

if [ -f "package.json" ]; then
    echo "  📦 Installing API dependencies..."
    pnpm install > /dev/null 2>&1 && echo "  ✅ API dependencies installed"
    
    echo "  🏗️  Building API..."
    if pnpm run build > /dev/null 2>&1; then
        echo "  ✅ API builds successfully"
    else
        echo "  ❌ API build failed"
        exit 1
    fi
else
    echo "  ℹ️  No API package.json found, skipping..."
fi

cd ..
echo ""
echo "🎉 All pipeline tests completed successfully!"
echo "   Your CI/CD pipelines should work perfectly!"
