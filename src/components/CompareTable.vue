<template>
  <section id="compare" class="compare">
    <div class="compare__panel glass-panel">
      <TrafficLights />
      <h2 class="compare__h">对比表</h2>
      <p class="compare__sub">
        横向滚动查看完整字段。表头在滚动时保持固定，便于课堂与教研场景快速对照关键能力。
      </p>
      <div class="table-scroller">
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>名称</th>
                <th>地区</th>
                <th>类型</th>
                <th>免费情况</th>
                <th>大概费用</th>
                <th>是否需要魔法</th>
                <th>付款方式</th>
                <th>中文支持</th>
                <th>模板美观度</th>
                <th>自动生成能力</th>
                <th>教师适用度</th>
                <th>文档导入能力</th>
                <th>导出 PPT 能力</th>
                <th>官网链接</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tools" :key="t.id">
                <td class="cell-strong cell-sticky">{{ t.name }}</td>
                <td>{{ t.region }}</td>
                <td>{{ t.type }}</td>
                <td>{{ t.pricingModel }}</td>
                <td>{{ t.estimatedCost }}</td>
                <td>{{ vpnText(t) }}</td>
                <td class="cell-pay">{{ (t.paymentMethods || []).join('、') }}</td>
                <td>{{ chineseText(t) }}</td>
                <td class="cell-num">{{ t.designScore }}/10</td>
                <td class="cell-num">{{ t.automationScore }}/10</td>
                <td class="cell-num">{{ t.teacherFriendly ? '高' : '中' }}</td>
                <td>{{ triText(t.supportsDocImport) }}</td>
                <td>{{ triText(t.supportsPptExport) }}</td>
                <td class="cell-link">
                  <a class="link-pill" :href="t.officialUrl" target="_blank" rel="noopener noreferrer">{{
                    shortUrl(t.officialUrl)
                  }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TrafficLights from './TrafficLights.vue'

defineProps({
  tools: { type: Array, required: true },
})

function vpnText(t) {
  const m = { no: '无需魔法', yes: '需要魔法', depends: '视地区而定' }
  return m[t.requiresVpn] || '视地区而定'
}

function chineseText(t) {
  if (t.supportsChinese === true) return '支持'
  if (t.supportsChinese === 'partial') return '部分支持'
  return '有限'
}

function triText(v) {
  if (v === true) return '支持'
  if (v === 'partial') return '部分支持'
  return '有限/不支持'
}

function shortUrl(u) {
  try {
    const url = new URL(u)
    return url.hostname.replace(/^www\./, '')
  } catch {
    return u
  }
}
</script>

<style scoped>
.compare {
  --compare-row-a: rgba(255, 255, 255, 0.42);
  --compare-row-b: rgba(37, 99, 235, 0.06);
  --compare-sticky-edge: rgba(15, 23, 42, 0.06);
  padding: 4px var(--section-x) 12px;
}

[data-theme='dark'] .compare {
  --compare-row-a: rgba(22, 26, 38, 0.92);
  --compare-row-b: rgba(255, 255, 255, 0.045);
  --compare-sticky-edge: rgba(0, 0, 0, 0.35);
}

.compare__panel {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 22px 24px 22px;
}
.compare :deep(.traffic) {
  padding-bottom: 6px;
}
.compare__h {
  margin: 0 0 12px;
  font-size: 1.28rem;
  font-weight: 650;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.compare__h::before {
  content: '';
  width: 4px;
  height: 1.05em;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  flex-shrink: 0;
  opacity: 0.85;
}
.compare__sub {
  margin: 0 0 20px;
  font-size: 0.93rem;
  color: var(--text2);
  max-width: 52rem;
  line-height: 1.62;
}

.table-scroller {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 2px;
  background: linear-gradient(
    145deg,
    rgba(37, 99, 235, 0.12),
    rgba(14, 165, 233, 0.08),
    rgba(15, 23, 42, 0.04)
  );
}

[data-theme='dark'] .table-scroller {
  background: linear-gradient(
    145deg,
    rgba(59, 130, 246, 0.15),
    rgba(15, 23, 42, 0.6),
    rgba(255, 255, 255, 0.04)
  );
}

.table-wrap {
  overflow-x: auto;
  border-radius: calc(var(--radius-lg) - 2px);
  border: 1px solid var(--stroke);
  background: var(--highlight);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  scrollbar-width: thin;
  scrollbar-color: rgba(37, 99, 235, 0.35) transparent;
}

[data-theme='dark'] .table-wrap {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  scrollbar-color: rgba(96, 165, 250, 0.35) transparent;
}

.table-wrap::-webkit-scrollbar {
  height: 9px;
}
.table-wrap::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.04);
  border-radius: 6px;
}
.table-wrap::-webkit-scrollbar-thumb {
  background: rgba(37, 99, 235, 0.28);
  border-radius: 6px;
}
[data-theme='dark'] .table-wrap::-webkit-scrollbar-thumb {
  background: rgba(96, 165, 250, 0.35);
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1220px;
  font-size: 0.83rem;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 3;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(248, 250, 252, 0.92));
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  color: var(--text2);
  font-weight: 650;
  text-align: left;
  padding: 13px 14px;
  border-bottom: 1px solid var(--stroke);
  white-space: nowrap;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
}

[data-theme='dark'] thead th {
  background: linear-gradient(180deg, rgba(40, 45, 62, 0.95), rgba(28, 32, 44, 0.88));
}

thead th:first-child {
  left: 0;
  z-index: 5;
  border-right: 1px solid var(--stroke);
  box-shadow: 4px 0 14px -4px var(--compare-sticky-edge);
}

tbody td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--stroke);
  color: var(--text2);
  vertical-align: top;
  line-height: 1.5;
}

tbody tr:nth-child(odd) td {
  background: var(--compare-row-a);
}

tbody tr:nth-child(even) td {
  background: var(--compare-row-b);
}

tbody tr:hover td {
  background: rgba(37, 99, 235, 0.09) !important;
}

[data-theme='dark'] tbody tr:hover td {
  background: rgba(59, 130, 246, 0.12) !important;
}

.cell-sticky {
  position: sticky;
  left: 0;
  z-index: 2;
  border-right: 1px solid var(--stroke);
  box-shadow: 4px 0 14px -6px var(--compare-sticky-edge);
}

tbody tr:nth-child(odd) .cell-sticky {
  background: var(--compare-row-a);
}

tbody tr:nth-child(even) .cell-sticky {
  background: var(--compare-row-b);
}

tbody tr:hover .cell-sticky {
  background: rgba(37, 99, 235, 0.09) !important;
}

[data-theme='dark'] tbody tr:hover .cell-sticky {
  background: rgba(59, 130, 246, 0.12) !important;
}

.cell-strong {
  color: var(--text);
  font-weight: 650;
  white-space: nowrap;
  font-size: 0.86rem;
}

.cell-num {
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}

.cell-pay {
  max-width: 220px;
  white-space: normal;
  min-width: 140px;
}

.cell-link {
  white-space: nowrap;
}

.link-pill {
  display: inline-flex;
  align-items: center;
  max-width: 160px;
  padding: 5px 11px;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid rgba(37, 99, 235, 0.25);
  background: rgba(37, 99, 235, 0.06);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-pill:hover {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.45);
  transform: translateY(-1px);
}

[data-theme='dark'] .link-pill {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(96, 165, 250, 0.35);
}
</style>
