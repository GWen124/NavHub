<template>
  <div id="app">
    <!-- 加载动画页面 -->
    <transition name="fade">
      <div 
        v-if="showLoading" 
        class="loading-screen"
        :style="{ 
          backgroundImage: loadingBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }"
      >
        <!-- 视频背景 -->
        <video 
          v-if="loadingVideoUrl"
          class="loading-video-bg"
          autoplay
          muted
          loop
          playsinline
        >
          <source :src="loadingVideoUrl" type="video/mp4">
        </video>
        
        <div class="loading-content">
          <!-- 动画效果 - 可选方案 -->
          <!-- 方案1: 3D立方体 (默认) -->
          <div class="loader loader-cube" v-if="loaderType === 'cube'">
            <div class="cube">
              <div class="face front"></div>
              <div class="face back"></div>
              <div class="face right"></div>
              <div class="face left"></div>
              <div class="face top"></div>
              <div class="face bottom"></div>
            </div>
          </div>
          
          <!-- 方案2: 呼吸光环 -->
          <div class="loader loader-breath" v-else-if="loaderType === 'breath'">
            <div class="breath-circle"></div>
          </div>
          
          <!-- 方案4: 螺旋星系 -->
          <div class="loader loader-spiral" v-else-if="loaderType === 'spiral'">
            <div class="spiral-arm" v-for="i in 3" :key="i" :style="{ '--i': i }"></div>
          </div>
          
          <!-- 方案5: 心跳律动 -->
          <div class="loader loader-heartbeat" v-else-if="loaderType === 'heartbeat'">
            <div class="heart">
              <div class="heart-piece piece-1"></div>
              <div class="heart-piece piece-2"></div>
            </div>
          </div>
          
          <!-- 方案6: 无限符号 -->
          <div class="loader loader-infinity" v-else-if="loaderType === 'infinity'">
            <div class="infinity-symbol">
              <div class="infinity-ball ball-1"></div>
              <div class="infinity-ball ball-2"></div>
            </div>
          </div>
          
          <!-- 方案7: 指南针 -->
          <div class="loader loader-compass" v-else-if="loaderType === 'compass'">
            <div class="compass-circle">
              <div class="compass-needle"></div>
              <div class="compass-point north">N</div>
            </div>
          </div>
          
          <!-- 方案8: 沙漏 -->
          <div class="loader loader-hourglass" v-else-if="loaderType === 'hourglass'">
            <div class="hourglass">
              <div class="hourglass-top"></div>
              <div class="hourglass-bottom"></div>
              <div class="sand"></div>
            </div>
          </div>
          
          <!-- 加载文字 -->
          <div class="loading-text">
            <span class="text-line">{{ mainLoadingText }}</span>
            <span class="dots">
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </span>
          </div>
          
          <!-- 进度提示 -->
          <div class="loading-progress">{{ loadingProgress }}</div>
          
          <!-- 欢迎语 -->
          <div class="loading-subtitle">{{ subtitleText }}</div>
        </div>
      </div>
    </transition>
    
    <!-- 主内容 -->
    <transition name="content-fade">
      <router-view v-if="!showLoading" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { appConfig, applyBackgroundConfig } from '@/config/generated'

const themeStore = useThemeStore()
const showLoading = ref(true)
const loadingProgress = ref('正在初始化...')
const loadingBackground = ref<string>('')
const loadingVideoUrl = ref<string>('')
const mainLoadingText = ref('探索世界，从这里开始')
const subtitleText = ref('正在为您准备精彩内容')

// 动画方案配置（每个动画有专属文案）
const loaderConfigs = [
  {
    type: 'breath',
    mainText: '探索世界，从这里开始',
    steps: [
      { progress: '吐纳天地精华', subtitle: '呼吸之间，万物生长' },
      { progress: '凝聚光芒能量', subtitle: '每一次呼吸都是新生' },
      { progress: '韵律渐入佳境', subtitle: '找到内心的平静' },
      { progress: '气韵生动流转', subtitle: '和谐共生，生生不息' },
      { progress: '焕发勃勃生机', subtitle: '感受生命的律动 💫' }
    ]
  },
  {
    type: 'spiral',
    mainText: '发现精彩，收藏美好',
    steps: [
      { progress: '旋转星系之核', subtitle: '万物皆从中心开始' },
      { progress: '螺旋臂延展开', subtitle: '优雅的曲线延伸向远方' },
      { progress: '星云聚集凝聚', subtitle: '微尘汇聚成璀璨星河' },
      { progress: '能量向心汇聚', subtitle: '在旋转中寻找平衡' },
      { progress: '星系完美成型', subtitle: '浩瀚宇宙尽收眼底 🌌' }
    ]
  },
  {
    type: 'heartbeat',
    mainText: '用心感受，真诚连接',
    steps: [
      { progress: '倾听心跳声音', subtitle: '每一次跳动都充满温度' },
      { progress: '同步生命节奏', subtitle: '和世界同频共振' },
      { progress: '传递温暖力量', subtitle: '用心才能走得更远' },
      { progress: '心意相通相连', subtitle: '真诚是最好的语言' },
      { progress: '心动即刻启程', subtitle: '跟随内心的声音 💝' }
    ]
  },
  {
    type: 'infinity',
    mainText: '无限可能，无限精彩',
    steps: [
      { progress: '绘制无限符号', subtitle: '∞ 代表无限的可能' },
      { progress: '能量循环流转', subtitle: '生生不息，周而复始' },
      { progress: '打破边界束缚', subtitle: '突破才能看见更远' },
      { progress: '融入无限循环', subtitle: '在循环中找到永恒' },
      { progress: '开启无限之旅', subtitle: '无限精彩等你发现 ∞' }
    ]
  },
  {
    type: 'compass',
    mainText: '指引方向，导航人生',
    steps: [
      { progress: '校准指南针', subtitle: '找到真正的方向' },
      { progress: '定位当前位置', subtitle: '知道从哪里出发' },
      { progress: '规划前进路线', subtitle: '目标清晰才能抵达' },
      { progress: '锁定目标方位', subtitle: '坚定不移向前走' },
      { progress: '导航系统就绪', subtitle: '带你去想去的地方 🧭' }
    ]
  },
  {
    type: 'hourglass',
    mainText: '时光流转，不负韶华',
    steps: [
      { progress: '沙粒开始滑落', subtitle: '时光如沙，珍惜当下' },
      { progress: '时间静静流淌', subtitle: '每一秒都弥足珍贵' },
      { progress: '沙漏缓缓翻转', subtitle: '在时光中沉淀自己' },
      { progress: '岁月凝成琥珀', subtitle: '美好永远值得铭记' },
      { progress: '时光恰到好处', subtitle: '此刻最美好 ⏳' }
    ]
  }
]

// 随机选择一个动画方案
const randomIndex = Math.floor(Math.random() * loaderConfigs.length)
const selectedConfig = loaderConfigs[randomIndex] || loaderConfigs[0]!
const loaderType = ref(selectedConfig.type)
mainLoadingText.value = selectedConfig.mainText

// 应用背景到加载页面
const applyLoadingBackground = async () => {
  if (!appConfig.background) return
  
  const bgConfig = appConfig.background
  
  // 如果启用了 Bing 壁纸
  if (bgConfig.bingWallpaper) {
    try {
      // 获取 Bing 壁纸
      const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      const data = await response.json()
      if (data.images && data.images[0]) {
        const imageUrl = `https://www.bing.com${data.images[0].url}`
        loadingBackground.value = `url(${imageUrl})`
      }
    } catch (error) {
      console.warn('获取Bing壁纸失败:', error)
    }
  }
  
  // 如果有自定义背景图片或视频
  if (bgConfig.image && bgConfig.image.trim() !== '') {
    const imageUrl = bgConfig.image
    // 检查是否是视频
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv']
    const isVideo = videoExtensions.some(ext => imageUrl.toLowerCase().includes(ext))
    
    if (isVideo) {
      loadingVideoUrl.value = imageUrl
    } else {
      loadingBackground.value = `url(${imageUrl})`
    }
  }
}

// 检查字体是否加载完成
const checkFontsLoaded = async (): Promise<boolean> => {
  try {
    // 等待所有字体加载完成
    await document.fonts.ready
    return true
  } catch (error) {
    console.warn('字体加载检查失败:', error)
    return true // 即使失败也继续
  }
}

// 加载流程
const initializeApp = async () => {
  try {
    const steps = selectedConfig?.steps || []
    
    // 步骤1: 应用背景到加载页面
    loadingProgress.value = steps[0]?.progress || '正在加载背景...'
    subtitleText.value = steps[0]?.subtitle || '为您准备精彩内容'
    await applyLoadingBackground()
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // 步骤2: 初始化主题
    loadingProgress.value = steps[1]?.progress || '正在加载主题...'
    subtitleText.value = steps[1]?.subtitle || '初始化主题'
    themeStore.initTheme()
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // 步骤3: 等待字体加载
    loadingProgress.value = steps[2]?.progress || '正在加载字体...'
    subtitleText.value = steps[2]?.subtitle || '加载字体中'
    await checkFontsLoaded()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 步骤4: 加载配置
    loadingProgress.value = steps[3]?.progress || '正在加载配置...'
    subtitleText.value = steps[3]?.subtitle || '配置加载中'
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // 步骤5: 准备完成
    loadingProgress.value = steps[4]?.progress || '准备就绪'
    subtitleText.value = steps[4]?.subtitle || '即将进入'
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // 隐藏加载页面
    showLoading.value = false
  } catch (error) {
    console.error('初始化失败:', error)
    // 即使出错也要显示主页面
    showLoading.value = false
  }
}

onMounted(() => {
  initializeApp()
})
</script>

<style>
/* 重置和基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  color: #333333;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  background: transparent;
  position: relative;
  z-index: 1;
}


/* 全局字体图标样式 */
.fas, .fab, .far {
  font-weight: 900;
  font-style: normal;
}

/* 全局滚动条样式 - 透明轨道 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* ==================== 加载页面样式 ==================== */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

/* 加载页面视频背景 */
.loading-video-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 0;
}

/* 背景遮罩层，确保文字可读 */
.loading-screen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.loading-screen::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-50px, -50px) rotate(180deg); }
}

.loading-content {
  position: relative;
  text-align: center;
  z-index: 1;
}

/* ==================== 加载动画容器 ==================== */
.loader {
  margin: 0 auto 40px auto;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* ==================== 方案2: 呼吸光环 ==================== */
.loader-breath {
  width: 100%;
  height: 100%;
}

.breath-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.6),
    0 0 40px rgba(255, 255, 255, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
    box-shadow: 
      0 0 20px rgba(255, 255, 255, 0.6),
      0 0 40px rgba(255, 255, 255, 0.4);
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
    box-shadow: 
      0 0 40px rgba(255, 255, 255, 0.8),
      0 0 80px rgba(255, 255, 255, 0.6);
  }
}

/* ==================== 方案4: 螺旋星系 ==================== */
.loader-spiral {
  width: 100%;
  height: 100%;
}

.spiral-arm {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, white, transparent);
  transform-origin: left center;
  transform: translate(-60px, -1.5px);
  border-radius: 3px;
  animation: rotateSpiralArm 2s linear infinite;
  animation-delay: calc(var(--i) * 0.66s);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@keyframes rotateSpiralArm {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ==================== 方案5: 心跳律动 ==================== */
.loader-heartbeat {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart {
  position: relative;
  width: 60px;
  height: 60px;
  animation: heartbeat 1.5s ease-in-out infinite;
}

.heart-piece {
  position: absolute;
  width: 30px;
  height: 48px;
  background: white;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
}

.piece-1 {
  left: 15px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.piece-2 {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(0.8); }
  10%, 30% { transform: scale(1); }
  20% { transform: scale(0.9); }
  40%, 60% { transform: scale(0.8); }
}

/* ==================== 方案6: 无限符号 ==================== */
.loader-infinity {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.infinity-symbol {
  position: relative;
  width: 100px;
  height: 50px;
}

.infinity-symbol::before,
.infinity-symbol::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.infinity-symbol::before {
  left: 0;
  animation: infinityLeft 2s ease-in-out infinite;
}

.infinity-symbol::after {
  right: 0;
  animation: infinityRight 2s ease-in-out infinite;
}

@keyframes infinityLeft {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(-5px) scale(1.1); opacity: 1; }
}

@keyframes infinityRight {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(5px) scale(1.1); opacity: 1; }
}

.infinity-ball {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
}

.ball-1 {
  animation: moveBall1 3s linear infinite;
}

.ball-2 {
  animation: moveBall2 3s linear infinite;
}

@keyframes moveBall1 {
  0% { left: 0; top: 50%; transform: translate(-50%, -50%); }
  25% { left: 25%; top: 0; }
  50% { left: 50%; top: 50%; transform: translate(-50%, -50%); }
  75% { left: 25%; top: 100%; }
  100% { left: 0; top: 50%; transform: translate(-50%, -50%); }
}

@keyframes moveBall2 {
  0% { right: 0; top: 50%; transform: translate(50%, -50%); }
  25% { right: 25%; top: 100%; }
  50% { right: 50%; top: 50%; transform: translate(50%, -50%); }
  75% { right: 25%; top: 0; }
  100% { right: 0; top: 50%; transform: translate(50%, -50%); }
}

/* ==================== 方案7: 指南针 ==================== */
.loader-compass {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.compass-circle {
  position: relative;
  width: 100px;
  height: 100px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
}

.compass-needle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 40px;
  background: linear-gradient(to bottom, white, rgba(255, 255, 255, 0.5));
  transform: translate(-50%, -100%);
  transform-origin: bottom center;
  border-radius: 2px;
  animation: compassRotate 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.compass-needle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid white;
  transform: translate(-50%, -10px);
}

@keyframes compassRotate {
  0%, 100% { transform: translate(-50%, -100%) rotate(0deg); }
  25% { transform: translate(-50%, -100%) rotate(90deg); }
  50% { transform: translate(-50%, -100%) rotate(180deg); }
  75% { transform: translate(-50%, -100%) rotate(270deg); }
}

.compass-point {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

/* ==================== 方案8: 沙漏 ==================== */
.loader-hourglass {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hourglass {
  position: relative;
  width: 60px;
  height: 80px;
  animation: hourglassFlip 3s ease-in-out infinite;
}

@keyframes hourglassFlip {
  0%, 45% { transform: rotate(0deg); }
  55%, 100% { transform: rotate(180deg); }
}

.hourglass-top,
.hourglass-bottom {
  position: absolute;
  width: 60px;
  height: 35px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.hourglass-top {
  top: 0;
  clip-path: polygon(20% 0%, 80% 0%, 50% 100%);
}

.hourglass-bottom {
  bottom: 0;
  clip-path: polygon(50% 0%, 20% 100%, 80% 100%);
}

.sand {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 30px;
  height: 20px;
  background: white;
  transform: translateX(-50%);
  border-radius: 3px;
  animation: sandFall 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

@keyframes sandFall {
  0%, 45% {
    top: 10px;
    height: 20px;
  }
  50% {
    top: 35px;
    height: 5px;
  }
  55%, 100% {
    top: 50px;
    height: 15px;
  }
}

/* ==================== 加载文字 ==================== */
.loading-text {
  font-size: 28px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.text-line {
  letter-spacing: 2px;
}

.dots {
  display: inline-flex;
  margin-left: 5px;
}

.dot {
  animation: blink 1.4s infinite both;
  font-size: 32px;
  line-height: 1;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

/* ==================== 进度提示 ==================== */
.loading-progress {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 12px;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* ==================== 欢迎语 ==================== */
.loading-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  letter-spacing: 0.5px;
  margin-top: 8px;
  animation: slideUp 0.6s ease-out;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 0.85;
    transform: translateY(0);
  }
}

/* ==================== 过渡动画 ==================== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.content-fade-enter-active {
  transition: all 0.8s ease;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* ==================== 响应式 ==================== */
@media (max-width: 768px) {
  .cube {
    width: 80px;
    height: 80px;
  }
  
  .face {
    width: 80px;
    height: 80px;
  }
  
  .front  { transform: rotateY(0deg) translateZ(40px); }
  .back   { transform: rotateY(180deg) translateZ(40px); }
  .right  { transform: rotateY(90deg) translateZ(40px); }
  .left   { transform: rotateY(-90deg) translateZ(40px); }
  .top    { transform: rotateX(90deg) translateZ(40px); }
  .bottom { transform: rotateX(-90deg) translateZ(40px); }
  
  .loading-text {
    font-size: 24px;
  }
  
  .loading-progress {
    font-size: 12px;
  }
  
  .loading-subtitle {
    font-size: 14px;
  }
}
</style>