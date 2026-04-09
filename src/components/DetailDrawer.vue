<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div v-if="tool" class="overlay" @click.self="close">
        <Transition name="drawer-slide">
          <aside v-if="tool" class="drawer glass-panel" role="dialog" aria-modal="true" :aria-label="tool.name">
            <div class="drawer__head">
              <div class="drawer__top">
                <h2 class="drawer__title">{{ tool.name }}</h2>
                <p v-if="tool.englishName" class="drawer__en">{{ tool.englishName }}</p>
                <button type="button" class="drawer__close" aria-label="关闭" @click="close">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="drawer__body">
              <section class="block">
                <h3 class="block__h">官网与访问</h3>
                <p class="block__p">
                  <a :href="tool.officialUrl" class="link-quiet" target="_blank" rel="noopener noreferrer">{{
                    tool.officialUrl
                  }}</a>
                </p>
                <div class="actions">
                  <button type="button" class="btn btn--ghost" @click="copyUrl">复制官网链接</button>
                  <a :href="tool.officialUrl" class="btn btn--primary" target="_blank" rel="noopener noreferrer"
                    >在官网打开</a
                  >
                </div>
                <dl class="kv">
                  <div><dt>地区</dt><dd>{{ tool.region }}</dd></div>
                  <div><dt>是否需要魔法</dt><dd>{{ vpnLabel }}</dd></div>
                  <div><dt>访问说明</dt><dd>{{ tool.vpnNote }}</dd></div>
                </dl>
              </section>

              <section class="block">
                <h3 class="block__h">付费与支付</h3>
                <p class="block__p">{{ tool.pricingModel }} · {{ tool.estimatedCost }}</p>
                <p class="block__p muted">{{ tool.paymentNote }}</p>
                <div class="pay-row">
                  <span v-for="p in tool.paymentMethods" :key="p" class="mini-tag">{{ p }}</span>
                </div>
              </section>

              <section class="block">
                <h3 class="block__h">简介</h3>
                <p class="block__p">{{ tool.summary }}</p>
              </section>

              <section class="block">
                <h3 class="block__h">核心亮点</h3>
                <ul class="list">
                  <li v-for="(x, i) in tool.pros.slice(0, 3)" :key="'hl' + i">{{ x }}</li>
                </ul>
              </section>

              <section class="block">
                <h3 class="block__h">优点</h3>
                <ul class="list">
                  <li v-for="(x, i) in tool.pros" :key="'p' + i">{{ x }}</li>
                </ul>
              </section>

              <section class="block">
                <h3 class="block__h">缺点</h3>
                <ul class="list list--warn">
                  <li v-for="(x, i) in tool.cons" :key="'c' + i">{{ x }}</li>
                </ul>
              </section>

              <section class="block">
                <h3 class="block__h">适合的教师场景</h3>
                <p class="block__p">{{ tool.bestFor }}</p>
              </section>

              <section class="block">
                <h3 class="block__h">适合学科</h3>
                <p class="block__p">{{ (tool.subjects || []).join('、') }}</p>
              </section>

              <section class="block">
                <h3 class="block__h">适合人群</h3>
                <p class="block__p">{{ (tool.audiences || []).join('、') }}</p>
              </section>

              <section class="block">
                <h3 class="block__h">推荐搭配工作流</h3>
                <p class="block__p workflow">{{ tool.workflowSuggestion }}</p>
              </section>

              <section class="block">
                <h3 class="block__h">备注</h3>
                <p class="block__p muted">{{ tool.notes }}</p>
              </section>

              <section class="risk glass-panel">
                <h3 class="risk__h">风险与变更说明</h3>
                <ul class="risk__list">
                  <li>工具价格、套餐与免费额度可能随时调整。</li>
                  <li>付款方式与开票规则以官网支付页面为准。</li>
                  <li>部分国外工具在不同地区网络环境下访问稳定性不同。</li>
                  <li>功能入口与导出格式可能随产品迭代变化，请以官网最新页面为准。</li>
                </ul>
              </section>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  tool: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const vpnLabel = computed(() => {
  if (!props.tool) return ''
  const m = { no: '无需魔法', yes: '需要魔法', depends: '视地区与网络环境而定' }
  return m[props.tool.requiresVpn] || '视地区与网络环境而定'
})

watch(
  () => props.tool,
  (t) => {
    if (t) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
})

function close() {
  emit('close')
}

async function copyUrl() {
  if (!props.tool) return
  try {
    await navigator.clipboard.writeText(props.tool.officialUrl)
  } catch {
    window.prompt('复制链接', props.tool.officialUrl)
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: rgba(6, 8, 16, 0.5);
  backdrop-filter: blur(12px) saturate(130%);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  display: flex;
  justify-content: flex-end;
}
.drawer {
  width: min(520px, 100%);
  height: 100%;
  max-height: 100vh;
  border-radius: 0;
  border-left: 1px solid var(--stroke2);
  display: flex;
  flex-direction: column;
  box-shadow:
    -28px 0 72px rgba(0, 0, 0, 0.28),
    inset 1px 0 0 rgba(255, 255, 255, 0.06);
}
.drawer__head {
  padding: 18px 22px 12px;
  border-bottom: 1px solid var(--stroke);
}
.drawer__top {
  position: relative;
  padding-right: 40px;
}
.drawer__title {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}
.drawer__en {
  margin: 6px 0 0;
  color: var(--text3);
  font-size: 0.9rem;
}
.drawer__close {
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid var(--stroke2);
  background: var(--highlight);
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  color: var(--text2);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}
.drawer__close:hover {
  border-color: rgba(37, 99, 235, 0.35);
  background: rgba(37, 99, 235, 0.08);
  color: var(--text);
  transform: scale(1.04);
}
.drawer__body {
  padding: 20px 22px 32px;
  overflow: auto;
  flex: 1;
}
.block {
  margin-bottom: 18px;
}
.block__h {
  margin: 0 0 8px;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text3);
}
.block__p {
  margin: 0 0 8px;
  line-height: 1.6;
  color: var(--text2);
  word-break: break-word;
}
.muted {
  color: var(--text3);
  font-size: 0.88rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0 14px;
}
.actions :deep(.btn) {
  min-height: 42px;
}
.kv {
  margin: 0;
  display: grid;
  gap: 8px;
  font-size: 0.88rem;
}
.kv div {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
}
.kv dt {
  margin: 0;
  color: var(--text3);
}
.kv dd {
  margin: 0;
  color: var(--text2);
}
.pay-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.mini-tag {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid var(--stroke);
  color: var(--text2);
}
.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text2);
  line-height: 1.55;
}
.list--warn li::marker {
  color: var(--danger);
}
.workflow {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke);
  background: var(--highlight);
}
.risk {
  padding: 14px;
  border-radius: var(--radius-md);
}
.risk__h {
  margin: 0 0 8px;
  font-size: 0.95rem;
}
.risk__list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text3);
  font-size: 0.85rem;
  line-height: 1.55;
}
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.28s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.32s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(24px);
}
@media (max-width: 640px) {
  .overlay {
    justify-content: center;
    align-items: flex-end;
  }
  .drawer {
    width: 100%;
    height: min(92vh, 100%);
    border-radius: 18px 18px 0 0;
    border-left: none;
  }
  .drawer-slide-enter-from,
  .drawer-slide-leave-to {
    transform: translateY(24px);
  }
}
</style>
