#!/bin/sh
set -e

echo "================================================"
echo "NavHub with OAuth Server - Starting..."
echo "================================================"

# 检查必需的环境变量
if [ -z "$GITHUB_CLIENT_ID" ]; then
    echo "⚠️  WARNING: GITHUB_CLIENT_ID not set"
    echo "   OAuth login will not work without GitHub credentials"
fi

if [ -z "$GITHUB_CLIENT_SECRET" ]; then
    echo "⚠️  WARNING: GITHUB_CLIENT_SECRET not set"
    echo "   OAuth login will not work without GitHub credentials"
fi

# 创建 OAuth 服务器的 .env 文件
cat > /oauth/.env << EOF
GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
OAUTH_PORT=${OAUTH_PORT:-3001}
ALLOWED_ORIGINS=${ALLOWED_ORIGINS:-*}
EOF

echo "✅ Environment configured"
echo "   OAuth Port: ${OAUTH_PORT:-3001}"
echo "   GitHub Client ID: ${GITHUB_CLIENT_ID:+configured}"
echo "   Allowed Origins: ${ALLOWED_ORIGINS:-*}"
echo "================================================"

# 执行传入的命令
exec "$@"

