<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner glass-panel">
      <div class="nav__left">
        <TrafficLights />
        <a href="#top" class="nav__brand">
          <span class="nav__title">AI PPT 课件工具库</span>
        </a>
      </div>
      <nav class="nav__links hide-mobile" aria-label="主导航">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav__link">{{ l.label }}</a>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TrafficLights from './TrafficLights.vue'
import ThemeToggle from './ThemeToggle.vue'

const scrolled = ref(false)
const links = [
  { href: '#top', label: '首页' },
  { href: '#browse', label: '工具浏览' },
  { href: '#compare', label: '对比表' },
  { href: '#recommend', label: '推荐方案' },
  { href: '#about', label: '关于说明' },
]

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  padding: 14px var(--section-x) 0;
}
.nav--scrolled .nav__inner {
  box-shadow:
    0 20px 56px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
[data-theme='dark'] .nav--scrolled .nav__inner {
  box-shadow:
    0 22px 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.nav__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: calc(var(--radius-lg) + 2px);
  transition:
    box-shadow 0.35s ease,
    border-color 0.25s ease;
}
.nav__left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.nav :deep(.traffic) {
  padding-bottom: 0;
}
.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.nav__links {
  flex: 1;
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}
.nav__link {
  color: var(--text2);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  transition:
    color 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease;
}
.nav__link:hover {
  color: var(--text);
  background: rgba(37, 99, 235, 0.06);
  border-color: rgba(37, 99, 235, 0.12);
}
[data-theme='dark'] .nav__link:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}
@media (max-width: 720px) {
  .nav__inner {
    justify-content: space-between;
  }
  .nav__links {
    display: none;
  }
}
</style>
