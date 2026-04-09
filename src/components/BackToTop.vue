<template>
  <Transition name="fade">
    <button
      v-show="visible"
      type="button"
      class="back"
      aria-label="返回顶部"
      @click="scrollTop"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 480
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back {
  position: fixed;
  right: var(--section-x);
  bottom: 24px;
  z-index: var(--z-back);
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid var(--stroke2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent) var(--glass2);
  backdrop-filter: blur(16px) saturate(150%);
  color: var(--text2);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    var(--shadow-soft),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}
[data-theme='dark'] .back {
  box-shadow:
    var(--shadow-soft),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.back:hover {
  transform: translateY(-3px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14);
}
.back:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.28);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
