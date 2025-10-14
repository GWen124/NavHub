# Docker 部署指南

## 快速开始

### 方式一：使用 Docker Compose（推荐）

1. **创建 docker-compose.yml 文件**

```yaml
version: '3.8'

services:
  website-hub:
    image: gwen124/website-hub:latest
    container_name: website-hub
    ports:
      - "8080:80"
    volumes:
      - ./config.yml:/config/config.yml:ro
      - ./public/fonts:/config/fonts:ro
      - ./public/footer-links.json:/config/footer-links.json:ro
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
```

2. **准备配置文件**

将你的 `config.yml`、字体文件和 `footer-links.json` 放在同一目录下。

3. **启动容器**

```bash
docker-compose up -d
```

4. **访问网站**

打开浏览器访问：`http://localhost:8080`

### 方式二：使用 Docker 命令

```bash
docker run -d \
  --name website-hub \
  -p 8080:80 \
  -v $(pwd)/config.yml:/config/config.yml:ro \
  -v $(pwd)/fonts:/config/fonts:ro \
  -v $(pwd)/footer-links.json:/config/footer-links.json:ro \
  -e TZ=Asia/Shanghai \
  --restart unless-stopped \
  gwen124/website-hub:latest
```

## 配置说明

### 必需挂载

- `config.yml`: 主配置文件

### 可选挂载

- `sites-config.json`: 外部网站配置文件（如果使用外部网站配置）
- `footer-links.json`: Footer 第二行链接配置
- `fonts/`: 自定义字体目录

### 外部网站配置

如果你想使用外部网站配置而不是内置的配置，需要：

1. **在 config.yml 中启用外部配置**：

```yaml
externalConfig:
  enabled: true
  url: "/sites-config.json"  # 使用本地挂载的文件
```

2. **创建 `sites-config.json` 文件**：

参考 `sites-config-template.json` 的格式创建你的网站配置。

3. **在 docker-compose.yml 中挂载**：

```yaml
volumes:
  - ./sites-config.json:/config/sites-config.json:ro
```

### Footer 第二行链接配置

创建一个 `footer-links.json` 文件，格式如下：

```json
{
  "links": [
    {
      "name": "Github",
      "icon": "fa-github",
      "url": "https://github.com/your-username"
    },
    {
      "name": "Blog",
      "icon": "fa-rss",
      "url": "https://your-blog.com"
    },
    {
      "name": "Email",
      "icon": "fa-envelope",
      "url": "mailto:your-email@example.com"
    }
  ]
}
```

然后在 docker-compose.yml 中挂载：

```yaml
volumes:
  - ./footer-links.json:/config/footer-links.json:ro
```

### 端口映射

默认映射到主机的 `8080` 端口，可以修改为其他端口：

```yaml
ports:
  - "3000:80"  # 映射到 3000 端口
```

## 构建自己的镜像

如果你想自己构建镜像：

```bash
# 克隆项目
git clone https://github.com/GWen124/Website-Panel.git
cd Website-Panel

# 构建镜像
docker build -t website-hub:latest .

# 运行容器
docker run -d \
  --name website-hub \
  -p 8080:80 \
  -v $(pwd)/config.yml:/config/config.yml:ro \
  website-hub:latest
```

## 更新镜像

```bash
# 拉取最新镜像
docker pull gwen124/website-hub:latest

# 停止并删除旧容器
docker-compose down

# 启动新容器
docker-compose up -d
```

## 常见问题

### 1. 配置文件不生效

确保配置文件路径正确，并且文件权限允许读取。

### 2. 字体不显示

检查字体文件是否正确挂载到 `/config/fonts` 目录。

### 3. 端口被占用

修改 docker-compose.yml 中的端口映射，使用其他端口。

## 环境变量

- `TZ`: 时区设置，默认 `Asia/Shanghai`

## 数据持久化

所有配置都通过挂载卷的方式管理，修改配置文件后重启容器即可生效：

```bash
docker-compose restart
```

## 日志查看

```bash
# 查看容器日志
docker-compose logs -f

# 或
docker logs -f website-hub
```

## 停止和删除

```bash
# 停止容器
docker-compose stop

# 停止并删除容器
docker-compose down

# 删除容器和镜像
docker-compose down --rmi all
```

## 生产环境建议

1. **使用反向代理**

建议在前面加一层 Nginx 或 Traefik 反向代理，配置 HTTPS。

2. **资源限制**

```yaml
services:
  website-hub:
    # ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

3. **健康检查**

```yaml
services:
  website-hub:
    # ...
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## 支持

如有问题，请提交 Issue：https://github.com/GWen124/Website-Panel/issues

