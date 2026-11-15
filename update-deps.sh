#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "========================================="
echo "  Updating Node.js Project Dependencies  "
echo "========================================="
echo

# 1. Clean installs current dependencies
echo "[1/4] Installing existing dependencies..."
if ! npm install; then
    echo "[ERROR] Failed to install initial packages."
    read -p "Press Enter to exit..."
    exit 1
fi

# 2. Update all packages to latest allowed semver versions
echo
echo "[2/4] Updating packages..."
if ! npm update --save --save-dev; then
    echo "[WARNING] npm update completed with warnings or errors."
fi

# 3. Run audit fix for safe security patches
echo
echo "[3/4] Running security audit fix..."
npm audit fix || true

# 4. Prompt before running force audit fix (destructive breaking changes)
echo
echo "[4/4] Security Audit Check"
read -p "Do you want to run 'npm audit fix --force' (May introduce breaking changes)? [y/N]: " FORCE_AUDIT

if [[ "$FORCE_AUDIT" =~ ^[Yy]$ ]]; then
    echo "Running forced audit fix..."
    npm audit fix --force
else
    echo "Skipped forced audit fix."
fi

echo
echo "========================================="
echo "  Update Process Completed Successfully!  "
echo "========================================="
read -p "Press Enter to finish..."