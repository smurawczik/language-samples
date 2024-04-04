#!/bin/bash

# This script displays basic system information.

# Display hostname
echo "Hostname: $(hostname)"

# Display operating system
echo "Operating System: $(uname -a)"

# Display CPU information
echo "CPU Information:"
echo "$(sysctl -n machdep.cpu.brand_string)"

# Display memory information
echo "Memory Information:"
echo "$(sysctl -n hw.memsize | awk '{ print $0 / 1024 / 1024 / 1024 " GB" }')"
