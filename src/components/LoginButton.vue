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
    <UserCog class="footer-icon" />{{ authStore.isLoading ? 'Loading...' : 'Login' }}
  </a>

  <!-- 已登录状态 -->
  <a 
    v-else
    @click.prevent="handleLogout"
    href="#"
    class="footer-link logout-link"
    title="Exit"
  >
    <UserCog class="footer-icon" />Exit
  </a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { appConfig } from '@/config/generated'
import { UserCog } from '@vicons/fa'

const authStore = useAuthStore()

// GitHub OAuth 登录
const handleLogin = () => {
  const oauthConfig = appConfig.oauth
  
  if (!oauthConfig?.enabled || !oauthConfig.clientId) {
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
    state: state
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
  
  // 跳转到 GitHub 授权页面
  window.location.href = authUrl
}

// 退出登录
const handleLogout = () => {
  // 弹出确认框
  if (confirm('确定要退出登录吗？')) {
    authStore.logout()
  }
}

// 处理 OAuth 回调
const handleOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const savedState = sessionStorage.getItem('oauth_state')

  if (code && state && state === savedState) {
    // 清除 state
    sessionStorage.removeItem('oauth_state')

    // 处理回调
    const oauthConfig = appConfig.oauth
    
    if (oauthConfig?.enabled && oauthConfig.workerUrl) {
      const success = await authStore.handleCallback(code, {
        workerUrl: oauthConfig.workerUrl,
        allowedUsers: oauthConfig.allowedUsers
      })

      if (success) {
        // 清除 URL 中的参数
        window.history.replaceState({}, document.title, window.location.pathname)
      } else {
        // 检查是否是权限错误
        if (authStore.error && authStore.error.startsWith('UNAUTHORIZED:')) {
          const username = authStore.error.split(':')[1]
          
          // 显示错误提示
          alert(`抱歉，用户 @${username} 没有访问权限`)
          
          // 清除 URL 参数
          window.history.replaceState({}, document.title, window.location.pathname)
          
          // 自动跳转到 GitHub 登出页面，清除 GitHub 的授权状态
          const returnUrl = encodeURIComponent(window.location.href)
          window.location.href = `https://github.com/logout?return_to=${returnUrl}`
        } else {
          // 其他错误，只清除 URL 参数
          window.history.replaceState({}, document.title, window.location.pathname)
          if (authStore.error) {
            alert(authStore.error)
          }
        }
      }
    }
  }
}

onMounted(() => {
  // 初始化认证状态
  authStore.initAuth()

  // 处理 OAuth 回调
  handleOAuthCallback()
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

.footer-icon :deep(svg) {
  width: 14px;
  height: 14px;
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
  
  .footer-icon :deep(svg) {
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
  
  .footer-icon :deep(svg) {
    width: 11px;
    height: 11px;
  }
}
</style>

