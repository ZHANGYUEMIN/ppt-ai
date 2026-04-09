<template>
  <div class="traffic" aria-hidden="true">
    <span class="traffic__dot traffic__dot--r" />
    <span class="traffic__dot traffic__dot--y" />
    <span class="traffic__dot traffic__dot--g" />
  </div>
</template>

<style scoped>
.traffic {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0 10px;
}
.traffic__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 1px 2px rgba(0, 0, 0, 0.18);
}
.traffic__dot--r {
  background: linear-gradient(145deg, #ff6b6b, #d32f2f);
}
.traffic__dot--y {
  background: linear-gradient(145deg, #ffd54f, #f9a825);
}
.traffic__dot--g {
  background: linear-gradient(145deg, #81c784, #388e3c);
}
</style>
