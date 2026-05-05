<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})
</script>

<template>
  <div class="cosmic-hero" :class="{ visible }">
    <div class="hero-glow" />
    <p class="hero-slogan">多资讯源 AI 信息站</p>
    <h1 class="hero-name">
      <span class="hero-name-clip">AI Radar</span>
    </h1>
    <p class="hero-subtitle">把每天值得关注的开源动向、论文和模型公司动态，凝成可读的日报、周报、月报</p>
  </div>
</template>

<style scoped>
.cosmic-hero {
  text-align: center;
  padding: 80px 24px 60px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.cosmic-hero.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--cosmic-glow) 0%,
    var(--cosmic-glow-soft) 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: hero-pulse 6s ease-in-out infinite;
  transition: background 0.5s ease;
}

@keyframes hero-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
}

.hero-slogan {
  margin: 0 auto 24px;
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  max-width: 480px;
  opacity: 0;
  animation: hero-fade-up 0.8s ease 0.3s forwards;
}

.hero-name {
  margin: 0 0 16px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  opacity: 0;
  animation: hero-fade-up 0.8s ease 0.1s forwards;
}

.hero-name-clip {
  background: var(--vp-home-hero-name-background);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
  transition: background 0.5s ease;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-subtitle {
  margin: 0;
  font-size: 16px;
  color: var(--vp-c-text-3);
  opacity: 0;
  animation: hero-fade-up 0.8s ease 0.5s forwards;
}

@media (min-width: 640px) {
  .hero-name {
    font-size: 48px;
  }
  .hero-glow {
    width: 600px;
    height: 600px;
  }
}
</style>
