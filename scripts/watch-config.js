#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔍 开始监听配置文件变化...');

// 监听 config.yml 文件变化
fs.watchFile('config.yml', (curr, prev) => {
  console.log('📝 检测到 config.yml 文件变化');
  
  // 重新生成配置
  console.log('🔄 重新生成配置...');
  exec('node scripts/generate-config.js', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 生成配置失败:', error);
      return;
    }
    
    console.log('✅ 配置已重新生成');
    console.log('🔄 重启开发服务器...');
    
    // 重启开发服务器
    exec('pkill -f "npm run dev" && npm run dev', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ 重启开发服务器失败:', error);
        return;
      }
      
      console.log('✅ 开发服务器已重启');
      console.log('🌐 请刷新浏览器查看更新');
    });
  });
});

console.log('✅ 配置文件监听已启动');
console.log('💡 现在修改 config.yml 文件会自动重新生成配置并重启服务器');
console.log('🛑 按 Ctrl+C 停止监听');
