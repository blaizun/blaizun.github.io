#!/usr/bin/env bash

set -u

ROOT_DIR="${1:-.}"
DRY_RUN="${DRY_RUN:-0}"

find "$ROOT_DIR" -type f -name "*.png" | while IFS= read -r file; do
  dir="$(dirname "$file")"
  name="$(basename "$file" .png)"

  if [[ "$name" =~ ^([a-zA-Z_ -]*)([0-9]+)$ ]]; then
    number="${BASH_REMATCH[2]}"
    target="$dir/$number.png"

    if [[ "$file" == "$target" ]]; then
      continue
    fi

    if [[ -e "$target" ]]; then
      echo "Skipping (target exists): $file -> $target"
      continue
    fi

    if [[ "$DRY_RUN" == "1" ]]; then
      echo "Would rename: $file -> $target"
    else
      mv "$file" "$target"
      echo "Renamed: $file -> $target"
    fi
  fi
done
