# admin-dashboard-template

现代化管理后台模板（React + Vite + TypeScript + Tailwind CSS）。

## ✨ 特性

- 响应式布局（桌面端经典后台 + 移动端抽屉式侧边栏）
- 左侧 Sidebar（图标+菜单、可折叠、路由高亮）
- Topbar（搜索、通知下拉、用户菜单）
- Dashboard 数据卡片、折线图（Recharts）、订单表格（排序 + 前端分页）
- 暗黑模式一键切换并持久化到 `localStorage`
- 结构清晰、组件拆分合理，易扩展
- ESLint + Prettier 基础规范

## 🧱 目录结构

```
src/
  components/
    dashboard/
      OrdersTable.tsx
      SalesLineChart.tsx
      StatCard.tsx
    layout/
      AppLayout.tsx
      Sidebar.tsx
      Topbar.tsx
  data/
    mock.ts
  hooks/
    useDarkMode.ts
    usePagination.ts
  pages/
    DashboardPage.tsx
    PlaceholderPage.tsx
  App.tsx
  main.tsx
  index.css
```

## 🚀 启动

```bash
npm install
npm run dev
```

## 🏗 构建

```bash
npm run build
npm run preview
```

## 🌗 暗黑模式

- 通过 Topbar 的切换按钮控制
- 主题状态保存在 `localStorage`（key: `admin-dashboard-theme`）
- Tailwind `dark` class 策略

## ✅ 可扩展点

- 把 `data/mock.ts` 替换为真实 API 数据
- 在 `pages/` 中新增更多业务模块
- 替换或扩展 `components/dashboard` 为真实业务组件
- 引入状态管理（Zustand / Redux）与权限控制

## 📸 截图

> `docs/screenshot.png` 为占位，可替换为真实截图。
