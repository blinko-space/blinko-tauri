# Build Stage
FROM oven/bun:latest AS builder

# Add Build Arguments
ARG USE_MIRROR=false

WORKDIR /app

# Copy Project Files
COPY . .

# Configure Mirror Based on USE_MIRROR Parameter
RUN if [ "$USE_MIRROR" = "true" ]; then \
        echo "Using Taobao Mirror to Install Dependencies" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "Using Default Mirror to Install Dependencies"; \
    fi

# Install Dependencies and Build App
RUN bun install --verbose
RUN bun run build:web
RUN bun run build:seed

# Runtime Stage - Using Smaller Base Image
FROM oven/bun:slim AS runner

# Add Build Arguments
ARG USE_MIRROR=false

WORKDIR /app

# Environment Variables
ENV NODE_ENV=production
# If there is a proxy or load balancer behind HTTPS, you may need to disable secure cookies
ENV DISABLE_SECURE_COOKIE=false
# Set Trust Proxy
ENV TRUST_PROXY=1

# Install OpenSSL Dependencies
RUN apt-get update -y && apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Build Artifacts and Necessary Files
COPY --from=builder /app/dist ./server
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/lute.min.js ./server/lute.min.js
COPY --from=builder /app/prisma ./prisma

# Configure Mirror Based on USE_MIRROR Parameter
RUN if [ "$USE_MIRROR" = "true" ]; then \
        echo "Using Taobao Mirror to Install Dependencies" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "Using Default Mirror to Install Dependencies"; \
    fi

# Install Production Dependencies
RUN bun install --production
RUN bun install prisma@5.21.1
RUN ./node_modules/.bin/prisma generate

# remove onnxruntime-node
RUN find / -type d -name "onnxruntime-*" -exec rm -rf {} +

# Expose Port (Adjust According to Actual Application)
EXPOSE 1111

# Create Startup Script
RUN echo '#!/bin/sh\n\
echo "Current Environment: $NODE_ENV"\n\
./node_modules/.bin/prisma migrate deploy\n\
bun server/seed.js\n\
bun server/index.js' > ./start.sh && chmod +x ./start.sh

# Startup Command
CMD ["./start.sh"]
