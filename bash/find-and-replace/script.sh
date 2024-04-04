#!/bin/bash

# This script searches for a specific string in all text files in a directory and replaces it with another string.

# Define search and replace strings
echo "Please enter search string:"
read search_string

echo "Please enter replace string:"
read replace_string

# create a variable that is the current directory

# Search and replace in all text files
directory="/Users/yiuriel/repositories/language-samples/files/"

# Search and replace in all text files
for file in "$directory"/*.txt; do
  sed -i '' "s/$search_string/$replace_string/g" "$file"
  echo "Replaced '$search_string' with '$replace_string' in $file"
done
