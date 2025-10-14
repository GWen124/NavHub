#!/bin/sh

# 如果挂载了自定义配置文件，复制到正确位置
if [ -f /config/config.yml ]; then
    echo "✅ 使用自定义配置文件 config.yml"
    cp /config/config.yml /usr/share/nginx/html/config.yml
else
    echo "⚠️  使用默认配置文件 config.yml"
fi

# 如果挂载了自定义字体，复制到正确位置
if [ -d /config/fonts ]; then
    echo "✅ 使用自定义字体目录"
    cp -r /config/fonts/* /usr/share/nginx/html/fonts/
fi

# 如果挂载了自定义 footer-links.json，复制到正确位置
if [ -f /config/footer-links.json ]; then
    echo "✅ 使用自定义 footer-links.json"
    cp /config/footer-links.json /usr/share/nginx/html/public/footer-links.json
fi

# 如果挂载了外部网站配置文件，复制到正确位置
if [ -f /config/sites-config.json ]; then
    echo "✅ 使用外部网站配置 sites-config.json"
    cp /config/sites-config.json /usr/share/nginx/html/sites-config.json
    
    # 如果使用外部配置，需要修改 config.yml 启用外部配置
    if [ -f /usr/share/nginx/html/config.yml ]; then
        echo "📝 自动启用外部网站配置..."
        # 这里可以添加自动修改 config.yml 的逻辑
    fi
fi

echo "🚀 配置加载完成，启动服务..."

# 执行传入的命令
exec "$@"

