#!/bin/bash

# This script monitors the filesystem for changes and logs them to a file.

# Define log file
log_file="/Users/yiuriel/repositories/language-samples/bash/file-monitor/log.txt"

# Monitor filesystem changes and log them
fswatch -0 -r "/Users/yiuriel/repositories/language-samples/bash" | while IFS= read -d "" event; do
  action=$(basename "$event")
  file=$(dirname "$event")
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $action: $file" >>"$log_file"
done
