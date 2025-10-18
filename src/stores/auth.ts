import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  email?: string
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const accessToken = ref<string | null>(null)
  const user = ref<GitHubUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  // 从 localStorage 初始化
  const initAuth = () => {
    const savedToken = localStorage.getItem('github_access_token')
    const savedUser = localStorage.getItem('github_user')
    
    if (savedToken && savedUser) {
      accessToken.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('解析用户信息失败:', e)
        clearAuth()
      }
    }
  }

  // 保存认证信息
  const saveAuth = (token: string, userData: GitHubUser) => {
    accessToken.value = token
    user.value = userData
    localStorage.setItem('github_access_token', token)
    localStorage.setItem('github_user', JSON.stringify(userData))
  }

  // 清除认证信息
  const clearAuth = () => {
    accessToken.value = null
    user.value = null
    localStorage.removeItem('github_access_token')
    localStorage.removeItem('github_user')
    // 清除 sessionStorage 中的 OAuth state
    sessionStorage.removeItem('oauth_state')
  }

  // 获取用户信息
  const fetchUser = async (token: string): Promise<GitHubUser> => {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error('获取用户信息失败')
    }

    return await response.json()
  }

  // 处理 OAuth 回调
  const handleCallback = async (code: string, oauthConfig: { workerUrl: string; allowedUsers?: string[] }) => {
    isLoading.value = true
    error.value = null

    try {
      // 调用 Cloudflare Worker 交换 token
      console.log('调用 Worker:', `${oauthConfig.workerUrl}/callback`, { code })
      
      const response = await fetch(`${oauthConfig.workerUrl}/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })

      console.log('Worker 响应状态:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Worker 错误响应:', errorText)
        throw new Error(`获取访问令牌失败: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      const token = data.access_token

      // 获取用户信息
      const userData = await fetchUser(token)

      // 检查用户白名单（如果配置了）
      if (oauthConfig.allowedUsers && oauthConfig.allowedUsers.length > 0) {
        if (!oauthConfig.allowedUsers.includes(userData.login)) {
          throw new Error('您没有访问权限')
        }
      }

      // 保存认证信息
      saveAuth(token, userData)

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : '登录失败'
      console.error('OAuth 回调处理失败:', e)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = () => {
    clearAuth()
  }

  // 验证 token 是否有效
  const validateToken = async (): Promise<boolean> => {
    if (!accessToken.value) return false

    try {
      await fetchUser(accessToken.value)
      return true
    } catch (e) {
      console.error('Token 验证失败:', e)
      clearAuth()
      return false
    }
  }

  return {
    // 状态
    accessToken,
    user,
    isLoading,
    error,
    isAuthenticated,
    
    // 方法
    initAuth,
    saveAuth,
    clearAuth,
    handleCallback,
    logout,
    validateToken
  }
})

