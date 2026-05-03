import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './styles/cosmic.css'

import ReportArchive from './components/ReportArchive.vue'
import RadarHero from './components/RadarHero.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ReportArchive', ReportArchive)
    app.component('RadarHero', RadarHero)
  },
} satisfies Theme
