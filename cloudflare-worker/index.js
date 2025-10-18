/**
 * Cloudflare Worker for GitHub OAuth
 * 
 * 部署步骤：
 * 1. 登录 Cloudflare Dashboard
 * 2. 进入 Workers & Pages
 * 3. 创建新的 Worker
 * 4. 复制此代码到 Worker
 * 5. 配置环境变量（见下方）
 * 6. 部署
 */

// 环境变量配置（在 Cloudflare Dashboard 中设置）:
// GITHUB_CLIENT_ID: 你的 GitHub OAuth App Client ID
// GITHUB_CLIENT_SECRET: 你的 GitHub OAuth App Client Secret
// ALLOWED_ORIGINS: 允许的来源（用逗号分隔，例如: https://example.com,https://www.example.com）

// CORS 头部
const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// 处理 CORS
function handleCORS(request, env) {
  const origin = request.headers.get('Origin')
  const allowedOrigins = env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',') : []
  
  if (origin && allowedOrigins.includes(origin)) {
    return {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin,
    }
  }
  
  return corsHeaders
}

// 主处理函数
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    
    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: handleCORS(request, env)
      })
    }
    
    // 处理 OAuth 回调
    if (url.pathname === '/callback' && request.method === 'POST') {
      try {
        const { code } = await request.json()
        
        if (!code) {
          return new Response(JSON.stringify({ error: '缺少授权码' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...handleCORS(request, env)
            }
          })
        }
        
        // 交换 code 为 access_token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code
          })
        })
        
        const tokenData = await tokenResponse.json()
        
        if (tokenData.error) {
          return new Response(JSON.stringify({ 
            error: tokenData.error_description || '获取访问令牌失败' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...handleCORS(request, env)
            }
          })
        }
        
        // 返回 access_token
        return new Response(JSON.stringify({
          access_token: tokenData.access_token,
          token_type: tokenData.token_type,
          scope: tokenData.scope
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...handleCORS(request, env)
          }
        })
        
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: '服务器错误: ' + error.message 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...handleCORS(request, env)
          }
        })
      }
    }
    
    // 健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...handleCORS(request, env)
        }
      })
    }
    
    // 404
    return new Response('Not Found', { 
      status: 404,
      headers: handleCORS(request, env)
    })
  }
}

