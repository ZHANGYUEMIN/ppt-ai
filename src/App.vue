<template>
  <div class="page-wrap">
    <div class="ambient" aria-hidden="true">
      <div class="ambient__blob ambient__blob--a" />
      <div class="ambient__blob ambient__blob--b" />
      <div class="ambient__pulse" />
      <div class="ambient__grain" />
    </div>

    <AppNav />

    <main class="site-main">
      <HeroSection :stats="stats" />

      <section id="browse" class="browse">
        <FilterSection
          v-model:filters="filters"
          @export-json="exportJson"
          @reset="resetFilters"
        />

        <div v-if="loading" class="browse__inner">
          <SkeletonGrid />
        </div>

        <div v-else class="browse__inner">
          <div class="tools-bar glass-panel">
            <TrafficLights />
            <div class="tools-bar__row">
              <h2 class="tools-bar__h">工具卡片</h2>
              <p class="tools-bar__count">共 {{ filteredTools.length }} 个工具</p>
            </div>
          </div>

          <div v-if="filteredTools.length === 0" class="empty glass-panel">
            <h3 class="empty__h">没有匹配的工具</h3>
            <p class="empty__p">尝试放宽筛选条件，或关闭「只看已收藏」。</p>
            <button type="button" class="btn btn--primary" @click="resetFilters">重置筛选</button>
          </div>

          <div v-else class="card-grid">
            <ToolCard
              v-for="t in filteredTools"
              :key="t.id"
              :tool="t"
              :favorite="isFavorite(t.id)"
              @open="openDetail"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </div>
      </section>

      <CompareTable :tools="tools" />

      <RecommendSection @pick-tool="onPickTool" />
    </main>

    <AppFooter :updated-at="DATA_UPDATED_AT" />
    <BackToTop />
    <DetailDrawer :tool="activeTool" @close="activeTool = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import FilterSection from './components/FilterSection.vue'
import ToolCard from './components/ToolCard.vue'
import CompareTable from './components/CompareTable.vue'
import RecommendSection from './components/RecommendSection.vue'
import AppFooter from './components/AppFooter.vue'
import BackToTop from './components/BackToTop.vue'
import DetailDrawer from './components/DetailDrawer.vue'
import SkeletonGrid from './components/SkeletonGrid.vue'
import TrafficLights from './components/TrafficLights.vue'
import { tools as allTools, DATA_UPDATED_AT } from './data/tools.js'
import { filterTools, sortTools, computeStats } from './utils/filterTools.js'
import { useFavorites } from './composables/useFavorites.js'

const tools = allTools
const loading = ref(true)
const activeTool = ref(null)

const defaultFilters = () => ({
  search: '',
  region: 'all',
  toolType: 'all',
  pricing: 'all',
  vpn: 'all',
  payments: [],
  language: 'all',
  sortBy: 'default',
  favoritesOnly: false,
})

const filters = ref(defaultFilters())

const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()

const stats = computed(() => computeStats(tools))

const filteredTools = computed(() => {
  const list = filterTools(tools, filters.value, favoriteIds.value)
  return sortTools(list, filters.value.sortBy)
})

onMounted(() => {
  window.setTimeout(() => {
    loading.value = false
  }, 650)
})

function resetFilters() {
  filters.value = defaultFilters()
}

function exportJson() {
  const blob = new Blob([JSON.stringify(filteredTools.value, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ai-ppt-tools-filtered-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function openDetail(t) {
  activeTool.value = t
}

function onPickTool(id) {
  const t = tools.find((x) => x.id === id)
  if (t) {
    activeTool.value = t
    document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.site-main {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
  padding-bottom: clamp(20px, 3vw, 36px);
}

.browse__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 var(--section-x) 12px;
}
.tools-bar {
  position: relative;
  padding: 18px 24px 16px;
  margin-bottom: 20px;
  overflow: hidden;
}
.tools-bar::before {
  content: '';
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 16px;
  width: 4px;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  opacity: 0.7;
  pointer-events: none;
}
.tools-bar :deep(.traffic) {
  padding-bottom: 6px;
}
.tools-bar__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.tools-bar__h {
  margin: 0;
  font-size: 1.24rem;
  font-weight: 650;
  letter-spacing: -0.025em;
  color: var(--text);
}
.tools-bar__count {
  margin: 0;
  font-size: 0.88rem;
  color: var(--text3);
  font-weight: 500;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(308px, 1fr));
  align-items: stretch;
  gap: 20px;
  padding-bottom: 12px;
}
.card-grid > * {
  min-height: 0;
}
.empty {
  padding: 40px 26px;
  text-align: center;
  max-width: 520px;
  margin: 0 auto 24px;
}
.empty__h {
  margin: 0 0 8px;
}
.empty__p {
  margin: 0 0 16px;
  color: var(--text2);
  line-height: 1.55;
}
</style>
