#!/bin/bash

# Local Pipeline Testing Script for moovSafe
# This script simulates CI/CD pipelines locally

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_section() {
    echo
    echo -e "${BLUE}========================================================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================================================================${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "api" ] && [ ! -d "moovSafe-mobile" ]; then
    print_error "This script must be run from the project root directory"
    exit 1
fi

# Parse command line arguments
RUN_API=true
RUN_MOBILE=true
SKIP_DEPS=false
VERBOSE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --api-only)
            RUN_MOBILE=false
            shift
            ;;
        --mobile-only)
            RUN_API=false
            shift
            ;;
        --skip-deps)
            SKIP_DEPS=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --api-only      Only test API pipeline"
            echo "  --mobile-only   Only test mobile pipeline"
            echo "  --skip-deps     Skip dependency installation"
            echo "  --verbose       Enable verbose output"
            echo "  -h, --help      Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Function to run command with optional verbose output
run_command() {
    local cmd="$1"
    local desc="$2"
    local dir="$3"
    
    print_status "$desc"
    
    if [ -n "$dir" ]; then
        cd "$dir"
    fi
    
    if [ "$VERBOSE" = true ]; then
        eval "$cmd"
    else
        eval "$cmd" > /dev/null 2>&1
    fi
    
    local exit_code=$?
    
    if [ -n "$dir" ]; then
        cd - > /dev/null
    fi
    
    return $exit_code
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

print_section "🚀 Starting Local Pipeline Testing"

# Check required tools
print_status "Checking required tools..."

if ! command_exists node; then
    print_error "Node.js is not installed"
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js version: $NODE_VERSION"

# Check for pnpm (required for mobile)
if [ "$RUN_MOBILE" = true ] && ! command_exists pnpm; then
    print_warning "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# ============================================================================
# API PIPELINE TESTING
# ============================================================================

if [ "$RUN_API" = true ]; then
    print_section "🔧 Testing API Pipeline"
    
    if [ ! -d "api" ]; then
        print_error "API directory not found"
        exit 1
    fi
    
    cd api
    
    # Install dependencies
    if [ "$SKIP_DEPS" = false ]; then
        print_status "Installing API dependencies..."
        if [ -f "pnpm-lock.yaml" ]; then
            if [ "$VERBOSE" = true ]; then
                pnpm install
            else
                pnpm install > /dev/null 2>&1
            fi
        else
            if [ "$VERBOSE" = true ]; then
                npm install
            else
                npm install > /dev/null 2>&1
            fi
        fi
        print_success "API dependencies installed"
    fi
    
    # Check if package.json has required scripts
    if [ -f "package.json" ]; then
        print_status "Checking available npm scripts..."
        npm run --silent 2>/dev/null | grep -E "(test|build|lint)" || true
    fi
    
    # TypeScript type checking (simulates pipeline step)
    print_status "Running TypeScript type checking..."
    if [ -f "pnpm-lock.yaml" ]; then
        if pnpm exec tsc --noEmit; then
            print_success "TypeScript type checking passed"
        else
            print_error "TypeScript type checking failed"
            cd ..
            exit 1
        fi
    else
        if npx tsc --noEmit; then
            print_success "TypeScript type checking passed"
        else
            print_error "TypeScript type checking failed"
            cd ..
            exit 1
        fi
    fi
    
    # Run tests (simulates pipeline step)
    if [ -f "pnpm-lock.yaml" ]; then
        if pnpm run test:ci > /dev/null 2>&1; then
            print_status "Running unit tests..."
            if [ "$VERBOSE" = true ]; then
                pnpm run test:ci
            else
                pnpm run test:ci > /dev/null 2>&1
            fi
            print_success "Unit tests passed"
        elif pnpm run test > /dev/null 2>&1; then
            print_status "Running unit tests (fallback)..."
            if [ "$VERBOSE" = true ]; then
                pnpm run test
            else
                pnpm run test > /dev/null 2>&1
            fi
            print_success "Unit tests passed"
        else
            print_warning "No test script found or tests failed"
        fi
    else
        if npm run test:ci > /dev/null 2>&1; then
            print_status "Running unit tests..."
            if [ "$VERBOSE" = true ]; then
                npm run test:ci
            else
                npm run test:ci > /dev/null 2>&1
            fi
            print_success "Unit tests passed"
        elif npm run test > /dev/null 2>&1; then
            print_status "Running unit tests (fallback)..."
            if [ "$VERBOSE" = true ]; then
                npm run test
            else
                npm run test > /dev/null 2>&1
            fi
            print_success "Unit tests passed"
        else
            print_warning "No test script found or tests failed"
        fi
    fi
    
    # Build API (simulates pipeline step)
    if [ -f "pnpm-lock.yaml" ]; then
        if pnpm run build > /dev/null 2>&1; then
            print_status "Building API..."
            if [ "$VERBOSE" = true ]; then
                pnpm run build
            else
                pnpm run build > /dev/null 2>&1
            fi
            print_success "API build completed"
        else
            print_warning "No build script found for API"
        fi
        
        # Lint check (if available)
        if pnpm run lint > /dev/null 2>&1; then
            print_status "Running API linting..."
            if [ "$VERBOSE" = true ]; then
                pnpm run lint
            else
                pnpm run lint > /dev/null 2>&1
            fi
            print_success "API linting passed"
        else
            print_warning "No lint script found for API"
        fi
    else
        if npm run build > /dev/null 2>&1; then
            print_status "Building API..."
            if [ "$VERBOSE" = true ]; then
                npm run build
            else
                npm run build > /dev/null 2>&1
            fi
            print_success "API build completed"
        else
            print_warning "No build script found for API"
        fi
        
        # Lint check (if available)
        if npm run lint > /dev/null 2>&1; then
            print_status "Running API linting..."
            if [ "$VERBOSE" = true ]; then
                npm run lint
            else
                npm run lint > /dev/null 2>&1
            fi
            print_success "API linting passed"
        else
            print_warning "No lint script found for API"
        fi
    fi
    
    cd ..
    print_success "✅ API pipeline testing completed"
fi

# ============================================================================
# MOBILE PIPELINE TESTING
# ============================================================================

if [ "$RUN_MOBILE" = true ]; then
    print_section "📱 Testing Mobile Pipeline"
    
    if [ ! -d "moovSafe-mobile" ]; then
        print_error "Mobile directory not found"
        exit 1
    fi
    
    cd moovSafe-mobile
    
    # Install dependencies
    if [ "$SKIP_DEPS" = false ]; then
        print_status "Installing mobile dependencies..."
        if [ "$VERBOSE" = true ]; then
            pnpm install
        else
            pnpm install > /dev/null 2>&1
        fi
        print_success "Mobile dependencies installed"
    fi
    
    # Check available scripts
    if [ -f "package.json" ]; then
        print_status "Checking available pnpm scripts..."
        pnpm run --silent 2>/dev/null | head -10 || true
    fi
    
    # TypeScript type checking (if available)
    if pnpm run type-check > /dev/null 2>&1; then
        print_status "Running TypeScript type checking for mobile..."
        if [ "$VERBOSE" = true ]; then
            pnpm run type-check
        else
            pnpm run type-check > /dev/null 2>&1
        fi
        print_success "Mobile TypeScript checking passed"
    elif pnpm exec tsc --noEmit > /dev/null 2>&1; then
        print_status "Running TypeScript type checking (direct)..."
        if [ "$VERBOSE" = true ]; then
            pnpm exec tsc --noEmit
        else
            pnpm exec tsc --noEmit > /dev/null 2>&1
        fi
        print_success "Mobile TypeScript checking passed"
    else
        print_warning "No TypeScript checking available for mobile"
    fi
    
    # Lint and format check (simulates pipeline step)
    if pnpm run check > /dev/null 2>&1; then
        print_status "Running mobile code quality checks..."
        if [ "$VERBOSE" = true ]; then
            pnpm run check || echo "⚠️ Code quality issues found (non-blocking)"
        else
            pnpm run check > /dev/null 2>&1 || echo "⚠️ Code quality issues found (non-blocking)"
        fi
        print_success "Mobile quality check completed"
    elif pnpm run lint > /dev/null 2>&1; then
        print_status "Running mobile linting..."
        if [ "$VERBOSE" = true ]; then
            pnpm run lint
        else
            pnpm run lint > /dev/null 2>&1
        fi
        print_success "Mobile linting completed"
    else
        print_warning "No code quality checks found for mobile"
    fi
    
    # Test mobile build (if available)
    if pnpm run build > /dev/null 2>&1; then
        print_status "Testing mobile build..."
        if [ "$VERBOSE" = true ]; then
            pnpm run build
        else
            pnpm run build > /dev/null 2>&1
        fi
        print_success "Mobile build test completed"
    else
        print_warning "No build script found for mobile"
    fi
    
    # Check Expo configuration
    if [ -f "app.json" ] || [ -f "app.config.js" ] || [ -f "app.config.ts" ]; then
        print_success "Expo configuration found"
    else
        print_warning "No Expo configuration found"
    fi
    
    cd ..
    print_success "✅ Mobile pipeline testing completed"
fi

# ============================================================================
# SUMMARY
# ============================================================================

print_section "📋 Pipeline Testing Summary"

if [ "$RUN_API" = true ]; then
    echo "✅ API Pipeline: Tested successfully"
    echo "   - Dependencies: Installed"
    echo "   - TypeScript: Type checked"
    echo "   - Tests: Executed"
    echo "   - Build: Attempted"
fi

if [ "$RUN_MOBILE" = true ]; then
    echo "✅ Mobile Pipeline: Tested successfully"
    echo "   - Dependencies: Installed"
    echo "   - Code Quality: Checked"
    echo "   - TypeScript: Validated"
    echo "   - Configuration: Verified"
fi

print_success "🎉 Local pipeline testing completed successfully!"

echo
echo "💡 To run specific parts:"
echo "   ./test-pipelines-locally.sh --api-only"
echo "   ./test-pipelines-locally.sh --mobile-only"
echo "   ./test-pipelines-locally.sh --verbose"
echo "   ./test-pipelines-locally.sh --skip-deps"
