# NavHub OAuth Server

内置的 OAuth 后端服务器，专为 Docker 部署设计，无需依赖 Cloudflare Workers。

## 🚀 快速开始

### 1. 配置环境变量

```bash
cp .env.example .env
vim .env
```

配置以下内容：
```env
GITHUB_CLIENT_ID=你的GitHub Client ID
GITHUB_CLIENT_SECRET=你的GitHub Client Secret
OAUTH_PORT=3001
ALLOWED_ORIGINS=http://localhost,https://your-domain.com
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动服务器

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

## 🐳 Docker 部署

### 使用 docker-compose（推荐）

在项目根目录的 `docker-compose.yml` 中已包含 OAuth 服务器配置。

启动完整服务：
```bash
docker-compose up -d
```

### 单独运行 OAuth 服务器

```bash
docker run -d \
  -p 3001:3001 \
  -e GITHUB_CLIENT_ID=your_client_id \
  -e GITHUB_CLIENT_SECRET=your_client_secret \
  -e ALLOWED_ORIGINS=https://your-domain.com \
  navhub-oauth-server
```

## 🔧 配置说明

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `GITHUB_CLIENT_ID` | GitHub OAuth App 的 Client ID | 必填 |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App 的 Client Secret | 必填 |
| `OAUTH_PORT` | OAuth 服务器监听端口 | 3001 |
| `ALLOWED_ORIGINS` | 允许的 CORS 来源（逗号分隔） | localhost |

### NavHub 前端配置

在 `config.yml` 中配置：

```yaml
oauth:
  enabled: true
  clientId: "你的GitHub Client ID"
  # Docker 内置服务器
  workerUrl: "http://localhost:3001"  # 本地开发
  # 或
  workerUrl: "https://your-domain.com/api/oauth"  # 生产环境
  redirectUri: "http://localhost"
  allowedUsers:
    - "your-github-username"
```

## 📡 API 端点

### POST /callback

处理 GitHub OAuth 回调，交换 access token。

**请求体：**
```json
{
  "code": "github_authorization_code"
}
```

**响应：**
```json
{
  "access_token": "gho_xxxxx",
  "token_type": "bearer",
  "scope": "read:user"
}
```

### GET /health

健康检查端点。

**响应：**
```json
{
  "status": "ok",
  "service": "NavHub OAuth Server",
  "timestamp": "2025-10-18T..."
}
```

## 🔒 安全建议

1. **使用 HTTPS**：生产环境必须使用 HTTPS
2. **限制 CORS**：仅允许你的域名访问
3. **保护环境变量**：不要将 `.env` 提交到 Git
4. **使用 Secrets**：在 Docker/K8s 中使用 secrets 管理敏感信息
5. **定期更新依赖**：运行 `npm audit` 检查安全漏洞

## 🆚 Cloudflare Workers vs 内置服务器

| 特性 | Cloudflare Workers | 内置 OAuth 服务器 |
|------|-------------------|------------------|
| **部署难度** | 需要 CF 账号和配置 | Docker 一键部署 |
| **性能** | 全球边缘节点 | 取决于服务器位置 |
| **成本** | 免费额度充足 | 服务器成本 |
| **维护** | CF 托管 | 需要自行维护 |
| **适用场景** | 公开网站 | 私有部署、内网环境 |

## 🐛 故障排查

### OAuth 回调失败

1. 检查 GitHub OAuth App 的 callback URL 是否正确
2. 检查 `ALLOWED_ORIGINS` 是否包含前端地址
3. 查看服务器日志：`docker-compose logs oauth-server`

### CORS 错误

确保 `ALLOWED_ORIGINS` 包含前端的完整 URL（包括协议和端口）。

### 端口冲突

如果 3001 端口被占用，修改 `OAUTH_PORT` 环境变量。

## 📝 开发说明

### 本地开发

```bash
cd oauth-server
npm install
npm run dev
```

服务器会在端口 3001 启动，支持热重载。

### 日志输出

服务器会输出详细的日志信息，包括：
- OAuth 请求处理
- Token 交换状态
- 错误信息

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

