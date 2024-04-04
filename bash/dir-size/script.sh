#!/bin/bash

# This script calculates the total size of a directory and its contents.

# Define directory to check
directory="/Users/yiuriel/repositories/language-samples/bash"

# Calculate total size
total_size=$(du -sh "$directory" | awk '{ print $1 }')

# Print total size
echo "Total size of $directory: $total_size"
