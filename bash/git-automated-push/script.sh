#!/bin/bash

# This script automatically commits changes to a Git repository and pushes them to a remote repository.

# Define commit message
commit_message="Automated commit from shell script."

# Add all changes
git add .

# Commit changes
git commit -m "$commit_message"

# Get current branch
current_branch=$(git symbolic-ref --short HEAD)

# Push changes to remote repository
git push origin "$current_branch"
