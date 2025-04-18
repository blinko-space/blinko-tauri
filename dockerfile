# 构建阶段
FROM oven/bun:latest AS builder

WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖并构建应用
RUN bun install
RUN bun run build:web
RUN bun run build:seed

# 运行阶段 - 使用更小的基础镜像
FROM oven/bun:slim AS runner

WORKDIR /app

# 环境变量
ENV NODE_ENV=production

# 安装OpenSSL依赖
RUN apt-get update -y && apt-get install -y openssl

# 复制构建产物和必要文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/prisma ./prisma

# 安装生产环境依赖
RUN bun install --production
RUN bun x prisma generate

# 暴露端口（根据实际应用调整）
EXPOSE 1111

# 创建启动脚本
RUN echo '#!/bin/sh\n\
bun x prisma migrate deploy\n\
bun dist/seed.js\n\
bun dist/index.js' > ./start.sh && chmod +x ./start.sh

# 启动命令
CMD ["./start.sh"]
