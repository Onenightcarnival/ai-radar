<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as reports } from '../loaders/reports.data'

const props = defineProps({
  source: { type: String, required: true },
  period: { type: String, required: true },
})

const periodLabel = {
  daily: '日报',
  weekly: '周报',
  monthly: '月报',
}

const sourceLabel = {
  github: 'GitHub',
  arxiv: 'arXiv',
}

const filtered = computed(() =>
  reports.filter((r) => r.source === props.source && r.period === props.period),
)

const groupedByYear = computed(() => {
  const groups = {}
  for (const r of filtered.value) {
    if (!groups[r.year]) groups[r.year] = []
    groups[r.year].push(r)
  }
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a))
})

const timelineRef = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )

  if (timelineRef.value) {
    const nodes = timelineRef.value.querySelectorAll('.year-group, .post-node')
    for (const node of nodes) observer.observe(node)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="report-archive" ref="timelineRef">
    <header class="archive-header">
      <h1 class="archive-title">{{ sourceLabel[source] }} · {{ periodLabel[period] }}</h1>
      <p class="archive-count" v-if="filtered.length">共 {{ filtered.length }} 期</p>
    </header>

    <div v-if="filtered.length === 0" class="empty">
      暂未生成{{ periodLabel[period] }}，等下一次抓取。
    </div>

    <div v-else class="timeline-track">
      <div v-for="[year, entries] in groupedByYear" :key="year" class="year-group">
        <div class="year-node">
          <div class="year-dot" />
          <span class="year-label">{{ year }}</span>
          <span class="year-count">{{ entries.length }} 期</span>
        </div>
        <div v-for="entry in entries" :key="entry.url" class="post-node">
          <div class="post-dot" />
          <a :href="withBase(entry.url)" class="post-card">
            <span class="post-date">{{ entry.label }}</span>
            <span class="post-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-archive {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 0 80px;
}

.archive-header {
  text-align: center;
  margin-bottom: 40px;
}

.archive-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--cosmic-heading-from), var(--cosmic-heading-to));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
}

.archive-count {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
  letter-spacing: 1px;
}

.empty {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 60px 0;
}

.timeline-track {
  position: relative;
  padding-left: 32px;
}

.timeline-track::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-soft) 100%);
}

.year-group,
.post-node {
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.year-group.revealed,
.post-node.revealed {
  opacity: 1;
  transform: translateX(0);
}

.post-node:nth-child(2) { transition-delay: 0.05s; }
.post-node:nth-child(3) { transition-delay: 0.1s; }
.post-node:nth-child(4) { transition-delay: 0.15s; }
.post-node:nth-child(5) { transition-delay: 0.2s; }

.year-group {
  margin-bottom: 8px;
}

.year-node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0 8px;
}

.year-dot {
  position: absolute;
  left: -32px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-brand-1);
  box-shadow: 0 0 12px rgba(var(--cosmic-accent-rgb), 0.3);
  transition: box-shadow 0.3s;
}

.year-group:hover .year-dot {
  box-shadow: 0 0 20px rgba(var(--cosmic-accent-rgb), 0.5);
}

.year-label {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 1px;
}

.year-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.post-node {
  position: relative;
  padding: 6px 0;
}

.post-dot {
  position: absolute;
  left: -28px;
  top: 18px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.6;
  transition: all 0.25s;
}

.post-node:hover .post-dot {
  opacity: 1;
  box-shadow: 0 0 10px rgba(var(--cosmic-accent-rgb), 0.6);
  transform: scale(1.3);
}

.post-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.post-card:hover {
  background: rgba(var(--cosmic-accent-rgb), 0.04);
  border-color: rgba(var(--cosmic-accent-rgb), 0.15);
  box-shadow: 0 2px 16px var(--cosmic-shadow-color);
  transform: translateX(4px);
  color: var(--vp-c-brand-1);
}

.post-date {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.post-arrow {
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s;
}

.post-card:hover .post-arrow {
  opacity: 1;
  transform: translateX(2px);
}
</style>
