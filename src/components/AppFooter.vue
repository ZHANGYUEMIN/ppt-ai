<template>
  <footer id="about" class="footer-root">
    <div
      ref="ultimateEl"
      class="ultimate-footer"
      :class="{ 'ultimate-footer--reduce': reduceMotion }"
      @click="onFooterClick"
    >
      <div ref="particlesEl" class="footer-particles" aria-hidden="true" />

      <div class="footer-inner">
        <div class="footer-left">
          <div class="brand-wrap">
            <div class="logo-shell">
              <div class="logo-core" />
            </div>
            <div class="brand-text">
              <div class="brand-title" data-text="HAPPY Games">HAPPY Games</div>
              <div class="brand-subtitle">Future · Play · Creative Technology</div>
            </div>
          </div>

          <h2 class="site-h">关于本站</h2>
          <p class="brand-desc">
            本站汇总面向课件与演示场景的 AI 工具信息，帮助教师与内容创作者在备课、课堂展示与校本教研中更高效地选择与组合工具。
          </p>
          <p class="brand-desc brand-desc--muted">
            工具价格、付款方式、访问条件与功能可能调整，请以官网最新信息为准。本站不提供软件下载与代购服务。
          </p>
        </div>

        <div class="footer-right">
          <div class="footer-panel">
            <h3 class="footer-nav-h">页脚导航</h3>
            <ul class="footer-links">
              <li><a href="#top">首页</a></li>
              <li><a href="#browse">工具浏览</a></li>
              <li><a href="#compare">对比表</a></li>
              <li><a href="#recommend">推荐方案</a></li>
            </ul>

            <div class="footer-meta">
              <div class="footer-item">
                <span class="footer-label">Brand</span>
                <span class="footer-value">HAPPY Games</span>
              </div>
              <div class="footer-item">
                <span class="footer-label">数据更新</span>
                <span class="footer-value">{{ updatedAt }}</span>
              </div>
              <div class="footer-item">
                <span class="footer-label">Style</span>
                <span class="footer-value">RGB Motion / Glass</span>
              </div>
            </div>

            <p class="copyright">
              © {{ year }} AI PPT 课件工具库 · 教育场景信息导航 · HAPPY Games 呈现
            </p>
          </div>
        </div>
      </div>

      <div class="footer-light-line" aria-hidden="true" />
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

const ultimateEl = ref(null)
const particlesEl = ref(null)
const reduceMotion = ref(false)
let mq
let resizeHandler

const BG_DEFAULT = `
  linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02)),
  linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)),
  linear-gradient(180deg, #0c101c 0%, #080a12 100%)
`

function applyDefaultBg() {
  const el = ultimateEl.value
  if (el) el.style.background = BG_DEFAULT
}

function onFooterClick(e) {
  if (reduceMotion.value) return
  const footer = ultimateEl.value
  if (!footer) return
  const rect = footer.getBoundingClientRect()
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.left = `${e.clientX - rect.left}px`
  ripple.style.top = `${e.clientY - rect.top}px`
  footer.appendChild(ripple)
  setTimeout(() => ripple.remove(), 1000)
}

function onFooterMove(e) {
  if (reduceMotion.value) return
  const footer = ultimateEl.value
  if (!footer) return
  const rect = footer.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  footer.style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 24%),
    ${BG_DEFAULT}
  `
}

function createParticles() {
  const wrap = particlesEl.value
  if (!wrap || reduceMotion.value) {
    if (wrap) wrap.innerHTML = ''
    return
  }
  const count = window.innerWidth < 640 ? 14 : 26
  wrap.innerHTML = ''
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span')
    p.className = 'footer-particle'
    const size = Math.random() * 3 + 2
    p.style.width = `${size}px`
    p.style.height = `${size}px`
    p.style.left = `${Math.random() * 100}%`
    p.style.bottom = `${Math.random() * 30}px`
    p.style.opacity = String(Math.random() * 0.45 + 0.25)
    p.style.animationDuration = `${Math.random() * 6 + 5}s`
    p.style.animationDelay = `${Math.random() * 8}s`
    wrap.appendChild(p)
  }
}

function syncReduce() {
  reduceMotion.value = mq?.matches ?? false
  createParticles()
  if (reduceMotion.value) applyDefaultBg()
}

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncReduce()
  mq.addEventListener('change', syncReduce)

  const u = ultimateEl.value
  if (u) {
    u.addEventListener('mousemove', onFooterMove)
    u.addEventListener('mouseleave', applyDefaultBg)
  }

  resizeHandler = () => createParticles()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  mq?.removeEventListener('change', syncReduce)
  const u = ultimateEl.value
  if (u) {
    u.removeEventListener('mousemove', onFooterMove)
    u.removeEventListener('mouseleave', applyDefaultBg)
  }
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
.footer-root {
  padding: 12px var(--section-x) 40px;
}

.ultimate-footer {
  position: relative;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 22px;
  border-radius: 28px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015)),
    linear-gradient(180deg, #0c101c 0%, #080a12 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* 不用 backdrop-filter，避免子元素 background-clip:text 在部分浏览器里失效成色条 */
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  isolation: isolate;
  color: rgba(255, 255, 255, 0.88);
}

.ultimate-footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(255, 0, 102, 0.08), transparent 20%),
    radial-gradient(circle at 80% 30%, rgba(0, 200, 255, 0.08), transparent 22%),
    radial-gradient(circle at 60% 80%, rgba(90, 255, 180, 0.06), transparent 18%);
  z-index: 0;
  pointer-events: none;
}

.footer-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.footer-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.35),
    0 0 20px rgba(80, 180, 255, 0.18);
  opacity: 0.65;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(20px) scale(0.8);
    opacity: 0;
  }
  15% {
    opacity: 0.7;
  }
  85% {
    opacity: 0.55;
  }
  100% {
    transform: translateY(-120px) scale(1.2);
    opacity: 0;
  }
}

.footer-inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 28px;
  align-items: start;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.logo-shell {
  position: relative;
  width: 68px;
  height: 68px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation: shellBreath 3.2s ease-in-out infinite;
  flex-shrink: 0;
}

.logo-shell::before {
  content: '';
  position: absolute;
  inset: -40%;
  background: conic-gradient(
    from 0deg,
    #ff004c,
    #ff7a00,
    #f7ff00,
    #00ff99,
    #00cfff,
    #005eff,
    #b100ff,
    #ff004c
  );
  animation: spinRGB 6s linear infinite;
  filter: blur(22px);
  opacity: 0.8;
}

.logo-shell::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 19px;
  background: linear-gradient(180deg, rgba(7, 9, 16, 0.92), rgba(10, 12, 22, 0.78));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@keyframes spinRGB {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shellBreath {
  0%,
  100% {
    box-shadow:
      0 15px 40px rgba(0, 0, 0, 0.35),
      0 0 18px rgba(0, 180, 255, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  50% {
    box-shadow:
      0 18px 48px rgba(0, 0, 0, 0.4),
      0 0 26px rgba(0, 210, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

.logo-core {
  position: relative;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 13px;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.25) 25%, rgba(255, 255, 255, 0.08) 60%, transparent 70%),
    linear-gradient(135deg, #38bdf8, #8b5cf6 55%, #ec4899);
  box-shadow:
    0 0 22px rgba(72, 174, 255, 0.45),
    0 0 36px rgba(164, 66, 255, 0.3);
  transform: rotate(12deg);
  animation: corePulse 2.8s ease-in-out infinite;
}

@keyframes corePulse {
  0%,
  100% {
    transform: rotate(12deg) scale(1);
    filter: brightness(1);
  }
  50% {
    transform: rotate(12deg) scale(1.06);
    filter: brightness(1.15);
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.brand-title {
  font-size: clamp(1.5rem, 3.8vw, 2.1rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.04em;
  position: relative;
  display: inline-block;
  background: linear-gradient(
    90deg,
    #ff005d 0%,
    #ff9a00 14%,
    #faff00 28%,
    #00ff95 42%,
    #00d9ff 58%,
    #3575ff 72%,
    #b300ff 86%,
    #ff005d 100%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: rgbFlow 7s linear infinite;
  user-select: none;
}

.brand-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  z-index: -1;
  background: inherit;
  background-size: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: blur(14px);
  opacity: 0.45;
  pointer-events: none;
}

@keyframes rgbFlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
}

.brand-subtitle {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  user-select: none;
}

.site-h {
  margin: 18px 0 10px;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.92);
}

.brand-desc {
  margin: 0 0 10px;
  max-width: 42rem;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.7;
  font-size: 0.9rem;
}

.brand-desc--muted {
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.84rem;
}

.footer-panel {
  position: relative;
  padding: 18px 20px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 16px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.footer-nav-h {
  margin: 0 0 10px;
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
}

.footer-links {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
}

.footer-links a {
  color: rgba(125, 200, 255, 0.95);
  text-decoration: none;
  font-size: 0.88rem;
  padding: 4px 2px;
  border-radius: 6px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #fff;
}

.footer-meta {
  display: grid;
  gap: 10px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-item:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.footer-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-value {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: right;
  word-break: break-all;
}

.copyright {
  margin: 14px 0 0;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.65;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.28) 0%,
    rgba(0, 212, 255, 0.2) 25%,
    rgba(187, 0, 255, 0.14) 45%,
    rgba(255, 0, 128, 0.06) 65%,
    transparent 75%
  );
  animation: rippleExpand 1s ease-out forwards;
  z-index: 3;
  mix-blend-mode: screen;
}

@keyframes rippleExpand {
  0% {
    width: 0;
    height: 0;
    opacity: 0.95;
  }
  70% {
    opacity: 0.45;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.footer-light-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  overflow: hidden;
  opacity: 0.95;
  z-index: 2;
  pointer-events: none;
}

.footer-light-line::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #ff005d 12%,
    #ff9a00 24%,
    #fff000 36%,
    #00ff99 50%,
    #00d9ff 64%,
    #4f7cff 78%,
    #b100ff 90%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: lineFlow 4.5s linear infinite;
}

@keyframes lineFlow {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.ultimate-footer:hover .brand-title {
  animation-duration: 4.5s;
}

.ultimate-footer:hover .logo-shell::before {
  animation-duration: 4s;
}

.ultimate-footer--reduce .footer-particle,
.ultimate-footer--reduce .logo-shell::before,
.ultimate-footer--reduce .logo-core,
.ultimate-footer--reduce .brand-title,
.ultimate-footer--reduce .footer-light-line::before {
  animation: none !important;
}

.ultimate-footer--reduce .brand-title {
  background-position: 40% 50%;
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .ultimate-footer {
    padding: 18px;
    border-radius: 22px;
  }

  .logo-shell {
    width: 58px;
    height: 58px;
  }

  .logo-core {
    width: 30px;
    height: 30px;
  }

  @keyframes rippleExpand {
    0% {
      width: 0;
      height: 0;
      opacity: 0.95;
    }
    100% {
      width: 220px;
      height: 220px;
      opacity: 0;
    }
  }
}
</style>
