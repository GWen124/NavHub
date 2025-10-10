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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 85%;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sites-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .category-section {
    margin-bottom: 24px;
  }
  
  .category-header {
    margin-bottom: 12px;
  }
  
  .sites-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .category-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .sites-grid {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  
  .category-title {
    font-size: 0.95rem;
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
