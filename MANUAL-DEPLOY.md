# 手动部署指南

## 🚀 使用场景

当你需要从外部 URL 更新网站配置时，可以使用手动触发工作流，无需修改 `config.yml` 文件。

## 📝 操作步骤

### 1. 进入 Actions 页面
访问：https://github.com/GWen124/Website-Panel/actions

### 2. 选择工作流
点击左侧的 **"Deploy to GitHub Pages"**

### 3. 手动触发
1. 点击右上角的 **"Run workflow"** 按钮
2. 选择分支（通常是 `main`）
3. 配置选项：

#### 选项说明

**外部配置 URL（可选）**
- 📝 **填写 URL**：临时启用外部配置，从指定的 URL 拉取网站配置
  - 支持任何返回 JSON 格式的 URL
  - 示例：
    ```
    https://raw.githubusercontent.com/GWen124/Script/refs/heads/master/Web/Website%20Panel/WebsiteConfig.json
    ```
    ```
    https://gist.githubusercontent.com/username/xxx/raw/sites.json
    ```
- 🔲 **留空**：使用 `config.yml` 中的设置（当前为禁用外部配置，使用本地配置）

**更新原因（可选）**
- 填写本次更新的原因，便于在构建日志中查看
- 示例：`更新网站列表`、`添加新分类`、`修复图标问题`等

### 4. 执行部署
点击绿色的 **"Run workflow"** 按钮开始部署

## 📊 查看结果

### 构建日志
在 Actions 页面可以看到：
- ✅ Pages deployment completed successfully!
- 🌐 Site URL: https://website.gw124.top
- ⚙️ 配置模式: 外部配置（手动指定）或 config.yml 设置
- 🔗 配置 URL: [你填写的 URL]（如果提供）
- 📝 更新原因: [你填写的原因]

### 部署时间
通常需要 2-3 分钟完成部署，请耐心等待。

## ⚠️ 注意事项

1. **临时性**：手动触发时填写的外部配置 URL 仅对本次构建有效，不会修改仓库中的 `config.yml`
2. **URL 格式**：
   - 必须是可公开访问的 URL
   - 必须返回有效的 JSON 格式配置
   - 建议使用 HTTPS 协议
3. **回退机制**：如果外部配置拉取失败，会自动使用本地 `config.ts` 配置
4. **灵活性**：每次手动触发都可以使用不同的配置 URL，适合测试不同的配置源

## 🔄 自动部署 vs 手动部署

| 触发方式 | 配置来源 | 使用场景 |
|---------|---------|---------|
| **Push 到 main** | 使用 `config.yml` 设置 | 日常代码更新、配置修改 |
| **手动触发（不填 URL）** | 使用 `config.yml` 设置 | 重新部署、测试构建 |
| **手动触发（填写 URL）** | 使用指定的外部配置 URL | 更新外部配置、测试不同配置源 |

## 💡 最佳实践

### 场景 1：仅更新外部配置文件
如果你只是修改了外部配置文件（`WebsiteConfig.json`），而没有改动代码：
1. 手动触发工作流
2. 📝 填写外部配置 URL：
   ```
   https://raw.githubusercontent.com/GWen124/Script/refs/heads/master/Web/Website%20Panel/WebsiteConfig.json
   ```
3. 填写更新原因（如：`更新网站列表`）
4. 执行部署

### 场景 2：代码更新 + 外部配置
如果你既修改了代码，又想使用外部配置：
1. 修改 `config.yml`，设置 `enabled: true` 和正确的 `url`
2. 提交并 push 到 main 分支
3. 自动触发部署

### 场景 3：日常开发
保持 `config.yml` 中 `enabled: false`，使用本地配置进行开发和测试。

## 🛠️ 技术细节

### 工作流执行流程

1. **读取 config.yml 配置**：
   - 读取自定义域名（`deployment.customDomain`）
   - 读取外部配置启用状态（`externalConfig.enabled`）
   - 读取外部配置 URL（`externalConfig.url`）

2. **处理手动输入**（如果提供）：
   - 如果手动填写了外部配置 URL，临时修改 `config.yml`：
     ```bash
     sed -i 's/enabled: false/enabled: true/' config.yml
     sed -i "s|url: \".*\"|url: \"你填写的URL\"|" config.yml
     ```

3. **执行构建**：
   - 运行 `npm run build`

4. **创建 CNAME 文件**（如果配置了自定义域名）：
   - 从 `config.yml` 读取 `deployment.customDomain`
   - 创建 `dist/CNAME` 文件

5. **部署到 GitHub Pages**

**注意**：这些修改仅存在于 GitHub Actions 的临时环境中，不会提交到仓库。

### 从 config.yml 读取的配置

工作流会自动读取以下配置：

#### 1. 自定义域名
```yaml
deployment:
  customDomain: "website.gw124.top"
```
- **填写域名**：部署时自动创建 `CNAME` 文件，使用指定的自定义域名
- **留空 (`""`)**：不创建 `CNAME` 文件，保留 GitHub Pages 设置中手动配置的域名
- 这样设计的好处：你可以在 GitHub Pages 界面手动配置域名，部署时不会被覆盖

#### 2. 外部配置
```yaml
externalConfig:
  enabled: true
  url: "https://example.com/config.json"
```
- 如果 `enabled: true`，构建时会从 `url` 拉取外部配置
- 手动触发时填写的 URL 会覆盖这里的设置

### 域名配置方式

#### 方式 1：通过 config.yml 自动管理
1. 修改 `config.yml` 中的 `deployment.customDomain`
2. 提交并推送到仓库
3. GitHub Actions 会自动创建 CNAME 文件

例如：
```yaml
deployment:
  customDomain: "www.example.com"  # 修改为你的域名
```

#### 方式 2：在 GitHub Pages 手动配置
1. 将 `config.yml` 中的 `customDomain` 设置为空：
   ```yaml
   deployment:
     customDomain: ""
   ```
2. 在 GitHub 仓库的 **Settings → Pages → Custom domain** 中手动填写域名
3. 部署时不会创建 CNAME 文件，保留你手动配置的域名

**推荐使用方式 1**，这样域名配置可以版本控制，更易于管理。

## 📋 常用配置 URL

为方便使用，这里列出一些常用的配置 URL：

| 配置源 | URL | 说明 |
|-------|-----|------|
| **主配置** | `https://raw.githubusercontent.com/GWen124/Script/refs/heads/master/Web/Website%20Panel/WebsiteConfig.json` | 默认的外部配置 |
| **测试配置** | 留空 | 使用本地 `config.ts` 进行测试 |

### 💡 提示
- 你可以在 GitHub Gist 创建自己的配置文件，然后使用 "Raw" 链接
- 也可以托管在任何支持静态文件访问的服务上

