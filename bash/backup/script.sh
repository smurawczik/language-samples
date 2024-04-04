#!/bin/bash

# This script creates a backup of specified files/directories and compresses them into a tarball.

# Define backup directory
backup_dir="/Users/yiuriel/repositories/language-samples/bash/backup/files"

# Define files/directories to backup
source_dir="/Users/yiuriel/repositories/language-samples/bash/backup"
backup_file="backup_$(date +"%Y-%m-%d_%H-%M-%S").tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Create a tarball of the source directory
tar -czvf "$backup_dir/$backup_file" "$source_dir"

# Print success message
echo "Backup created: $backup_dir/$backup_file"
