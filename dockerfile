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

WORKDIR /

# 环境变量
ENV NODE_ENV=production
# 如果在HTTPS后面有代理或负载均衡器，可能需要禁用secure cookie
ENV DISABLE_SECURE_COOKIE=false
# 设置信任代理
ENV TRUST_PROXY=1

# 安装OpenSSL依赖
RUN apt-get update -y && apt-get install -y openssl

# 复制构建产物和必要文件
COPY --from=builder /app/dist ./app
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# 安装生产环境依赖
RUN bun install --production
RUN bun install prisma@5.21.1
RUN ./node_modules/.bin/prisma generate
# 暴露端口（根据实际应用调整）
EXPOSE 1111

# 创建启动脚本
RUN echo '#!/bin/sh\n\
echo "当前环境: $NODE_ENV"\n\
./node_modules/.bin/prisma migrate deploy\n\
bun app/seed.js\n\
bun app/index.js' > ./start.sh && chmod +x ./start.sh

# 启动命令
CMD ["./start.sh"]
