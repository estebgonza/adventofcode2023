# Useless script (I was procrastinating)
#!/bin/sh
day=$1
if [ -z "$day" ]; then
  echo "Please input day number"
  exit 1
elif [ ! -d "day$day" ]; then
  echo "Day $day not found"
  exit 1
fi
bun "day$day/index.ts"
