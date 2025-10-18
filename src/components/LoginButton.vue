<template>
  <!-- 未登录状态 -->
  <a 
    v-if="!authStore.isAuthenticated" 
    @click.prevent="handleLogin"
    href="#"
    class="footer-link login-link"
    :class="{ 'loading': authStore.isLoading }"
    title="Login"
  >
    <UserCircle class="footer-icon" />{{ authStore.isLoading ? 'Loading...' : 'Login' }}
  </a>

  <!-- 已登录状态 -->
  <a 
    v-else
    @click.prevent="handleLogout"
    href="#"
    class="footer-link logout-link"
    title="Exit"
  >
    <UserCircle class="footer-icon" />Exit
  </a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { appConfig } from '@/config/generated'
import { UserCircle } from '@vicons/fa'

const authStore = useAuthStore()

// GitHub OAuth 登录
const handleLogin = () => {
  const oauthConfig = appConfig.oauth
  
  if (!oauthConfig?.enabled || !oauthConfig.clientId) {
    console.error('OAuth 配置未启用或 Client ID 未设置')
    return
  }

  // 生成随机 state 用于安全验证
  const state = Math.random().toString(36).substring(7)
  sessionStorage.setItem('oauth_state', state)

  // 构建 GitHub OAuth URL
  const redirectUri = oauthConfig.redirectUri || window.location.origin
  
  const params = new URLSearchParams({
    client_id: oauthConfig.clientId,
    redirect_uri: redirectUri,
    scope: 'read:user',
    state: state,
    prompt: 'consent'  // 强制每次都重新授权
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
  
  // 跳转到 GitHub 授权页面
  window.location.href = authUrl
}

// 退出登录
const handleLogout = () => {
  authStore.logout()
  console.log('已退出登录')
}

// 处理 OAuth 回调
const handleOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const savedState = sessionStorage.getItem('oauth_state')

  console.log('OAuth 回调检测:', { code: !!code, state, savedState })

  if (code && state && state === savedState) {
    console.log('开始处理 OAuth 回调...')
    
    // 清除 state
    sessionStorage.removeItem('oauth_state')

    // 处理回调
    const oauthConfig = appConfig.oauth
    console.log('OAuth 配置:', {
      enabled: oauthConfig?.enabled,
      hasClientId: !!oauthConfig?.clientId,
      hasWorkerUrl: !!oauthConfig?.workerUrl,
      workerUrl: oauthConfig?.workerUrl
    })
    
    if (oauthConfig?.enabled && oauthConfig.workerUrl) {
      const success = await authStore.handleCallback(code, {
        workerUrl: oauthConfig.workerUrl,
        allowedUsers: oauthConfig.allowedUsers
      })

      console.log('OAuth 回调处理结果:', success)

      if (success) {
        console.log('登录成功！清除 URL 参数')
        // 清除 URL 中的参数
        window.history.replaceState({}, document.title, window.location.pathname)
      } else {
        console.error('登录失败，查看 authStore.error:', authStore.error)
      }
    } else {
      console.error('OAuth 配置不完整或未启用')
    }
  }
}

onMounted(() => {
  // 初始化认证状态
  authStore.initAuth()

  // 处理 OAuth 回调
  handleOAuthCallback()
  
  // 调试信息
  console.log('Auth Store 初始化:', {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    token: authStore.accessToken ? '已设置' : '未设置'
  })
})
</script>

<style scoped>
/* 使用 footer 链接的样式 */
.footer-link {
  font-family: var(--footer-second-line-font-family, var(--footer-font-family, inherit));
  font-size: 16px !important;
  font-weight: 400 !important;
  color: var(--footer-color, #000000);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  cursor: pointer;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.footer-link:hover::after {
  width: 100%;
}

.footer-icon {
  font-size: 14px;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  vertical-align: middle;
}

.loading {
  opacity: 0.6;
  cursor: wait;
}

/* 响应式 */
@media (max-width: 768px) {
  .footer-link {
    font-size: 14px !important;
  }
  
  .footer-icon {
    font-size: 12px;
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .footer-link {
    font-size: 12px !important;
  }
  
  .footer-icon {
    font-size: 11px;
    width: 11px;
    height: 11px;
  }
}
</style>

