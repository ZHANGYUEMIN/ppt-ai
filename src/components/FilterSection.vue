<template>
  <section class="filters">
    <div class="filters__panel glass-panel">
      <TrafficLights />
      <h2 class="filters__h">搜索与筛选</h2>
      <p class="filters__sub">
        支持组合筛选：地区、类型、付费、访问条件、付款方式与语言。结果实时更新，便于备课场景快速收敛候选工具。
      </p>

      <label class="field">
        <span class="field__label">关键词</span>
        <input
          v-model="filters.search"
          type="search"
          class="field__input"
          placeholder="按名称、标签、简介搜索"
          autocomplete="off"
        />
      </label>

      <div class="grid2">
        <div class="field">
          <span class="field__label">地区</span>
          <GlassSelect v-model="filters.region" :options="regionOpts" />
        </div>
        <div class="field">
          <span class="field__label">工具类型</span>
          <GlassSelect v-model="filters.toolType" :options="toolTypeOpts" />
        </div>
        <div class="field">
          <span class="field__label">付费模式</span>
          <GlassSelect v-model="filters.pricing" :options="pricingOpts" />
        </div>
        <div class="field">
          <span class="field__label">是否需要魔法</span>
          <GlassSelect v-model="filters.vpn" :options="vpnOpts" />
        </div>
        <div class="field">
          <span class="field__label">语言支持</span>
          <GlassSelect v-model="filters.language" :options="languageOpts" />
        </div>
        <div class="field">
          <span class="field__label">排序</span>
          <GlassSelect v-model="filters.sortBy" :options="sortOpts" />
        </div>
      </div>

      <div class="payblock">
        <span class="field__label">付款方式（可多选，满足任一即可）</span>
        <div class="chips" role="group" aria-label="付款方式">
          <label
            v-for="p in paymentList"
            :key="p"
            class="chip"
            :class="{ 'chip--on': filters.payments.includes(p) }"
          >
            <input v-model="filters.payments" type="checkbox" :value="p" class="chip__native" />
            <span class="chip__mark" aria-hidden="true">
              <svg v-show="filters.payments.includes(p)" class="chip__icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="chip__lbl">{{ p }}</span>
          </label>
        </div>
      </div>

      <div class="row-actions">
        <label
          class="fav-toggle"
          :class="{ 'fav-toggle--on': filters.favoritesOnly }"
        >
          <input v-model="filters.favoritesOnly" type="checkbox" class="fav-toggle__native" />
          <span class="fav-toggle__track" aria-hidden="true">
            <span class="fav-toggle__thumb" />
          </span>
          <span class="fav-toggle__text">只看已收藏</span>
        </label>
        <button type="button" class="btn btn--ghost" @click="$emit('export-json')">导出当前筛选 JSON</button>
        <button type="button" class="btn btn--ghost" @click="$emit('reset')">重置筛选</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import TrafficLights from './TrafficLights.vue'
import GlassSelect from './GlassSelect.vue'
import { PAYMENT_OPTIONS } from '../data/tools.js'

defineEmits(['export-json', 'reset'])

const filters = defineModel('filters', { required: true })

const typeOptions = [
  '独立AI生成平台',
  'PowerPoint插件',
  'Google Slides插件',
  '办公套件内置AI',
  '教案/大纲辅助类',
  '教育友好',
]

const pricingOptions = ['免费', '免费额度', '订阅付费', '教育版', '企业版', '试用后付费']

const paymentList = PAYMENT_OPTIONS

const regionOpts = [
  { value: 'all', label: '全部' },
  { value: 'domestic', label: '国内' },
  { value: 'foreign', label: '国外' },
]

const toolTypeOpts = [
  { value: 'all', label: '全部' },
  ...typeOptions.map((t) => ({ value: t, label: t })),
]

const pricingOpts = [
  { value: 'all', label: '全部' },
  ...pricingOptions.map((t) => ({ value: t, label: t })),
]

const vpnOpts = [
  { value: 'all', label: '全部' },
  { value: 'no', label: '无需魔法' },
  { value: 'yes', label: '需要魔法' },
  { value: 'depends', label: '视地区而定' },
]

const languageOpts = [
  { value: 'all', label: '全部' },
  { value: 'chinese', label: '支持中文' },
  { value: 'english', label: '英文为主' },
  { value: 'multilingual', label: '多语言' },
]

const sortOpts = [
  { value: 'default', label: '默认推荐' },
  { value: 'price', label: '按价格（从低到高）' },
  { value: 'teacher', label: '按教师适用度' },
  { value: 'design', label: '按设计感' },
  { value: 'automation', label: '按自动生成能力' },
  { value: 'chinese', label: '按中文友好度' },
]
</script>

<style scoped>
.filters {
  padding: 0 var(--section-x) 12px;
}
.filters__panel {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 22px 26px 22px;
  overflow: visible;
}
.filters :deep(.traffic) {
  padding-bottom: 6px;
}
.filters__h {
  margin: 0 0 12px;
  font-size: 1.28rem;
  font-weight: 650;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.filters__h::before {
  content: '';
  width: 4px;
  height: 1.1em;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  flex-shrink: 0;
  opacity: 0.85;
}
.filters__sub {
  margin: 0 0 22px;
  font-size: 0.93rem;
  color: var(--text2);
  line-height: 1.62;
  max-width: 52rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}
.field__label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
}
.field__input {
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.06)) var(--glass2);
  color: var(--text);
  padding: 11px 14px;
  font-size: 0.9rem;
  outline: none;
  min-height: 44px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
[data-theme='dark'] .field__input {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent) var(--glass2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.field__input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.grid2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  gap: 6px 18px;
  overflow: visible;
}
.payblock {
  margin-top: 10px;
  margin-bottom: 10px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--stroke2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent) var(--highlight);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text2);
  cursor: pointer;
  user-select: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.18s ease;
}
[data-theme='dark'] .chip {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent) var(--highlight);
}
.chip:hover {
  border-color: rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}
.chip--on {
  border-color: rgba(37, 99, 235, 0.45);
  background: rgba(37, 99, 235, 0.08);
  color: var(--text);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
[data-theme='dark'] .chip--on {
  background: rgba(59, 130, 246, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.chip__native {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}
.chip__mark {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 2px solid var(--stroke2);
  background: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}
[data-theme='dark'] .chip__mark {
  background: rgba(0, 0, 0, 0.2);
}
.chip--on .chip__mark {
  border-color: var(--accent);
  background: linear-gradient(165deg, #3b82f6, #2563eb);
  color: #fff;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
}
.chip__icon {
  width: 12px;
  height: 12px;
}
.chip__lbl {
  line-height: 1.35;
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
  padding-top: 4px;
}

.fav-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text2);
  cursor: pointer;
  user-select: none;
  padding: 6px 4px;
  border-radius: var(--radius-pill);
  transition: background 0.2s ease;
}
.fav-toggle:hover {
  background: rgba(37, 99, 235, 0.05);
}
.fav-toggle__native {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.fav-toggle__track {
  position: relative;
  width: 44px;
  height: 26px;
  flex-shrink: 0;
  border-radius: var(--radius-pill);
  border: 1px solid var(--stroke2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.05));
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.08);
  transition:
    border-color 0.25s ease,
    background 0.25s ease;
}
[data-theme='dark'] .fav-toggle__track {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.15));
}
.fav-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
  transition: transform 0.28s cubic-bezier(0.34, 1.15, 0.64, 1);
}
.fav-toggle--on .fav-toggle__track {
  border-color: rgba(37, 99, 235, 0.5);
  background: linear-gradient(165deg, rgba(59, 130, 246, 0.85), rgba(37, 99, 235, 0.95));
}
.fav-toggle--on .fav-toggle__thumb {
  transform: translateX(18px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.fav-toggle--on .fav-toggle__text {
  color: var(--text);
}
</style>
