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
      <p class="footer__credit">
        <span class="footer__rgb" aria-label="HAPPY Games">HAPPY Games</span>
      </p>
    </div>
  </footer>
</template>

<script setup>
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
  margin: 14px 0 0;
  text-align: center;
}
.footer__rgb {
  display: inline-block;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: none;
  /* 宽幅渐变 + 位移动画 = 文字内 RGB 持续流动 */
  background: linear-gradient(
    110deg,
    #ff0066 0%,
    #ffaa00 14%,
    #eeff00 28%,
    #00ff88 42%,
    #00ddff 56%,
    #6644ff 70%,
    #ff00aa 84%,
    #ff0066 100%
  );
  background-size: 320% 100%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  /* 与 color:transparent 配合；勿在文字上叠 filter，否则会破坏 clip，整格变成色条 */
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: footer-rgb-flow 6s linear infinite;
}
@keyframes footer-rgb-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .footer__rgb {
    animation: none;
    background: linear-gradient(110deg, #34c759, #007aff, #af52de);
    background-size: 100% 100%;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
}
@media (max-width: 720px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
