# Blinko Monorepo

这是Blinko应用的monorepo结构，包含前端Tauri应用和后端Node.js服务。

## 项目结构

```
blinko-monorepo/
├── packages/
│   ├── backend/          # Node.js + tRPC后端服务
│   ├── frontend/         # Tauri跨平台前端应用
│   └── shared/           # 共享代码和类型定义
├── .env                  # 环境变量
└── package.json          # 根工作区配置
```

## 安装和设置

1. 确保已安装Bun包管理器：
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. 安装依赖并初始化项目：
   ```bash
   bun run setup
   ```

## 开发

### 后端开发
```bash
bun run dev:backend
```

### 前端开发
```bash
bun run dev:frontend
```

### Tauri应用开发
```bash
cd packages/frontend && bun run tauri:dev
```

## 构建

### 构建所有包
```bash
bun run build
```

### 构建Tauri应用
```bash
cd packages/frontend && bun run tauri:build
```

## 环境变量

在根目录的`.env`文件中设置全局环境变量。主要包括：

- `DATABASE_URL`: 数据库连接URL
- `JWT_SECRET`: JWT签名密钥
- `BACKEND_PORT`: 后端服务端口
- `FRONTEND_PORT`: 前端开发服务器端口 