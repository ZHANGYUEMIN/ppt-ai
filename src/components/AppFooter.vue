<template>
  <footer id="about" class="footer">
    <div class="footer__panel glass-panel">
      <TrafficLights />
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
  </footer>
</template>

<script setup>
import TrafficLights from './TrafficLights.vue'
import { DATA_UPDATED_AT } from '../data/tools.js'

defineProps({
  updatedAt: { type: String, default: DATA_UPDATED_AT },
})

const year = new Date().getFullYear()
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
.footer :deep(.traffic) {
  padding-bottom: 8px;
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
@media (max-width: 720px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
