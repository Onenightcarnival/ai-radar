import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Radar',
  description: '多资讯源 AI 信息站 · GitHub / arXiv 日报 · 周报 · 月报',
  lang: 'zh-CN',
  appearance: 'force-dark',
  cleanUrls: true,

  // Sources live at repo root; reports/ is written by agents.
  srcDir: '.',
  srcExclude: [
    'README.md',
    'AGENTS.md',
    'CLAUDE.md',
    'LICENSE',
    'scripts/**',
    'node_modules/**',
    '.github/**',
  ],

  // GitHub Pages: deploys to https://onenightcarnival.github.io/ai-radar/
  base: '/ai-radar/',

  head: [
    ['meta', { name: 'theme-color', content: '#0a0a0f' }],
  ],

  themeConfig: {
    nav: [
      {
        text: 'GitHub',
        items: [
          { text: '日报', link: '/reports/github/daily/' },
          { text: '周报', link: '/reports/github/weekly/' },
          { text: '月报', link: '/reports/github/monthly/' },
        ],
      },
      {
        text: 'arXiv',
        items: [
          { text: '日报', link: '/reports/arxiv/daily/' },
          { text: '周报', link: '/reports/arxiv/weekly/' },
          { text: '月报', link: '/reports/arxiv/monthly/' },
        ],
      },
    ],

    sidebar: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Onenightcarnival/ai-radar' },
    ],

    outline: {
      label: '目录',
      level: [2, 3],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除',
            backButtonTitle: '返回',
            noResultsText: '捞了个寂寞',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    footer: {
      message: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>',
      copyright: `Copyright © ${new Date().getFullYear()} Chao Li`,
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色',
    darkModeSwitchTitle: '切换到深色',
  },
})
