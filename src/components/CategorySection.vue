<template>
  <div class="category-section">
    <div class="category-header">
      <h2 class="category-title">{{ category.name }}</h2>
    </div>
    <div class="sites-grid">
      <SiteCard
        v-for="site in category.sites"
        :key="site.name"
        :site="site"
        :search-query="searchQuery"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/config'
import SiteCard from './SiteCard.vue'

interface Props {
  category: Category
  searchQuery: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.category-section {
  margin-bottom: 32px;
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--card-title-color, #000000);
  margin: 0;
}

.sites-grid {
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto;
  justify-content: flex-start;
}

.sites-grid .site-card {
  flex: 0 0 calc(20% - 9.6px);
  max-width: calc(20% - 9.6px);
  margin-right: 12px;
  margin-bottom: 12px;
}

.sites-grid .site-card:nth-child(5n) {
  margin-right: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sites-grid .site-card {
    flex: 0 0 calc(25% - 9px);
    max-width: calc(25% - 9px);
    margin-right: 12px;
    margin-bottom: 12px;
  }
  
  .sites-grid .site-card:nth-child(5n) {
    margin-right: 12px;
  }
  
  .sites-grid .site-card:nth-child(4n) {
    margin-right: 0;
  }
}

@media (max-width: 992px) {
  .sites-grid .site-card {
    flex: 0 0 calc(33.333% - 8px);
    max-width: calc(33.333% - 8px);
    margin-right: 12px;
    margin-bottom: 12px;
  }
  
  .sites-grid .site-card:nth-child(4n) {
    margin-right: 12px;
  }
  
  .sites-grid .site-card:nth-child(3n) {
    margin-right: 0;
  }
}

@media (max-width: 1024px) {
  .category-section {
    margin-bottom: 28px;
  }
  
  .category-header {
    margin-bottom: 16px;
  }
  
  .sites-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .sites-grid .site-card {
    flex: 0 0 calc(25% - 9px);
    max-width: calc(25% - 9px);
    margin-right: 12px;
    margin-bottom: 12px;
  }
  
  .sites-grid .site-card:nth-child(4n) {
    margin-right: 0;
  }
  
  .category-title {
    font-size: 1.05rem;
  }
}

@media (max-width: 820px) {
  .sites-grid .site-card {
    flex: 0 0 calc(50% - 6px);
    max-width: calc(50% - 6px);
    margin-right: 12px;
    margin-bottom: 12px;
  }
  
  .sites-grid .site-card:nth-child(4n) {
    margin-right: 12px;
  }
  
  .sites-grid .site-card:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .category-section {
    margin-bottom: 24px;
  }
  
  .category-header {
    margin-bottom: 14px;
  }
  
  .sites-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .sites-grid .site-card {
    flex: 0 0 calc(50% - 5px);
    max-width: calc(50% - 5px);
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .sites-grid .site-card:nth-child(2n) {
    margin-right: 0;
  }
  
  .category-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .sites-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .sites-grid .site-card {
    flex: 0 0 calc(50% - 4px);
    max-width: calc(50% - 4px);
    margin-right: 8px;
    margin-bottom: 8px;
  }
  
  .sites-grid .site-card:nth-child(2n) {
    margin-right: 0;
  }
  
  .category-title {
    font-size: 0.95rem;
  }
  
  .category-header {
    width: 95%;
    margin-bottom: 12px;
  }
  
  .sites-grid {
    width: 95%;
  }
}


/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-section {
  animation: fadeInUp 0.4s ease forwards;
}

.category-section:nth-child(1) { animation-delay: 0.05s; }
.category-section:nth-child(2) { animation-delay: 0.1s; }
.category-section:nth-child(3) { animation-delay: 0.15s; }
.category-section:nth-child(4) { animation-delay: 0.2s; }
</style>
