<template>
  <footer id="about" class="footer">
    <div class="footer__panel glass-panel">
      <div class="footer__grid">
        <div>
          <h2 class="footer__h">关于本站</h2>
          <p class="footer__p">
            本站汇总面向课件与演示场景的 AI 工具信息，帮助教师与内容创作者在备课、课堂展示与校本教研中更高效地选择与组合工具。
          </p>
          <p class="footer__p muted">
            工具价格、付款方式、访问条件与功能可能调整，请以官网最新信息为准。本站不提供软件下载与代购服务。
          </p>
          <p class="footer__meta">数据更新时间：{{ updatedAt }}</p>
        </div>
        <div>
          <h3 class="footer__subh">页脚导航</h3>
          <ul class="footer__links">
            <li><a href="#top">首页</a></li>
            <li><a href="#browse">工具浏览</a></li>
            <li><a href="#compare">对比表</a></li>
            <li><a href="#recommend">推荐方案</a></li>
          </ul>
        </div>
      </div>
      <p class="footer__copy">© {{ year }} AI PPT 课件工具库 · 教育场景信息导航</p>
    </div>
    <!-- 放在 glass-panel 外：backdrop-filter 会破坏子元素的 background-clip:text，易变成色条 -->
    <div class="footer__credit">
      <svg
        class="footer__rgb-svg"
        viewBox="0 0 340 40"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="HAPPY Games"
      >
        <defs>
          <linearGradient
            id="footerHappyRgb"
            gradientUnits="userSpaceOnUse"
            x1="-200"
            y1="0"
            x2="540"
            y2="0"
          >
            <stop offset="0%" stop-color="#ff0066" />
            <stop offset="16.66%" stop-color="#ffaa00" />
            <stop offset="33.33%" stop-color="#eeff00" />
            <stop offset="50%" stop-color="#00ff88" />
            <stop offset="66.66%" stop-color="#00ddff" />
            <stop offset="83.33%" stop-color="#6644ff" />
            <stop offset="100%" stop-color="#ff0066" />
            <animateTransform
              v-if="!reduceMotion"
              attributeName="gradientTransform"
              attributeType="XML"
              type="translate"
              from="0 0"
              to="220 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <text
          x="170"
          y="26"
          text-anchor="middle"
          dominant-baseline="middle"
          font-family="system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
          font-size="18"
          font-weight="700"
          letter-spacing="0.14em"
          fill="url(#footerHappyRgb)"
        >
          HAPPY Games
        </text>
      </svg>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { DATA_UPDATED_AT } from '../data/tools.js'

defineProps({
  updatedAt: { type: String, default: DATA_UPDATED_AT },
})

const year = new Date().getFullYear()
const reduceMotion = ref(false)
let mq

function syncReduce() {
  reduceMotion.value = mq?.matches ?? false
}

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncReduce()
  mq.addEventListener('change', syncReduce)
})

onUnmounted(() => {
  mq?.removeEventListener('change', syncReduce)
})
</script>

<style scoped>
.footer {
  position: relative;
  padding: 8px var(--section-x) 44px;
}
.footer::before {
  content: '';
  display: block;
  height: 1px;
  margin: 0 auto 24px;
  max-width: min(var(--content-max), 100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(37, 99, 235, 0.35),
    rgba(14, 165, 233, 0.2),
    transparent
  );
  opacity: 0.75;
}
.footer__panel {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 26px 26px 22px;
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
.footer__h {
  margin: 0 0 12px;
  font-size: 1.15rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.footer__subh {
  margin: 0 0 10px;
  font-size: 0.95rem;
}
.footer__p {
  margin: 0 0 10px;
  line-height: 1.6;
  color: var(--text2);
  font-size: 0.92rem;
}
.muted {
  color: var(--text3);
  font-size: 0.85rem;
}
.footer__meta {
  margin: 12px 0 0;
  font-size: 0.82rem;
  color: var(--text3);
}
.footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.footer__links a {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 6px 4px;
  border-radius: 8px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}
.footer__links a:hover {
  background: rgba(37, 99, 235, 0.08);
  color: var(--text);
}
[data-theme='dark'] .footer__links a:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}
.footer__copy {
  margin: 18px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--stroke);
  font-size: 0.82rem;
  color: var(--text3);
}
.footer__credit {
  margin: 16px auto 0;
  padding: 0 var(--section-x);
  max-width: var(--content-max);
  text-align: center;
}
.footer__rgb-svg {
  display: inline-block;
  width: min(340px, 92vw);
  height: auto;
  vertical-align: middle;
}
@media (max-width: 720px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
