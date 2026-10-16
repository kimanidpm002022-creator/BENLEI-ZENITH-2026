#!/usr/bin/env bash
set -euo pipefail

# purge_secret.sh
# Usage: ./purge_secret.sh <TOKEN> <github-remote-url>
# Example: ./purge_secret.sh dpl_7AddvMzJ9nvsSDPqLxiBAdqk3H2e https://github.com/kimanidpm002022-creator/benlei-zenith-2026.git

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <TOKEN> <GITHUB_MIRROR_URL>"
  exit 1
fi

TOKEN=$1
GIT_MIRROR_URL=$2

echo "This script will rewrite git history to remove the provided token and force-push the cleaned history."
read -p "Make sure you have backups and that collaborators are aware. Continue? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborting."
  exit 1
fi

# Check for git-filter-repo
if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install it with: pip install git-filter-repo"
  exit 1
fi

# Mirror clone
REPO_DIR="repo.git"
if [ -d "$REPO_DIR" ]; then
  echo "Removing existing $REPO_DIR"
  rm -rf "$REPO_DIR"
fi

echo "Cloning mirror..."
git clone --mirror "$GIT_MIRROR_URL" "$REPO_DIR"
cd "$REPO_DIR"

# Prepare replacements file
REPLACEMENTS_FILE="replacements.txt"
printf "%s==***REDACTED***\n" "$TOKEN" > "$REPLACEMENTS_FILE"

# Run git-filter-repo
echo "Running git-filter-repo --replace-text $REPLACEMENTS_FILE"
git filter-repo --replace-text "$REPLACEMENTS_FILE"

# Force-push cleaned history
echo "Force-pushing cleaned history to origin..."
git push --force --all

git push --force --tags

echo "Cleanup finished. IMPORTANT: All collaborators must re-clone the repository or rebase their work." 
