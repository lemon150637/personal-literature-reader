# 个人法学文献阅读器

> 从一份完整的 PRD 开始的产品：基于开源 Koodo Reader 二次开发，为法学研究者增加「论文信息与阅读笔记」能力——每个摘录都能追溯到出处。

**English: A PRD-driven product built on top of Koodo Reader (AGPL-3.0), adding paper metadata & reading notes for legal researchers.**

![type](https://img.shields.io/badge/type-Electron%20%2F%20Web%20App-blueviolet) ![license](https://img.shields.io/badge/license-AGPL--3.0-informational) ![prd](https://img.shields.io/badge/PRD-v1.0-success)

---

## 产品文档（本项目的核心资产）

👉 **[个人法学文献阅读与写作工作台 PRD v1.0](./个人文献阅读器_PRD_v1.0.md)**

包含：背景与产品目标、7 个用户场景、产品原则（原始资料与加工结果分离 / 三类内容分级标识 / 本地存储优先）、P0/P1/P2 范围划分、信息架构。

> PRD 是目标需求，不代表原型已全部实现。现有原型完成了 PRD 中的笔记面板与导出，网页采集、主题 JSON 导出等待开发——**如实标注进度，是产品的诚实**。

## 为什么做（用户痛点）

法学研究者每天读大量论文、法规、案例，但：

- 资料分散在浏览器、下载目录、笔记软件里，**摘录与出处长期失联**；
- 写作引用时反复找原文，给大模型喂材料还要重新整理；
- PDF 阅读器很多，但**没有"论文级"元数据管理**（期刊、DOI、研究问题、方法、结论）。

## 在 Koodo Reader 基础上新增的功能

- **论文信息与阅读笔记面板**：年份、期刊/会议、DOI、主题、研究问题、方法、结论、局限性、个人评价——随 PDF 一起管理；
- **独立持久化存储**：localforage 独立数据库，按 book.key 关联，不动原版数据结构；
- **一键导出 Markdown**：导出面板当前内容（含未保存编辑），保证笔记永不丢失；
- **修改入口收敛**：`src/components/paperPanel/index.tsx`（新增面板）+ `editDialog`（入口），最小化对上游的侵入。

## 开源合规

- 基于 [koodo-reader](https://github.com/koodo-reader/koodo-reader) 二次开发，保留 AGPL-3.0 许可证与作者信息；
- 详细改造说明见 [PERSONAL_READER.md](./PERSONAL_READER.md)（含数据边界、修改入口、验证记录）。

## 快速开始

```bash
yarn install          # 或双击 install-web.cmd
yarn start            # 打开 http://127.0.0.1:3000
```

导入 PDF → 文献操作菜单 → 编辑 → 展开"论文信息与阅读笔记"。

## 构建方式

AI 辅助编码（vibe coding）：PRD 撰写、开源选型（Koodo vs 自研的决策）、二次开发的侵入性控制、AGPL 合规策略由本人完成。

## 相关项目

- [literature-workbench-react](https://github.com/lemon150637/literature-workbench-react) — PRD 的 React 快速原型
