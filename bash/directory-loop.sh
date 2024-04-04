#!/bin/bash

# This script lists all files in the current directory using a for loop.

echo "Listing files in the current directory:"

# Loop through each file in the directory
for file in *; do
  echo "$file"
done
