# 构建阶段
FROM oven/bun:latest AS builder

# 添加构建参数
ARG USE_MIRROR=false

WORKDIR /app

# 复制项目文件
COPY . .

# 根据USE_MIRROR参数设置镜像
RUN if [ "$USE_MIRROR" = "true" ]; then \
        echo "使用淘宝镜像源安装依赖" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "使用默认镜像源安装依赖"; \
    fi

# 安装依赖并构建应用
RUN bun install
RUN bun run build:web
RUN bun run build:seed

# 运行阶段 - 使用更小的基础镜像
FROM oven/bun:slim AS runner

# 添加构建参数
ARG USE_MIRROR=false

WORKDIR /app

# 环境变量
ENV NODE_ENV=production
# 如果在HTTPS后面有代理或负载均衡器，可能需要禁用secure cookie
ENV DISABLE_SECURE_COOKIE=false
# 设置信任代理
ENV TRUST_PROXY=1

# 安装OpenSSL依赖
RUN apt-get update -y && apt-get install -y openssl

# 复制构建产物和必要文件
COPY --from=builder /app/dist ./server
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/lute.min.js ./server/lute.min.js
COPY --from=builder /app/prisma ./prisma

# 根据USE_MIRROR参数设置镜像
RUN if [ "$USE_MIRROR" = "true" ]; then \
        echo "使用淘宝镜像源安装依赖" && \
        echo '{ "install": { "registry": "https://registry.npmmirror.com" } }' > .bunfig.json; \
    else \
        echo "使用默认镜像源安装依赖"; \
    fi

# 安装生产环境依赖
RUN bun install --production
RUN bun install prisma@5.21.1
RUN ./node_modules/.bin/prisma generate

# remove onnxruntime-node
RUN find / -type d -name "onnxruntime-*" -exec rm -rf {} +

# 暴露端口（根据实际应用调整）
EXPOSE 1111

# 创建启动脚本
RUN echo '#!/bin/sh\n\
echo "当前环境: $NODE_ENV"\n\
./node_modules/.bin/prisma migrate deploy\n\
bun server/seed.js\n\
bun server/index.js' > ./start.sh && chmod +x ./start.sh

# 启动命令
CMD ["./start.sh"]
