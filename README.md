# AI Radar

AI Radar 是一个多资讯源 AI 信息站。这个仓库只保存整理后的报告结果和少量维护说明；抓取、筛选、写作、排版等自动化逻辑放在 Codex skills 或外部任务里维护。

## 目录

```text
.
├── reports/
│   ├── github/         # GitHub 项目与开源动态
│   ├── arxiv/          # arXiv 论文动态
│   ├── anthropic/      # Anthropic 官方动态
│   └── index.md        # 报告索引
└── README.md
```

## 报告命名

- 日报：`reports/{source}/daily/YYYY/YYYY-MM-DD.md`
- 周报：`reports/{source}/weekly/YYYY/YYYY-Www.md`
- 月报：`reports/{source}/monthly/YYYY/YYYY-MM.md`

周报使用 ISO 周编号，例如 `2026-W18.md`。

当前保留的 `{source}`：

- `github`
- `arxiv`
- `anthropic`

文件名必须严格匹配上述格式，否则不会被静态站点收录。

## 写入规则

Agent 生成报告后，按信息源和周期保存到对应目录：

- GitHub 日报：`reports/github/daily/YYYY/YYYY-MM-DD.md`
- GitHub 周报：`reports/github/weekly/YYYY/YYYY-Www.md`
- GitHub 月报：`reports/github/monthly/YYYY/YYYY-MM.md`
- arXiv 日报：`reports/arxiv/daily/YYYY/YYYY-MM-DD.md`
- arXiv 周报：`reports/arxiv/weekly/YYYY/YYYY-Www.md`
- arXiv 月报：`reports/arxiv/monthly/YYYY/YYYY-MM.md`
- Anthropic 日报：`reports/anthropic/daily/YYYY/YYYY-MM-DD.md`
- Anthropic 周报：`reports/anthropic/weekly/YYYY/YYYY-Www.md`
- Anthropic 月报：`reports/anthropic/monthly/YYYY/YYYY-MM.md`

如果 agent 提交本仓库的任何内容，commit message 中都需要把该 agent 作为 co-author。
