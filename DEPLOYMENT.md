# 部署指南

本文档详细说明如何将 Website Panel 部署到各种平台。

## 📋 部署前准备

### 1. 构建项目

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

构建完成后，`dist` 目录将包含所有部署文件。

### 2. 检查构建结果

```bash
# 预览构建结果
npm run preview
```

## 🌐 部署方式

### 静态文件服务器

#### Nginx

1. **配置 Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/dist;
    index index.html;

    # 处理 SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

2. **部署文件**
```bash
# 复制构建文件到服务器
scp -r dist/* user@server:/path/to/nginx/html/
```

#### Apache

1. **配置 .htaccess**
```apache
RewriteEngine On
RewriteBase /

# 处理 SPA 路由
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 静态资源缓存
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Gzip 压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 云平台部署

#### Vercel

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **部署**
```bash
# 在项目根目录执行
vercel

# 或使用 GitHub 集成
# 1. 推送代码到 GitHub
# 2. 在 Vercel 控制台导入项目
# 3. 自动部署
```

3. **配置 vercel.json**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Netlify

1. **拖拽部署**
   - 将 `dist` 目录拖拽到 Netlify 控制台

2. **Git 集成**
   - 连接 GitHub 仓库
   - 设置构建命令：`npm run build`
   - 设置发布目录：`dist`

3. **配置 _redirects 文件**
```
/*    /index.html   200
```

4. **配置 netlify.toml**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### GitHub Pages

1. **安装 gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **配置 package.json**
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. **部署**
```bash
npm run build
npm run deploy
```

4. **配置 GitHub Actions**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Docker 部署

1. **创建 Dockerfile**
```dockerfile
# 构建阶段
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **创建 nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

3. **构建和运行**
```bash
# 构建镜像
docker build -t website-panel .

# 运行容器
docker run -p 80:80 website-panel
```

## 🔧 环境配置

### 生产环境优化

1. **启用 Gzip 压缩**
2. **设置静态资源缓存**
3. **配置 HTTPS**
4. **设置安全头**

### 性能优化

1. **CDN 加速**
   - 将静态资源上传到 CDN
   - 配置 CDN 缓存策略

2. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小

3. **代码分割**
   - 项目已配置自动代码分割
   - 按需加载组件

## 🔍 监控和日志

### 错误监控

推荐使用以下服务监控应用错误：

- **Sentry**：错误追踪和性能监控
- **LogRocket**：用户会话重放
- **Google Analytics**：用户行为分析

### 性能监控

- **Web Vitals**：核心 Web 指标
- **Lighthouse**：性能审计
- **PageSpeed Insights**：页面速度分析

## 🚨 故障排除

### 常见部署问题

1. **404 错误**
   - 检查 SPA 路由配置
   - 确认服务器支持 History API

2. **资源加载失败**
   - 检查文件路径
   - 确认服务器配置正确

3. **缓存问题**
   - 清除浏览器缓存
   - 检查服务器缓存配置

### 调试技巧

1. **查看网络请求**
   - 使用浏览器开发者工具
   - 检查控制台错误

2. **检查构建文件**
   - 确认 dist 目录完整
   - 验证文件权限

## 📞 支持

如遇到部署问题，请：

1. 查看本文档的故障排除部分
2. 检查项目的 Issue 列表
3. 提交新的 Issue 描述问题

---

**部署愉快！** 🚀
