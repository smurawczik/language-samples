#!/bin/bash

# This script checks if a number is even or odd.

# Prompt the user to enter a number
echo "Please enter a number:"

# Read user input
read number

# Check if the number is even or odd
if ((number % 2 == 0)); then
  echo "$number is even."
else
  echo "$number is odd."
fi
