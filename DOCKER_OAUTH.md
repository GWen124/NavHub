# NavHub Docker OAuth 部署指南

本指南介绍如何使用 Docker 部署带有内置 OAuth 后端的 NavHub，无需依赖 Cloudflare Workers。

## 📋 目录

- [部署方式对比](#部署方式对比)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [部署选项](#部署选项)
- [故障排查](#故障排查)

---

## 🆚 部署方式对比

NavHub 支持两种 OAuth 部署方式：

| 特性 | Cloudflare Workers | Docker 内置服务器 |
|------|-------------------|------------------|
| **部署难度** | 需要 CF 账号 | Docker 一键部署 |
| **维护成本** | CF 托管，免维护 | 需要维护服务器 |
| **网络性能** | 全球 CDN 边缘节点 | 取决于服务器位置 |
| **成本** | 免费额度充足 | 服务器资源成本 |
| **适用场景** | 公开网站、个人博客 | 私有部署、企业内网、自托管 |
| **配置复杂度** | 需要单独配置 Workers | 与前端一起部署 |
| **端口管理** | 无需管理 | 需要开放 3001 端口或反向代理 |

**推荐选择**：
- ✅ **公开网站**：使用 Cloudflare Workers（性能更好、免费）
- ✅ **私有部署/内网环境**：使用 Docker 内置服务器（更简单、更可控）

---

## 🚀 快速开始

### 前置要求

1. **Docker** 和 **Docker Compose** 已安装
2. **GitHub OAuth App** 已创建（[创建教程](#创建-github-oauth-app)）

### 一键部署

```bash
# 1. 克隆项目
git clone https://github.com/GWen124/NavHub.git
cd NavHub

# 2. 创建环境变量文件
cat > .env << EOF
GITHUB_CLIENT_ID=你的GitHub_Client_ID
GITHUB_CLIENT_SECRET=你的GitHub_Client_Secret
ALLOWED_ORIGINS=http://localhost,https://your-domain.com
EOF

# 3. 启动服务
docker-compose -f docker-compose.oauth.yml up -d

# 4. 访问应用
# 打开浏览器访问 http://localhost
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose -f docker-compose.oauth.yml logs -f

# 只查看 OAuth 服务器日志
docker-compose -f docker-compose.oauth.yml logs -f oauth-server

# 只查看前端日志
docker-compose -f docker-compose.oauth.yml logs -f navhub
```

### 停止服务

```bash
docker-compose -f docker-compose.oauth.yml down
```

---

## ⚙️ 配置说明

### 1. 创建 GitHub OAuth App

访问 https://github.com/settings/developers

创建新的 OAuth App：

```
Application name: NavHub
Homepage URL: http://localhost （或你的域名）
Authorization callback URL: http://localhost （或你的域名）
```

获得：
- **Client ID**
- **Client Secret**

### 2. 配置环境变量

创建 `.env` 文件：

```env
# GitHub OAuth 凭证（必填）
GITHUB_CLIENT_ID=ghp_xxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxx

# OAuth 服务器端口（可选，默认 3001）
OAUTH_PORT=3001

# 允许的来源 - CORS 配置（必填）
# 本地开发
ALLOWED_ORIGINS=http://localhost,http://localhost:80,http://localhost:5173

# 生产环境
# ALLOWED_ORIGINS=https://navhub.yourdomain.com

# 多个域名用逗号分隔
# ALLOWED_ORIGINS=https://domain1.com,https://domain2.com

# 允许所有来源（不推荐用于生产）
# ALLOWED_ORIGINS=*
```

### 3. 配置 NavHub

编辑 `config.yml`：

```yaml
oauth:
  enabled: true
  clientId: "你的GitHub Client ID"  # 与 .env 中相同
  
  # Docker 内置服务器（本地开发）
  workerUrl: "http://localhost:3001"
  redirectUri: "http://localhost"
  
  # 或使用 Nginx 反向代理（生产环境推荐）
  # workerUrl: "https://your-domain.com/api/oauth"
  # redirectUri: "https://your-domain.com"
  
  # 白名单用户
  allowedUsers:
    - "your-github-username"
```

---

## 🐳 部署选项

### 选项一：使用 docker-compose（推荐）

**优点**：
- 自动管理服务依赖
- 服务间网络通信
- 一键启动/停止

**步骤**：

```bash
# 使用 OAuth 版本的 docker-compose
docker-compose -f docker-compose.oauth.yml up -d
```

### 选项二：使用 Dockerfile.oauth

单个容器同时运行前端和 OAuth 服务器。

**优点**：
- 单个镜像部署
- 使用 supervisor 管理多进程
- 更简单的网络配置

**步骤**：

```bash
# 构建镜像
docker build -f Dockerfile.oauth -t navhub-oauth .

# 运行容器
docker run -d \
  -p 80:80 \
  -p 3001:3001 \
  -e GITHUB_CLIENT_ID=your_client_id \
  -e GITHUB_CLIENT_SECRET=your_client_secret \
  -e ALLOWED_ORIGINS=http://localhost \
  -v $(pwd)/config.yml:/app/config.yml:ro \
  navhub-oauth
```

### 选项三：标准 Docker + Cloudflare Workers

继续使用原来的方式：

```bash
# 使用标准 docker-compose
docker-compose up -d

# OAuth 后端使用 Cloudflare Workers
# 在 config.yml 中配置：
# workerUrl: "https://navhub-oauth.your-username.workers.dev"
```

---

## 🔧 高级配置

### 使用 Nginx 反向代理

在生产环境中，推荐使用 Nginx 反向代理 OAuth 服务器，统一使用 80/443 端口。

**docker-compose.oauth.yml 已配置好反向代理**：

```nginx
# OAuth API 请求
location /api/oauth/ {
    proxy_pass http://localhost:3001/;
}
```

前端配置：
```yaml
oauth:
  workerUrl: "https://your-domain.com/api/oauth"  # 注意路径
```

这样：
- 前端：https://your-domain.com
- OAuth API：https://your-domain.com/api/oauth/callback

### 自定义端口

如果 3001 端口冲突，修改 `.env`：

```env
OAUTH_PORT=4001
```

并修改 docker-compose：

```yaml
services:
  oauth-server:
    ports:
      - "4001:4001"
    environment:
      - OAUTH_PORT=4001
```

### SSL/HTTPS 配置

使用 Let's Encrypt + Nginx：

```yaml
services:
  nginx-proxy:
    image: jwilder/nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs:ro
```

---

## 🔐 安全最佳实践

### 1. 环境变量管理

**开发环境**：
```bash
# 使用 .env 文件
cp .env.example .env
vim .env
```

**生产环境**：
```bash
# 使用 Docker secrets
docker secret create github_client_id ./client_id.txt
docker secret create github_client_secret ./client_secret.txt
```

### 2. CORS 配置

**开发环境**：
```env
ALLOWED_ORIGINS=http://localhost,http://localhost:5173
```

**生产环境**：
```env
# 只允许你的域名
ALLOWED_ORIGINS=https://navhub.yourdomain.com

# 多个域名
ALLOWED_ORIGINS=https://navhub.yourdomain.com,https://nav.example.com
```

**⚠️ 警告**：不要在生产环境使用 `ALLOWED_ORIGINS=*`

### 3. 网络隔离

```yaml
networks:
  navhub-network:
    driver: bridge
    internal: false  # 允许外部访问
```

### 4. 日志管理

```yaml
services:
  oauth-server:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## 🐛 故障排查

### 问题 1：OAuth 登录失败

**检查清单**：
```bash
# 1. 检查环境变量是否设置
docker-compose -f docker-compose.oauth.yml exec oauth-server env | grep GITHUB

# 2. 查看 OAuth 服务器日志
docker-compose -f docker-compose.oauth.yml logs oauth-server

# 3. 测试健康检查
curl http://localhost:3001/health

# 4. 检查 GitHub OAuth App 配置
# - Callback URL 是否正确
# - Client ID 是否匹配
```

### 问题 2：CORS 错误

**错误信息**：
```
Access to fetch at 'http://localhost:3001/callback' has been blocked by CORS policy
```

**解决方案**：
```env
# 确保 ALLOWED_ORIGINS 包含前端地址
ALLOWED_ORIGINS=http://localhost,http://localhost:80
```

### 问题 3：容器无法通信

```bash
# 检查网络
docker network ls
docker network inspect navhub_navhub-network

# 测试连接
docker-compose -f docker-compose.oauth.yml exec navhub ping oauth-server
```

### 问题 4：端口已被占用

```bash
# 检查端口占用
lsof -i :3001
lsof -i :80

# 修改端口
# 编辑 docker-compose.oauth.yml
ports:
  - "8080:80"      # 前端改用 8080
  - "3002:3001"    # OAuth 改用 3002
```

---

## 📊 监控和维护

### 查看服务状态

```bash
# 查看所有服务
docker-compose -f docker-compose.oauth.yml ps

# 查看资源使用
docker stats navhub navhub-oauth-server
```

### 更新服务

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose -f docker-compose.oauth.yml up -d --build
```

### 备份数据

```bash
# 导出配置
docker cp navhub:/app/config.yml ./backup/config.yml
docker cp navhub:/app/public/footer-links.json ./backup/footer-links.json
```

---

## 🔄 迁移指南

### 从 Cloudflare Workers 迁移

1. **部署 Docker OAuth 服务器**
   ```bash
   docker-compose -f docker-compose.oauth.yml up -d
   ```

2. **修改 config.yml**
   ```yaml
   oauth:
     # 从这个
     workerUrl: "https://navhub-oauth.your-username.workers.dev"
     # 改为这个
     workerUrl: "http://localhost:3001"
     # 或使用反向代理
     workerUrl: "https://your-domain.com/api/oauth"
   ```

3. **测试登录功能**

4. **（可选）删除 Cloudflare Worker**

### 从 Docker 迁移到 Cloudflare Workers

1. **部署 Cloudflare Worker**（参考 [OAUTH_LOGIN_GUIDE.md](OAUTH_LOGIN_GUIDE.md)）

2. **修改 config.yml**
   ```yaml
   oauth:
     workerUrl: "https://navhub-oauth.your-username.workers.dev"
   ```

3. **停止 Docker OAuth 服务器**
   ```bash
   docker-compose -f docker-compose.oauth.yml stop oauth-server
   ```

---

## 📖 完整示例

### 开发环境配置

**.env**:
```env
GITHUB_CLIENT_ID=Ov23liXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=1234567890abcdef1234567890abcdef12345678
OAUTH_PORT=3001
ALLOWED_ORIGINS=http://localhost,http://localhost:5173
```

**config.yml**:
```yaml
oauth:
  enabled: true
  clientId: "Ov23liXXXXXXXXXXXXXX"
  workerUrl: "http://localhost:3001"
  redirectUri: "http://localhost"
  allowedUsers:
    - "GWen124"
```

**启动**:
```bash
docker-compose -f docker-compose.oauth.yml up -d
```

### 生产环境配置

**.env**:
```env
GITHUB_CLIENT_ID=Ov23liXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=1234567890abcdef1234567890abcdef12345678
OAUTH_PORT=3001
ALLOWED_ORIGINS=https://navhub.yourdomain.com
```

**config.yml**:
```yaml
oauth:
  enabled: true
  clientId: "Ov23liXXXXXXXXXXXXXX"
  workerUrl: "https://navhub.yourdomain.com/api/oauth"
  redirectUri: "https://navhub.yourdomain.com"
  allowedUsers:
    - "GWen124"
    - "user2"
```

**GitHub OAuth App**:
```
Homepage URL: https://navhub.yourdomain.com
Authorization callback URL: https://navhub.yourdomain.com
```

---

## 🎯 最佳实践

### 1. 使用环境变量

❌ **不要这样做**：
```yaml
# 不要在 docker-compose.yml 中硬编码
environment:
  - GITHUB_CLIENT_ID=Ov23liXXXXXXXX
```

✅ **应该这样做**：
```yaml
# 使用 .env 文件
environment:
  - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
```

### 2. 生产环境使用反向代理

❌ **不要这样做**：
```yaml
# 直接暴露 OAuth 服务器端口
workerUrl: "http://your-domain.com:3001"
```

✅ **应该这样做**：
```yaml
# 通过 Nginx 反向代理
workerUrl: "https://your-domain.com/api/oauth"
```

### 3. 限制 CORS 来源

❌ **不要这样做**：
```env
ALLOWED_ORIGINS=*
```

✅ **应该这样做**：
```env
ALLOWED_ORIGINS=https://navhub.yourdomain.com
```

---

## 📦 Docker Compose 完整配置

```yaml
version: '3.8'

services:
  oauth-server:
    build:
      context: ./oauth-server
    container_name: navhub-oauth
    ports:
      - "3001:3001"
    environment:
      - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
      - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
      - OAUTH_PORT=3001
      - ALLOWED_ORIGINS=${ALLOWED_ORIGINS}
    restart: unless-stopped
    networks:
      - navhub-network
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  navhub:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: navhub
    ports:
      - "80:80"
    volumes:
      - ./config.yml:/app/config.yml:ro
    environment:
      - TZ=Asia/Shanghai
    depends_on:
      oauth-server:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - navhub-network

networks:
  navhub-network:
    driver: bridge
```

---

## 🔍 健康检查

### 检查 OAuth 服务器

```bash
# 方法1：使用 curl
curl http://localhost:3001/health

# 方法2：使用 docker
docker-compose -f docker-compose.oauth.yml exec oauth-server wget -qO- http://localhost:3001/health

# 预期响应
{
  "status": "ok",
  "service": "NavHub OAuth Server",
  "timestamp": "2025-10-18T..."
}
```

### 检查前端

```bash
curl http://localhost

# 应该返回 HTML 内容
```

---

## 🎓 常见问题

### Q1：可以同时使用两种 OAuth 后端吗？

**A**：可以！你可以：
- 本地开发使用 Docker OAuth 服务器
- 生产环境使用 Cloudflare Workers

只需在不同环境中配置不同的 `workerUrl`。

### Q2：OAuth 服务器需要公网访问吗？

**A**：取决于部署方式：
- **内网部署**：不需要，前端和 OAuth 服务器都在内网
- **公网部署**：需要，GitHub 需要能访问你的 callback URL

### Q3：可以使用其他 OAuth 提供商吗？

**A**：目前只支持 GitHub OAuth，但你可以修改 `oauth-server/server.js` 来支持其他提供商（如 Google、GitLab 等）。

### Q4：如何查看 OAuth 请求日志？

```bash
# 实时查看日志
docker-compose -f docker-compose.oauth.yml logs -f oauth-server

# 查看最近100行
docker-compose -f docker-compose.oauth.yml logs --tail=100 oauth-server
```

---

## 🚀 生产环境部署

### 使用 HTTPS + Let's Encrypt

```bash
# 1. 安装 nginx-proxy 和 letsencrypt
git clone https://github.com/nginx-proxy/acme-companion.git

# 2. 修改 docker-compose.oauth.yml
version: '3.8'

services:
  nginx-proxy:
    image: nginxproxy/nginx-proxy
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs
    networks:
      - navhub-network

  oauth-server:
    environment:
      - VIRTUAL_HOST=navhub.yourdomain.com
      - VIRTUAL_PATH=/api/oauth
      - VIRTUAL_PORT=3001
      - LETSENCRYPT_HOST=navhub.yourdomain.com
      - LETSENCRYPT_EMAIL=your-email@example.com

  navhub:
    environment:
      - VIRTUAL_HOST=navhub.yourdomain.com
      - LETSENCRYPT_HOST=navhub.yourdomain.com
      - LETSENCRYPT_EMAIL=your-email@example.com
```

### 使用 Traefik

```yaml
services:
  oauth-server:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.oauth.rule=Host(`navhub.yourdomain.com`) && PathPrefix(`/api/oauth`)"
      - "traefik.http.services.oauth.loadbalancer.server.port=3001"
```

---

## 📚 相关文档

- [OAuth 登录配置指南](OAUTH_LOGIN_GUIDE.md)
- [Docker 部署文档](DOCKER.md)
- [环境变量配置](ENV_CONFIG_GUIDE.md)

---

## 💡 提示

1. **首次部署**建议先使用 `docker-compose.oauth.yml` 在本地测试
2. **生产环境**建议使用 Nginx 反向代理统一端口
3. **安全第一**：务必配置正确的 CORS 和白名单
4. **定期更新**：及时更新 Docker 镜像和依赖包

---

<div align="center">

**🎉 现在你可以在 Docker 环境中自托管完整的 NavHub（包括 OAuth 后端）！**

[返回主文档](README.md) | [查看部署文档](DEPLOYMENT.md)

</div>

