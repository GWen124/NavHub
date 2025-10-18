<template>
  <div class="login-container">
    <!-- 未登录状态 -->
    <button 
      v-if="!authStore.isAuthenticated" 
      @click="handleLogin"
      class="login-button"
      :disabled="authStore.isLoading"
    >
      <i class="fa fa-github"></i>
      <span>{{ authStore.isLoading ? '登录中...' : '登录' }}</span>
    </button>

    <!-- 已登录状态 -->
    <div v-else class="user-menu">
      <div class="user-info" @click="toggleMenu">
        <img :src="authStore.user?.avatar_url" :alt="authStore.user?.login" class="user-avatar">
        <span class="user-name">{{ authStore.user?.name || authStore.user?.login }}</span>
        <i class="fa fa-chevron-down menu-icon"></i>
      </div>

      <!-- 下拉菜单 -->
      <transition name="dropdown">
        <div v-if="showMenu" class="dropdown-menu" @click.stop>
          <div class="menu-header">
            <img :src="authStore.user?.avatar_url" :alt="authStore.user?.login" class="menu-avatar">
            <div class="menu-user-info">
              <div class="menu-user-name">{{ authStore.user?.name || authStore.user?.login }}</div>
              <div class="menu-user-login">@{{ authStore.user?.login }}</div>
            </div>
          </div>
          <div class="menu-divider"></div>
          <button @click="handleLogout" class="menu-item logout-item">
            <i class="fa fa-sign-out"></i>
            <span>退出登录</span>
          </button>
        </div>
      </transition>
    </div>

    <!-- 错误提示 -->
    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { appConfig } from '@/config/generated'

const authStore = useAuthStore()
const showMenu = ref(false)

// 切换菜单
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu')) {
    showMenu.value = false
  }
}

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
  const params = new URLSearchParams({
    client_id: oauthConfig.clientId,
    redirect_uri: oauthConfig.redirectUri || window.location.origin,
    scope: oauthConfig.scope || 'read:user',
    state: state
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
  
  // 跳转到 GitHub 授权页面
  window.location.href = authUrl
}

// 退出登录
const handleLogout = () => {
  authStore.logout()
  showMenu.value = false
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
        workerUrl: oauthConfig.workerUrl
      })

      if (success) {
        // 清除 URL 中的参数
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }
}

onMounted(() => {
  // 初始化认证状态
  authStore.initAuth()

  // 处理 OAuth 回调
  handleOAuthCallback()

  // 添加点击外部关闭菜单的监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.login-container {
  position: relative;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--header-color, #ffffff);
  font-family: var(--header-font-family, inherit);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.login-button:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-button i {
  font-size: 16px;
}

.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.user-info:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-name {
  color: var(--header-color, #ffffff);
  font-family: var(--header-font-family, inherit);
  font-size: 14px;
  font-weight: 500;
}

.menu-icon {
  font-size: 12px;
  color: var(--header-color, #ffffff);
  transition: transform 0.3s ease;
}

.user-info:hover .menu-icon {
  transform: translateY(2px);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  overflow: hidden;
  z-index: 1000;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.05);
}

.menu-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.menu-user-info {
  flex: 1;
  min-width: 0;
}

.menu-user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-user-login {
  font-size: 13px;
  color: #666;
}

.menu-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.logout-item {
  color: #dc3545;
}

.logout-item:hover {
  background: rgba(220, 53, 69, 0.1);
}

.error-message {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  padding: 8px 12px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .user-name {
    display: none;
  }

  .dropdown-menu {
    right: -8px;
  }
}
</style>

