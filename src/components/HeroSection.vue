<template>
  <section id="top" class="hero">
    <div class="hero__panel glass-panel hero__panel--shine">
      <TrafficLights />
      <p class="hero__eyebrow">全球教师与内容创作者的 AI 演示工具导航、对比与选型指南</p>
      <h1 class="hero__title">AI PPT 课件工具库</h1>
      <p class="hero__lead">
        为备课与课堂演示筛选合适的 AI 工具：从大纲整理、版式生成到导出与协作，减少排版与找素材的时间，把精力放回教学目标与课堂互动。
      </p>
      <div class="hero__cta">
        <a href="#browse" class="btn btn--primary">开始浏览工具</a>
        <a href="#compare" class="btn btn--ghost">查看对比表</a>
      </div>
      <div class="hero__stats">
        <article v-for="s in statItems" :key="s.k" class="stat glass-panel">
          <div class="stat__value">{{ s.value }}</div>
          <div class="stat__label">{{ s.label }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import TrafficLights from './TrafficLights.vue'

const props = defineProps({
  stats: { type: Object, required: true },
})

const statItems = computed(() => [
  { k: 'total', label: '收录工具', value: props.stats.total },
  { k: 'domestic', label: '国内工具', value: props.stats.domestic },
  { k: 'foreign', label: '国外工具', value: props.stats.foreign },
  { k: 'free', label: '免费 / 免费额度', value: props.stats.freeTier },
  { k: 'novpn', label: '无需魔法', value: props.stats.noVpn },
  { k: 'plugin', label: '插件型工具', value: props.stats.plugins },
])
</script>

<style scoped>
.hero {
  padding: 12px var(--section-x) 8px;
}
.hero__panel {
  position: relative;
  overflow: hidden;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: clamp(24px, 3.2vw, 34px) clamp(24px, 3.2vw, 36px) clamp(26px, 3.2vw, 36px);
}
.hero__panel--shine::after {
  content: '';
  position: absolute;
  right: -20%;
  top: -40%;
  width: 55%;
  height: 85%;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12), transparent 68%);
  opacity: 0.9;
}
[data-theme='dark'] .hero__panel--shine::after {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.14), transparent 65%);
}
.hero :deep(.traffic) {
  padding-bottom: 10px;
}
.hero__eyebrow {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: var(--text3);
  letter-spacing: 0.04em;
  line-height: 1.5;
  max-width: 52ch;
}
.hero__title {
  margin: 0 0 16px;
  font-size: clamp(1.8rem, 4.2vw, 2.45rem);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.12;
}
.hero__lead {
  margin: 0 0 26px;
  max-width: 46rem;
  font-size: 1.03rem;
  line-height: 1.68;
  color: var(--text2);
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: 30px;
}
.hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(158px, 1fr));
  gap: 14px;
}
.stat {
  padding: 16px 16px 14px;
  border-radius: var(--radius-md);
  min-height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}
.stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
  border-color: rgba(37, 99, 235, 0.18);
}
[data-theme='dark'] .stat:hover {
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
  border-color: rgba(96, 165, 250, 0.2);
}
.stat__value {
  font-size: 1.45rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.stat__label {
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--text3);
  line-height: 1.4;
}
</style>
