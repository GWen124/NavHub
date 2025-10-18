# GitHub OAuth 登录功能使用指南

## 功能概述

NavHub 现在支持 GitHub OAuth 登录功能。登录后可以查看被标记为 `requireAuth: true` 的私密分组，实现内容的访问控制。

## 特性

- ✅ 基于 GitHub OAuth 的安全认证
- ✅ 登录后显示私密分组
- ✅ 美观的用户界面
- ✅ 会话持久化（localStorage）
- ✅ 安全的 token 处理（后端在 Cloudflare Workers）
- ✅ 完全免费（Cloudflare Workers 免费套餐足够使用）

## 快速开始

### 步骤 1: 创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写信息：
   - **Application name**: `NavHub` (或你喜欢的名称)
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-domain.com` (你的网站首页)
4. 创建后记下 **Client ID**
5. 生成并记下 **Client Secret**（保密！）

### 步骤 2: 部署 Cloudflare Worker

详细步骤请参考 `cloudflare-worker/README.md`

简要步骤：
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 创建新的 Worker
3. 复制 `cloudflare-worker/index.js` 的代码
4. 配置环境变量（Client ID, Client Secret, Allowed Origins）
5. 部署并记下 Worker URL

### 步骤 3: 配置 NavHub

编辑 `config.yml`：

```yaml
oauth:
  enabled: true
  clientId: "your_github_client_id"
  workerUrl: "https://navhub-oauth.your-username.workers.dev"
  redirectUri: "https://your-domain.com"
  scope: "read:user"
```

### 步骤 4: 配置私密分组

在 `Website.json` 或 `src/config.ts` 中，给需要登录才能查看的分组添加 `requireAuth: true`：

```json
{
  "name": "私密分组",
  "requireAuth": true,
  "sites": [
    {
      "name": "私密网站",
      "url": "https://private.example.com",
      "icon": ""
    }
  ]
}
```

### 步骤 5: 测试

1. 构建并部署你的网站
2. 访问网站，应该看到右上角的"登录"按钮
3. 点击登录，跳转到 GitHub 授权页面
4. 授权后返回网站，应该看到：
   - 登录按钮变成用户头像和名称
   - 私密分组现在可见

## 分组权限说明

| 属性 | 说明 | 未登录 | 已登录 |
|------|------|--------|--------|
| 无特殊标记 | 公开分组 | ✅ 显示 | ✅ 显示 |
| `hidden: true` | 完全隐藏 | ❌ 隐藏 | ❌ 隐藏 |
| `requireAuth: true` | 需要登录 | ❌ 隐藏 | ✅ 显示 |
| `hidden: true` + `requireAuth: true` | 完全隐藏优先 | ❌ 隐藏 | ❌ 隐藏 |

## 使用场景

### 1. 个人私密书签

```json
{
  "name": "工作相关",
  "requireAuth": true,
  "sites": [
    {
      "name": "公司内网",
      "url": "https://intranet.company.com",
      "icon": ""
    },
    {
      "name": "工作邮箱",
      "url": "https://mail.company.com",
      "icon": ""
    }
  ]
}
```

### 2. 开发工具

```json
{
  "name": "开发工具",
  "requireAuth": true,
  "sites": [
    {
      "name": "服务器管理",
      "url": "https://admin.example.com",
      "icon": ""
    },
    {
      "name": "数据库管理",
      "url": "https://db.example.com",
      "icon": ""
    }
  ]
}
```

### 3. 分享给朋友

- 公开分组：大家都能看到
- 私密分组：只有登录的朋友才能看到

## 安全说明

### ✅ 安全特性

1. **Client Secret 保护**: Secret 存储在 Cloudflare Worker 环境变量中，不会暴露给前端
2. **CORS 限制**: Worker 只接受来自配置域名的请求
3. **State 验证**: 防止 CSRF 攻击
4. **最小权限**: 默认只请求 `read:user` 权限
5. **HTTPS 强制**: OAuth 只在 HTTPS 环境下工作

### ⚠️ 注意事项

1. **不要提交 Secret**: 永远不要将 Client Secret 提交到 Git 仓库
2. **定期更换**: 建议定期更换 Client Secret
3. **访问控制不是安全措施**: 这个功能主要用于隐藏内容，不应用于真正的安全保护
4. **公开网站**: 分组配置（包括 URL）仍然在前端代码中，只是未登录时不显示

## 自定义

### 修改登录按钮位置

编辑 `src/views/HomeView.vue`，调整 `.login-section` 的 CSS：

```css
.login-section {
  position: absolute;
  top: -60px;     /* 调整垂直位置 */
  right: 24px;    /* 调整水平位置 */
  z-index: 100;
}
```

### 修改用户界面

编辑 `src/components/LoginButton.vue`，自定义样式和行为。

### 添加更多 OAuth 提供商

目前只支持 GitHub，如需支持其他提供商（Google, GitLab 等），需要：
1. 修改 Cloudflare Worker 代码
2. 修改认证 Store
3. 添加对应的 OAuth 配置

## 故障排查

### 问题 1: 点击登录没反应

**检查**:
- `config.yml` 中 `oauth.enabled` 是否为 `true`
- `oauth.clientId` 是否正确填写
- 浏览器控制台是否有错误

### 问题 2: 跳转到 GitHub 后无法返回

**检查**:
- GitHub OAuth App 的 callback URL 是否正确
- `config.yml` 中的 `redirectUri` 是否匹配

### 问题 3: 登录后看不到私密分组

**检查**:
- 分组是否正确设置了 `requireAuth: true`
- 是否设置了 `hidden: true`（hidden 优先级更高）
- 浏览器控制台是否有错误

### 问题 4: CORS 错误

**检查**:
- Cloudflare Worker 的 `ALLOWED_ORIGINS` 是否包含你的域名
- 确保域名完全匹配（包括 https:// 和端口）

### 问题 5: Token 交换失败

**检查**:
- Worker 的 Client ID 和 Secret 是否正确
- Worker 是否成功部署
- 访问 Worker 的 `/health` 端点测试是否正常

## 成本

完全免费！

- **GitHub OAuth**: 免费
- **Cloudflare Workers**: 免费套餐每天 100,000 次请求（足够使用）
- **存储**: localStorage（浏览器本地，免费）

## 更多信息

- [Cloudflare Worker 部署指南](cloudflare-worker/README.md)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)

## 反馈

如有问题或建议，欢迎提 Issue！

