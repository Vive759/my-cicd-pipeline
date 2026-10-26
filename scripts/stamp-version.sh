#!/bin/sh
# Writes build info into app/version.json (called by Jenkins before docker build)
BUILD="${BUILD_NUMBER:-local}"
COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
TIME="$(date -u '+%Y-%m-%d %H:%M:%S')"
printf '{"build":"%s","commit":"%s","time":"%s"}\n' "$BUILD" "$COMMIT" "$TIME" > app/version.json
cat app/version.json
