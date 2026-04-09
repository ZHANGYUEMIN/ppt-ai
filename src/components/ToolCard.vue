<template>
  <article class="card glass-panel">
    <div class="card__main">
    <div class="card__head">
      <div class="card__titles">
        <h3 class="card__name">{{ tool.name }}</h3>
        <p v-if="tool.englishName" class="card__en">{{ tool.englishName }}</p>
      </div>
      <button
        type="button"
        class="fav"
        :class="{ 'fav--on': favorite }"
        :aria-pressed="favorite"
        :aria-label="favorite ? '取消收藏' : '收藏'"
        @click.stop="$emit('toggle-favorite', tool.id)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4.5l2.09 4.24 4.68.68-3.39 3.3.8 4.67L12 15.77 7.82 17.4l.8-4.67-3.39-3.3 4.68-.68L12 4.5z"
            :stroke="favorite ? 'var(--accent)' : 'currentColor'"
            :fill="favorite ? 'rgba(37,99,235,0.15)' : 'none'"
            stroke-width="1.4"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="badges">
      <span class="badge badge--region">{{ tool.region }}</span>
      <span class="badge">{{ vpnLabel }}</span>
      <span class="badge badge--muted">{{ tool.pricingModel }}</span>
    </div>

    <p class="card__summary">{{ tool.summary }}</p>

    <dl class="meta">
      <div class="meta__row">
        <dt>类型</dt>
        <dd>{{ tool.type }}</dd>
      </div>
      <div class="meta__row">
        <dt>大概费用</dt>
        <dd>{{ tool.estimatedCost }}</dd>
      </div>
      <div class="meta__row">
        <dt>中文</dt>
        <dd>{{ chineseLabel }}</dd>
      </div>
      <div class="meta__row">
        <dt>文档导入</dt>
        <dd>{{ boolTrip(tool.supportsDocImport) }}</dd>
      </div>
      <div class="meta__row">
        <dt>导出 PPT</dt>
        <dd>{{ boolTrip(tool.supportsPptExport) }}</dd>
      </div>
      <div class="meta__row">
        <dt>教师备课</dt>
        <dd>{{ tool.teacherFriendly ? '适合' : '视场景而定' }}</dd>
      </div>
    </dl>

    <div class="pay">
      <span class="pay__label">付款方式</span>
      <div class="pay__tags">
        <span v-for="p in tool.paymentMethods" :key="p" class="mini-tag">{{ p }}</span>
      </div>
    </div>

    <div class="pros-cons">
      <div>
        <span class="pc-label">优点</span>
        <ul>
          <li v-for="(x, i) in tool.pros.slice(0, 2)" :key="'p' + i">{{ x }}</li>
        </ul>
      </div>
      <div>
        <span class="pc-label">缺点</span>
        <ul>
          <li v-for="(x, i) in tool.cons.slice(0, 2)" :key="'c' + i">{{ x }}</li>
        </ul>
      </div>
    </div>

    <div class="tags">
      <span v-for="t in tool.tags" :key="t" class="tag">{{ t }}</span>
    </div>
    </div>

    <div class="card__foot">
      <div class="score" title="综合推荐指数（站内模型）">
        <span class="score__label">推荐指数</span>
        <span class="score__val">{{ recommendScore }}</span>
        <span class="score__max">/10</span>
      </div>
      <div class="card__actions">
        <a :href="tool.officialUrl" class="btn btn--ghost" target="_blank" rel="noopener noreferrer"
          >官网</a
        >
        <button type="button" class="btn btn--primary" @click="$emit('open', tool)">查看详情</button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tool: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
})

defineEmits(['open', 'toggle-favorite'])

const vpnLabel = computed(() => {
  const m = { no: '无需魔法', yes: '需要魔法', depends: '视地区而定' }
  return m[props.tool.requiresVpn] || '视地区而定'
})

const chineseLabel = computed(() => {
  if (props.tool.supportsChinese === true) return '支持'
  if (props.tool.supportsChinese === 'partial') return '部分支持'
  return '有限'
})

const recommendScore = computed(() => {
  const t = props.tool
  const raw = (t.designScore + t.automationScore + t.chineseFriendlinessScore) / 3
  return Math.min(10, Math.round(raw * 10) / 10)
})

function boolTrip(v) {
  if (v === true) return '支持'
  if (v === 'partial') return '部分支持'
  return '不支持或有限'
}
</script>

<style scoped>
.card {
  height: 100%;
  min-height: 0;
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition:
    transform 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.22s ease,
    border-color 0.22s ease;
  border: 1px solid var(--stroke);
}
.card__main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow:
    var(--shadow-card-hover),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border-color: rgba(37, 99, 235, 0.26);
}
[data-theme='dark'] .card:hover {
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.card__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}
.card__name {
  margin: 0;
  font-size: 1.08rem;
  letter-spacing: -0.02em;
}
.card__en {
  margin: 4px 0 0;
  font-size: 0.82rem;
  color: var(--text3);
}
.fav {
  border: 1px solid var(--stroke);
  background: var(--highlight);
  border-radius: 12px;
  padding: 6px;
  cursor: pointer;
  color: var(--text3);
  line-height: 0;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}
.fav:hover {
  transform: translateY(-1px);
  border-color: var(--accent);
}
.fav--on {
  border-color: rgba(37, 99, 235, 0.35);
}
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.badge {
  font-size: 0.72rem;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  color: var(--text2);
  background: var(--highlight);
}
.badge--region {
  border-color: rgba(37, 99, 235, 0.25);
  color: var(--text);
}
.badge--muted {
  opacity: 0.9;
}
.card__summary {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text2);
}
.meta {
  margin: 0;
  display: grid;
  gap: 6px;
  font-size: 0.82rem;
}
.meta__row {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 8px;
}
.meta__row dt {
  margin: 0;
  color: var(--text3);
}
.meta__row dd {
  margin: 0;
  color: var(--text2);
}
.pay__label {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
  margin-bottom: 6px;
}
.pay__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.mini-tag {
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: 8px;
  border: 1px solid var(--stroke);
  color: var(--text2);
  background: var(--glass2);
}
.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 0.82rem;
  color: var(--text2);
}
.pros-cons ul {
  margin: 4px 0 0;
  padding-left: 1rem;
}
.pc-label {
  font-size: 0.72rem;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 0.72rem;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--text2);
  border: 1px solid rgba(37, 99, 235, 0.15);
}
.card__foot {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 12px;
  padding-top: 14px;
  margin-top: 14px;
  border-top: 1px solid var(--stroke);
}
.score {
  font-size: 0.88rem;
  color: var(--text3);
}
.score__val {
  font-weight: 700;
  color: var(--text);
  font-size: 1.1rem;
  margin-left: 6px;
}
.score__max {
  font-size: 0.85rem;
  color: var(--text3);
}
.card__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
.card__actions .btn {
  min-height: 42px;
  padding-left: 1.1rem;
  padding-right: 1.1rem;
}
@media (max-width: 560px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
