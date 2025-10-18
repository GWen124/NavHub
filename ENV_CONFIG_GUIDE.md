# 环境变量配置指南

为了防止隐私泄露，OAuth 敏感信息可以通过环境变量配置，而不用硬编码在 `config.yml` 中提交到仓库。

## 快速开始

### 1. 创建环境变量文件

```bash
# 复制示例文件
cp .env.example .env.local
```

### 2. 编辑 .env.local

```env
# OAuth 配置
VITE_OAUTH_ENABLED=true
VITE_OAUTH_CLIENT_ID=your_github_client_id_here
VITE_OAUTH_WORKER_URL=https://your-worker.workers.dev
```

**说明**：
- `redirectUri` 自动使用当前网站域名，无需配置
- `scope` 固定为 `read:user`，无需配置

### 3. 启动开发服务器

```bash
npm run dev
```

环境变量会自动生效！🎉

## 配置优先级

环境变量的优先级**高于** `config.yml`：

```
.env.local > .env > config.yml
```

这意味着：
- 如果设置了环境变量，会使用环境变量的值
- 如果没有设置环境变量，会使用 `config.yml` 中的值

## 支持的环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_OAUTH_ENABLED` | 是否启用 OAuth 登录 | `true` 或 `false` |
| `VITE_OAUTH_CLIENT_ID` | GitHub OAuth App Client ID | `Iv1.abc123...` |
| `VITE_OAUTH_WORKER_URL` | Cloudflare Worker URL | `https://oauth.workers.dev` |

**注意**：
- `redirectUri` 会自动使用当前网站的域名（`window.location.origin`）
- `scope` 固定为 `read:user`（只读取用户基本信息）

## 使用场景

### 场景 1: 本地开发

**本地使用环境变量，不提交敏感信息：**

1. 创建 `.env.local`（已在 .gitignore 中，不会被提交）
2. 填入你的 OAuth 配置
3. `config.yml` 中的 OAuth 配置可以留空或设为 false

```yaml
# config.yml - 提交到仓库
oauth:
  enabled: false  # 本地用环境变量覆盖
  clientId: ""
  workerUrl: ""
```

```env
# .env.local - 不提交到仓库
VITE_OAUTH_ENABLED=true
VITE_OAUTH_CLIENT_ID=your_real_client_id
VITE_OAUTH_WORKER_URL=https://your-worker.workers.dev
```

### 场景 2: GitHub Pages 部署

**使用 GitHub Actions Secrets：**

1. 在仓库设置中添加 Secrets：
   - `VITE_OAUTH_ENABLED`
   - `VITE_OAUTH_CLIENT_ID`
   - `VITE_OAUTH_WORKER_URL`

2. 在 GitHub Actions workflow 中使用：

```yaml
- name: Build
  env:
    VITE_OAUTH_ENABLED: ${{ secrets.VITE_OAUTH_ENABLED }}
    VITE_OAUTH_CLIENT_ID: ${{ secrets.VITE_OAUTH_CLIENT_ID }}
    VITE_OAUTH_WORKER_URL: ${{ secrets.VITE_OAUTH_WORKER_URL }}
  run: npm run build
```

### 场景 3: 外部配置 + 环境变量

**结合使用外部配置和环境变量：**

```yaml
# config.yml
externalProjectConfig:
  url: "https://gist.githubusercontent.com/username/xxx/raw/config.yml"

oauth:
  enabled: false  # 外部配置中设置
  clientId: ""    # 使用环境变量
```

```env
# .env.local
VITE_OAUTH_CLIENT_ID=your_client_id  # 覆盖外部配置
VITE_OAUTH_WORKER_URL=your_worker_url
```

### 场景 4: Vercel/Netlify 部署

**在平台设置中配置环境变量：**

#### Vercel
1. 进入项目 Settings → Environment Variables
2. 添加变量（选择 Production / Preview / Development）
3. 部署时自动注入

#### Netlify
1. 进入 Site settings → Build & deploy → Environment
2. 添加环境变量
3. 触发重新部署

## 安全建议

### ✅ 推荐做法

1. **敏感信息用环境变量**
   ```env
   # .env.local（不提交）
   VITE_OAUTH_CLIENT_ID=real_value
   VITE_OAUTH_WORKER_URL=real_url
   ```

2. **公开信息用 config.yml**
   ```yaml
   # config.yml（可提交）
   oauth:
     enabled: true  # 公开的开关
     scope: "read:user"  # 公开的权限范围
   ```

3. **示例文件用占位符**
   ```env
   # .env.example（提交）
   VITE_OAUTH_CLIENT_ID=
   VITE_OAUTH_WORKER_URL=
   ```

### ❌ 不推荐做法

1. **不要提交 .env.local**
   - 已在 .gitignore 中
   - 检查：`git status` 不应显示 .env.local

2. **不要在 config.yml 中硬编码敏感信息**
   ```yaml
   # ❌ 不要这样做
   oauth:
     clientId: "Iv1.abc123..."  # 会暴露到 GitHub
   ```

3. **不要在公开仓库中提交 Client Secret**
   - Client Secret 应该只在 Cloudflare Worker 中配置
   - 前端永远不应该有 Client Secret

## 验证配置

### 检查环境变量是否生效

开发服务器启动后，打开浏览器控制台：

```javascript
// 检查配置
console.log('OAuth Enabled:', appConfig.oauth.enabled)
console.log('Client ID:', appConfig.oauth.clientId ? '已设置' : '未设置')
```

### 常见问题

**Q: 修改 .env.local 后没有生效？**

A: 需要重启开发服务器：
```bash
# 停止服务器（Ctrl+C）
# 重新启动
npm run dev
```

**Q: 构建后环境变量不生效？**

A: 确保构建时环境变量已设置：
```bash
# 本地构建
npm run build

# 或显式设置
VITE_OAUTH_ENABLED=true npm run build
```

**Q: 如何查看实际使用的配置？**

A: 查看生成的配置文件：
```bash
cat src/config/generated.ts | grep -A 10 "oauth:"
```

## 示例：完整的本地开发配置

### 1. .env.local（本地，不提交）
```env
VITE_OAUTH_ENABLED=true
VITE_OAUTH_CLIENT_ID=Iv1.1234567890abcdef
VITE_OAUTH_WORKER_URL=https://navhub-oauth.my-account.workers.dev
```

### 2. config.yml（公开，提交）
```yaml
oauth:
  enabled: false  # 生产环境通过环境变量启用
  clientId: ""
  workerUrl: ""
```

### 3. .gitignore（确保包含）
```
.env.local
.env.*.local
```

这样配置后：
- ✅ 本地开发正常工作
- ✅ 敏感信息不会泄露
- ✅ 公开仓库安全
- ✅ 部署平台可以独立配置

## 更多信息

- [Vite 环境变量文档](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [OAuth 登录功能指南](OAUTH_LOGIN_GUIDE.md)

