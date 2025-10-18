# Cloudflare Worker 部署指南

这个 Worker 用于处理 GitHub OAuth 认证流程。

## 步骤 1: 创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写信息：
   - **Application name**: NavHub (或你的应用名称)
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-domain.com` (你的网站首页)
4. 点击 "Register application"
5. 记下 **Client ID** 和生成 **Client Secret**

## 步骤 2: 部署 Cloudflare Worker

### 方法 A: 通过 Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages**
3. 点击 **Create Application** → **Create Worker**
4. 给 Worker 命名（例如：`navhub-oauth`）
5. 点击 **Deploy**
6. 点击 **Edit Code**
7. 复制 `index.js` 的内容粘贴到编辑器
8. 点击 **Save and Deploy**

### 方法 B: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 进入 worker 目录
cd cloudflare-worker

# 部署
wrangler deploy
```

## 步骤 3: 配置环境变量

在 Cloudflare Dashboard 中：

1. 选择你的 Worker
2. 进入 **Settings** → **Variables**
3. 添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `GITHUB_CLIENT_ID` | `你的 Client ID` | GitHub OAuth App 的 Client ID |
| `GITHUB_CLIENT_SECRET` | `你的 Client Secret` | GitHub OAuth App 的 Client Secret |
| `ALLOWED_ORIGINS` | `https://your-domain.com` | 允许的来源（多个用逗号分隔） |

4. 点击 **Encrypt** 加密 Client Secret
5. 点击 **Save**

## 步骤 4: 获取 Worker URL

部署成功后，你会得到一个 Worker URL，类似：
```
https://navhub-oauth.your-username.workers.dev
```

记下这个 URL，在 `config.yml` 中配置时需要用到。

## 步骤 5: 配置 NavHub

编辑项目根目录的 `config.yml`，添加 OAuth 配置：

```yaml
# OAuth 登录配置
oauth:
  enabled: true
  clientId: "你的 GitHub Client ID"
  workerUrl: "https://navhub-oauth.your-username.workers.dev"
  redirectUri: "https://your-domain.com"
  scope: "read:user"
```

## 测试

1. 访问你的网站
2. 点击右上角的"登录"按钮
3. 应该跳转到 GitHub 授权页面
4. 授权后应该返回你的网站并显示已登录状态

## 故障排查

### 1. CORS 错误

确保在 Worker 环境变量中正确设置了 `ALLOWED_ORIGINS`，包含你的网站域名。

### 2. 回调失败

检查：
- GitHub OAuth App 的 callback URL 是否正确
- `config.yml` 中的 `redirectUri` 是否与 GitHub 设置一致

### 3. 获取 token 失败

检查：
- Worker 环境变量中的 Client ID 和 Secret 是否正确
- Worker 是否已部署最新代码

## 安全建议

1. **Client Secret 加密**: 在 Cloudflare Dashboard 中始终使用 "Encrypt" 选项保存 Client Secret
2. **限制来源**: 在 `ALLOWED_ORIGINS` 中只添加你信任的域名
3. **定期更新**: 定期更换 GitHub OAuth App 的 Client Secret
4. **最小权限**: OAuth scope 只请求必要的权限（默认只请求 `read:user`）

## 成本

Cloudflare Workers 免费套餐包括：
- 每天 100,000 次请求
- 10ms CPU 时间/请求
- 完全足够个人网站使用

## 更多信息

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)

