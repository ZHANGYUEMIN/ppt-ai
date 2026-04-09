<template>
  <button
    ref="btnRef"
    type="button"
    class="theme-toggle"
    :aria-pressed="visualDark"
    :aria-label="visualDark ? '切换为浅色主题' : '切换为深色主题'"
    @click="onToggle"
  >
    <span class="theme-toggle__rail" aria-hidden="true">
      <span class="theme-toggle__hint theme-toggle__hint--day" />
      <span class="theme-toggle__hint theme-toggle__hint--night" />
      <span class="theme-toggle__thumb" :class="{ 'theme-toggle__thumb--dark': visualDark }">
        <svg v-if="!visualDark" class="theme-toggle__svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 18a6 6 0 100-12 6 6 0 000 12z"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else class="theme-toggle__svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 14.5A8.5 8.5 0 0111.5 3a7 7 0 1010 11.5z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const STORAGE = 'ai-ppt-toolkit-theme'
const btnRef = ref(null)
const isDark = ref(false)
/** 与界面同步，点击时立即切换滑块，便于与圆形扩散动画同屏 */
const visualDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
  visualDark.value = isDark.value
})

function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem(STORAGE, next)
  isDark.value = next === 'dark'
  visualDark.value = isDark.value
}

function onToggle() {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  const next = cur === 'dark' ? 'light' : 'dark'
  visualDark.value = next === 'dark'

  const rect = btnRef.value.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const targetBg = next === 'dark' ? '#07080c' : '#f3f4f8'

  const maxR = Math.ceil(
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  )

  const overlay = document.createElement('div')
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:99999',
    'pointer-events:none',
    `background:${targetBg}`,
    `clip-path:circle(0px at ${x}px ${y}px)`,
    'transition:clip-path 0.62s cubic-bezier(0.4,0,0.2,1)',
  ].join(';')

  document.body.appendChild(overlay)

  const cleanup = () => {
    setTheme(next)
    overlay.removeEventListener('transitionend', onEnd)
    overlay.remove()
  }

  const onEnd = (ev) => {
    if (ev.propertyName === 'clip-path') cleanup()
  }
  overlay.addEventListener('transitionend', onEnd)

  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`
  })

  window.setTimeout(() => {
    if (overlay.parentNode) cleanup()
  }, 720)
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-pill);
  flex-shrink: 0;
}

.theme-toggle:focus-visible {
  outline: none;
}

.theme-toggle:focus-visible .theme-toggle__rail {
  box-shadow:
    0 0 0 2px var(--bg0),
    0 0 0 4px rgba(37, 99, 235, 0.45);
}

.theme-toggle__rail {
  position: relative;
  display: block;
  width: 56px;
  height: 32px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--stroke2);
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.12) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 -1px 0 rgba(15, 23, 42, 0.06),
    0 6px 18px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

[data-theme='dark'] .theme-toggle__rail {
  background: linear-gradient(
    165deg,
    rgba(55, 65, 90, 0.55) 0%,
    rgba(20, 24, 36, 0.85) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(0, 0, 0, 0.35),
    0 6px 22px rgba(0, 0, 0, 0.35);
}

.theme-toggle:hover .theme-toggle__rail {
  border-color: rgba(37, 99, 235, 0.35);
}

.theme-toggle__hint {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  opacity: 0.2;
  pointer-events: none;
}

.theme-toggle__hint--day {
  left: 0;
  background: radial-gradient(circle at 30% 50%, rgba(251, 191, 36, 0.55), transparent 70%);
}

.theme-toggle__hint--night {
  right: 0;
  background: radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.45), transparent 70%);
}

.theme-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(37, 99, 235, 0.95);
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  box-shadow:
    0 2px 4px rgba(15, 23, 42, 0.12),
    0 8px 16px rgba(15, 23, 42, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    transform 0.38s cubic-bezier(0.34, 1.15, 0.64, 1),
    color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.theme-toggle__thumb--dark {
  transform: translateX(24px);
  color: rgba(191, 219, 254, 0.98);
  background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.35),
    0 6px 14px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.theme-toggle__svg {
  width: 15px;
  height: 15px;
}

.theme-toggle:active .theme-toggle__thumb {
  transform: translateX(0) scale(0.94);
}

.theme-toggle:active .theme-toggle__thumb--dark {
  transform: translateX(24px) scale(0.94);
}
</style>
