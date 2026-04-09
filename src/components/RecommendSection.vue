<template>
  <section id="recommend" class="rec">
    <div class="rec__panel glass-panel">
      <TrafficLights />
      <h2 class="rec__h">不同用户怎么选</h2>
      <p class="rec__sub">
        下列方案用于缩小范围，仍建议结合本校网络、采购与课堂设备做最终确认。
      </p>
      <div class="rec__grid">
        <article v-for="s in scenarios" :key="s.id" class="rec-card">
          <h3 class="rec-card__title">{{ s.title }}</h3>
          <p class="rec-card__desc">{{ s.desc }}</p>
          <div class="rec-card__tools">
            <span class="rec-card__label">相关工具</span>
            <div class="rec-card__names">
              <button
                v-for="id in s.toolIds"
                :key="id"
                type="button"
                class="tool-link"
                @click="$emit('pick-tool', id)"
              >
                {{ nameById(id) }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import TrafficLights from './TrafficLights.vue'
import { RECOMMEND_SCENARIOS, tools } from '../data/tools.js'

defineEmits(['pick-tool'])

const scenarios = RECOMMEND_SCENARIOS

function nameById(id) {
  const t = tools.find((x) => x.id === id)
  return t ? t.name : id
}
</script>

<style scoped>
.rec {
  padding: 4px var(--section-x) 8px;
}
.rec__panel {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 24px 26px 22px;
}
.rec :deep(.traffic) {
  padding-bottom: 6px;
}
.rec__h {
  margin: 0 0 12px;
  font-size: 1.28rem;
  font-weight: 650;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.rec__h::before {
  content: '';
  width: 4px;
  height: 1.05em;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  flex-shrink: 0;
  opacity: 0.85;
}
.rec__sub {
  margin: 0 0 18px;
  font-size: 0.93rem;
  color: var(--text2);
  line-height: 1.62;
  max-width: 52rem;
}
.rec__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  gap: 16px;
}
.rec-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke);
  background: var(--highlight);
  padding: 18px 18px 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}
[data-theme='dark'] .rec-card {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.rec-card:hover {
  transform: translateY(-3px);
  border-color: rgba(37, 99, 235, 0.28);
  box-shadow:
    0 14px 36px rgba(15, 23, 42, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
}
[data-theme='dark'] .rec-card:hover {
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.rec-card__title {
  margin: 0 0 8px;
  font-size: 1rem;
}
.rec-card__desc {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: var(--text2);
  line-height: 1.55;
}
.rec-card__label {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
  margin-bottom: 6px;
}
.rec-card__names {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tool-link {
  border: 1px solid var(--stroke2);
  background: var(--glass2);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.82rem;
  color: var(--accent);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}
.tool-link:hover {
  border-color: var(--accent);
  background: rgba(37, 99, 235, 0.08);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.12);
}
[data-theme='dark'] .tool-link:hover {
  background: rgba(59, 130, 246, 0.12);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
</style>
