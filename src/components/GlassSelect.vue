<template>
  <div ref="rootRef" class="glass-select">
    <button
      type="button"
      class="glass-select__trigger"
      :class="{ 'glass-select__trigger--open': open }"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click.stop="toggle"
    >
      <span class="glass-select__value">{{ displayLabel }}</span>
      <span class="glass-select__chev" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <Teleport to="body">
      <Transition name="glass-dd">
        <ul
          v-show="open"
          ref="menuRef"
          class="glass-select__menu glass-select__menu--portal"
          role="listbox"
          :style="menuInlineStyle"
        >
          <li
            v-for="opt in options"
            :key="String(opt.value)"
            role="option"
            :aria-selected="model === opt.value"
            class="glass-select__option"
            :class="{ 'glass-select__option--active': model === opt.value }"
            @click.stop="choose(opt.value)"
          >
            <span class="glass-select__option-text">{{ opt.label }}</span>
            <span v-if="model === opt.value" class="glass-select__check" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </li>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'

const model = defineModel({ required: true })

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const open = ref(false)
const rootRef = ref(null)
const menuRef = ref(null)
const menuInlineStyle = ref({})

const displayLabel = computed(() => {
  const hit = props.options.find((o) => o.value === model.value)
  return hit ? hit.label : ''
})

function toggle() {
  open.value = !open.value
}

function choose(val) {
  model.value = val
  open.value = false
}

function updateMenuPosition() {
  const root = rootRef.value
  if (!root || !open.value) return

  const rect = root.getBoundingClientRect()
  const gap = 8
  const pad = 8
  const maxDefault = 320
  let menuH = 200
  if (menuRef.value) {
    menuH = menuRef.value.scrollHeight || menuRef.value.offsetHeight || 200
  }

  const spaceBelow = window.innerHeight - rect.bottom - gap - pad
  const spaceAbove = rect.top - gap - pad
  const openUp = spaceBelow < Math.min(menuH, 160) && spaceAbove > spaceBelow

  let topPx
  let maxH
  if (openUp) {
    maxH = Math.min(maxDefault, Math.max(spaceAbove, 120))
    topPx = rect.top - gap - Math.min(menuH, maxH)
    if (topPx < pad) {
      topPx = pad
      maxH = Math.min(maxDefault, rect.top - gap - pad)
    }
  } else {
    maxH = Math.min(maxDefault, Math.max(spaceBelow, 120))
    topPx = rect.bottom + gap
    if (topPx + maxH > window.innerHeight - pad) {
      maxH = Math.max(120, window.innerHeight - pad - topPx)
    }
  }

  menuInlineStyle.value = {
    position: 'fixed',
    left: `${Math.max(pad, rect.left)}px`,
    width: `${rect.width}px`,
    top: `${topPx}px`,
    zIndex: 10050,
    maxHeight: `${maxH}px`,
  }
}

async function schedulePosition() {
  await nextTick()
  requestAnimationFrame(() => {
    updateMenuPosition()
    requestAnimationFrame(updateMenuPosition)
  })
}

function onDocPointerDown(e) {
  if (!open.value) return
  const t = e.target
  if (rootRef.value?.contains(t)) return
  if (menuRef.value?.contains(t)) return
  open.value = false
}

function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

function onScrollResize() {
  if (open.value) updateMenuPosition()
}

watch(open, (v) => {
  if (v) {
    window.addEventListener('pointerdown', onDocPointerDown, true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScrollResize, true)
    window.addEventListener('resize', onScrollResize)
    schedulePosition()
  } else {
    window.removeEventListener('pointerdown', onDocPointerDown, true)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('scroll', onScrollResize, true)
    window.removeEventListener('resize', onScrollResize)
    menuInlineStyle.value = {}
  }
})

onUnmounted(() => {
  window.removeEventListener('pointerdown', onDocPointerDown, true)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScrollResize, true)
  window.removeEventListener('resize', onScrollResize)
})
</script>

<style scoped>
.glass-select {
  position: relative;
  width: 100%;
  z-index: 1;
}

.glass-select__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 44px;
  padding: 10px 12px 10px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.08)) var(--glass2);
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

[data-theme='dark'] .glass-select__trigger {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)) var(--glass2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.glass-select__trigger:hover {
  border-color: rgba(37, 99, 235, 0.28);
}

.glass-select__trigger--open {
  border-color: var(--accent);
  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

[data-theme='dark'] .glass-select__trigger--open {
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.glass-select__value {
  flex: 1;
  min-width: 0;
  line-height: 1.35;
}

.glass-select__chev {
  flex-shrink: 0;
  color: var(--text3);
  display: flex;
  transition: transform 0.26s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.glass-select__trigger--open .glass-select__chev {
  transform: rotate(180deg);
  color: var(--accent);
}

.glass-select__menu--portal {
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke2);
  background: var(--glass2);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow:
    0 20px 50px rgba(15, 23, 42, 0.16),
    0 4px 16px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  overflow-y: auto;
  overscroll-behavior: contain;
}

[data-theme='dark'] .glass-select__menu--portal {
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.glass-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: calc(var(--radius-md) - 4px);
  font-size: 0.88rem;
  color: var(--text2);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.glass-select__option:hover {
  background: rgba(37, 99, 235, 0.08);
  color: var(--text);
}

[data-theme='dark'] .glass-select__option:hover {
  background: rgba(255, 255, 255, 0.06);
}

.glass-select__option--active {
  background: rgba(37, 99, 235, 0.12);
  color: var(--text);
  font-weight: 600;
}

[data-theme='dark'] .glass-select__option--active {
  background: rgba(59, 130, 246, 0.15);
}

.glass-select__option-text {
  flex: 1;
  min-width: 0;
  line-height: 1.45;
}

.glass-select__check {
  flex-shrink: 0;
  color: var(--accent);
  display: flex;
}

.glass-dd-enter-active,
.glass-dd-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.22s cubic-bezier(0.34, 1.1, 0.64, 1);
  transform-origin: top center;
}

.glass-dd-enter-from,
.glass-dd-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
