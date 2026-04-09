<template>
  <div class="sk-grid">
    <div v-for="n in 6" :key="n" class="sk glass-panel">
      <div class="sk__line sk__line--short" />
      <div class="sk__line" />
      <div class="sk__line sk__line--mid" />
      <div class="sk__blocks">
        <span v-for="i in 4" :key="i" class="sk__pill" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 var(--section-x) 28px;
  max-width: var(--content-max);
  margin: 0 auto;
}
.sk {
  padding: 22px;
  min-height: 220px;
  position: relative;
  overflow: hidden;
}
.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.06),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.2s ease-in-out infinite;
}
.sk__line {
  height: 12px;
  border-radius: 8px;
  background: var(--stroke2);
  margin-bottom: 10px;
  opacity: 0.55;
}
.sk__line--short {
  width: 40%;
}
.sk__line--mid {
  width: 72%;
}
.sk__blocks {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.sk__pill {
  height: 22px;
  width: 56px;
  border-radius: 999px;
  background: var(--stroke2);
  opacity: 0.45;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
[data-theme='light'] .sk::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(15, 23, 42, 0.06),
    transparent
  );
}
</style>
