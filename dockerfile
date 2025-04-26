# Build Stage
FROM oven/bun:latest AS builder

# Add Build Arguments
ARG USE_MIRROR=false
ARG SHARP_VERSION=0.34.1

WORKDIR /app

# Sharp configuration to speed up installation
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1 \
    npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp" \
    npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips" \
    npm_config_sharp_libvips_binary_host_mirror="https://npmmirror.com/mirrors/sharp-libvips" \
    SHARP_DIST_BASE_URL="https://npmmirror.com/mirrors/sharp-libvips" \
    npm_config_unsafe_perm=true \
    npm_config_build_from_source=false \
    SHARP_CACHE_DIRECTORY=/tmp/sharp-cache

# Copy Project Files
COPY . .

# Configure Mirror and Install Dependencies
RUN mkdir -p ${SHARP_CACHE_DIRECTORY} && \
    if [ "$USE_MIRROR" = "true" ]; then \
        echo "Using Taobao Mirror to Install Dependencies" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "Using Default Mirror to Install Dependencies"; \
    fi && \
    # Pre-install sharp for ARM architecture to avoid slow postinstall scripts
    if [ "$(uname -m)" = "aarch64" ] || [ "$(uname -m)" = "arm64" ]; then \
        echo "Detected ARM architecture, installing sharp platform-specific dependencies..." && \
        bun install --platform=linux --arch=arm64 sharp@${SHARP_VERSION} --no-save --unsafe-perm || \
        bun install --force @img/sharp-linux-arm64 --no-save; \
    fi && \
    # Install dependencies and build app
    bun install --unsafe-perm && \
    bun run build:web && \
    bun run build:seed

# Runtime Stage - Using Smaller Base Image
FROM oven/bun:slim AS runner

# Add Build Arguments
ARG USE_MIRROR=false
ARG SHARP_VERSION=0.34.1

WORKDIR /app

# Environment Variables
ENV NODE_ENV=production \
    DISABLE_SECURE_COOKIE=false \
    TRUST_PROXY=1 \
    SHARP_IGNORE_GLOBAL_LIBVIPS=1 \
    npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp" \
    npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips" \
    npm_config_sharp_libvips_binary_host_mirror="https://npmmirror.com/mirrors/sharp-libvips" \
    SHARP_DIST_BASE_URL="https://npmmirror.com/mirrors/sharp-libvips" \
    npm_config_unsafe_perm=true \
    npm_config_build_from_source=false \
    SHARP_CACHE_DIRECTORY=/tmp/sharp-cache

# Install OpenSSL Dependencies and libvips required packages
RUN apt-get update -y && \
    apt-get install -y openssl libvips-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Build Artifacts and Necessary Files
COPY --from=builder /app/dist ./server
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/lute.min.js ./server/lute.min.js
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /tmp/sharp-cache /tmp/sharp-cache 2>/dev/null || true
COPY --from=builder /app/node_modules/sharp /app/node_modules/sharp 2>/dev/null || true

# Configure Mirror and Install Dependencies
RUN mkdir -p ${SHARP_CACHE_DIRECTORY} && \
    if [ "$USE_MIRROR" = "true" ]; then \
        echo "Using Taobao Mirror to Install Dependencies" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "Using Default Mirror to Install Dependencies"; \
    fi && \
    # Pre-install sharp for ARM architecture to avoid slow postinstall scripts
    if [ "$(uname -m)" = "aarch64" ] || [ "$(uname -m)" = "arm64" ]; then \
        echo "Detected ARM architecture, installing sharp platform-specific dependencies..." && \
        bun install --platform=linux --arch=arm64 sharp@${SHARP_VERSION} --no-save --unsafe-perm || \
        bun install --force @img/sharp-linux-arm64 --no-save; \
    fi && \
    # Install production dependencies
    bun install --production --unsafe-perm && \
    bun install prisma@5.21.1 && \
    ./node_modules/.bin/prisma generate && \
    # Remove onnxruntime-node
    find / -type d -name "onnxruntime-*" -exec rm -rf {} + 2>/dev/null || true

# Expose Port
EXPOSE 1111

# Create Startup Script
RUN echo '#!/bin/sh\n\
echo "Current Environment: $NODE_ENV"\n\
./node_modules/.bin/prisma migrate deploy\n\
bun server/seed.js\n\
bun server/index.js' > ./start.sh && chmod +x ./start.sh

# Startup Command
CMD ["./start.sh"]
