import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.css'

const KEY = 'ai-ppt-toolkit-theme'
const saved = localStorage.getItem(KEY)
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
document.documentElement.setAttribute(
  'data-theme',
  saved || (prefersDark ? 'dark' : 'light')
)

createApp(App).mount('#app')
