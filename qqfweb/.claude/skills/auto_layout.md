# Auto Layout — 等比缩放布局技能

> 以 **1440 × 900** 为设计基准，所有盒子及其内容根据视口宽度等比缩放。

---

## 1. 核心常量

```ts
const DESIGN_W = 1440;                   // 设计基准宽度 px
const DESIGN_H = DESIGN_W * 9 / 16;     // 设计基准高度 810px（16:9）
const NAV_H    = 66;                     // 导航栏设计高度 px
```

## 2. 缩放因子 scale

```ts
const vw = window.innerWidth;

if (vw >= DESIGN_W) {
  scale = 1;                             // 不放大
  leftOffset = (vw - DESIGN_W) / 2;     // 居中
} else {
  scale = vw / DESIGN_W;                // 等比缩小
  leftOffset = 0;                        // 贴左
}
```

| 视口宽度 | scale  | 表现                    |
| -------- | ------ | ----------------------- |
| 1440px   | 1.0    | 原始设计，居中          |
| 1280px   | 0.889  | 等比缩小              |
| 1024px   | 0.711  | 等比缩小              |
| 375px    | 0.260  | 移动端等比缩小        |
| ≥1440px  | 1.0    | 不放大，水平居中      |

## 3. 盒子宽高比控制（16:9）

**原理**：内容盒子始终保持 **宽:高 = 16:9**，高度随宽度变化。

### 外层容器（视觉尺寸）

```tsx
<div style={{ height: `min(56.25vw, ${DESIGN_H}px)` }}>
```

- `56.25vw` = `100vw × 9/16`，即宽度的 9/16
- `min(..., 810px)` 保证视口 ≥ 1440px 时不超过设计高度
- 设置 `overflow: hidden` 隐藏缩放溢出

### 内层容器（设计尺寸 + transform 缩放）

```tsx
<div style={{
  width:           DESIGN_W,        // 固定 1440px
  height:          DESIGN_H,        // 固定 810px
  transform:       `scale(${scale})`,
  transformOrigin: "top left",
  marginLeft:      leftOffset,      // ≥1440px 时居中
}}>
  {/* 三栏布局内容 */}
</div>
```

**关键**：内层始终以 1440×810 布局，通过 `transform: scale()` 整体缩放到视口宽度。内部所有内容（文字、图片、间距）自动等比缩放。

## 4. 导航栏缩放

导航栏同样采用 **设计宽度 + scale 缩放** 模式：

```tsx
{/* 外层：fixed 定位，高度随 scale 缩放 */}
<nav style={{ height: NAV_H * scale }}>
  {/* 内层：固定设计宽度，scale 缩放 */}
  <div style={{
    width:           DESIGN_W,
    height:          NAV_H,          // 固定 66px
    transform:       `scale(${scale})`,
    transformOrigin: "top left",
    marginLeft:      leftOffset,
  }}>
    {/* 导航内容 */}
  </div>
</nav>
```

- 外层 `height: NAV_H * scale` 确保 fixed 导航占据正确的视觉高度
- 内层与内容区使用相同的 `scale` 和 `leftOffset`

## 5. 间距缩放

导航栏与内容之间的间距也需要等比缩放。使用纯 CSS 公式：

```css
/* gap 在设计稿中为 G px，等比缩放公式 */
padding-top: min(G / 1440 * 100vw, Gpx);

/* 例：设计稿间距 33px */
padding-top: min(2.292vw, 33px);

/* 例：设计稿间距 66px */
padding-top: min(4.583vw, 66px);
```

**通用公式**：`min(G ÷ 1440 × 100 vw, G px)`

## 6. 工作原理总结

```
┌─────────────────────────────────────────────┐
│  视口 (viewport)                             │
│  width: 100vw                               │
│                                             │
│  ┌─ nav (fixed) ──────────────────────┐     │
│  │  height: 66 × scale               │     │
│  │  ┌─ inner (1440px) ─────────────┐  │     │
│  │  │  transform: scale(s)         │  │     │
│  │  │  品牌 │ 导航 │ ContactMe     │  │     │
│  │  └──────────────────────────────┘  │     │
│  └────────────────────────────────────┘     │
│                                             │
│  ┌─ content ──────────────────────────┐     │
│  │  height: min(56.25vw, 810px)       │     │
│  │  ┌─ inner (1440×810) ───────────┐  │     │
│  │  │  transform: scale(s)         │  │     │
│  │  │  ┌──────┬──────┬──────┐      │  │     │
│  │  │  │ 左栏  │ 中栏  │ 右栏 │      │  │     │
│  │  │  │      │      │      │      │  │     │
│  │  │  └──────┴──────┴──────┘      │  │     │
│  │  └──────────────────────────────┘  │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘

scale = min(vw / 1440, 1)
所有盒子 & 内容统一 scale → 等比缩放
```

## 7. 使用要点

1. **不要动组件内部**：组件（SingerCard、AvatarOrbit、LifeCard 等）内部尺寸保持固定 px，缩放由外层 `transform: scale()` 统一处理
2. **新增内容**：直接在 1440×810 的内层容器中按 px 布局，无需考虑响应式
3. **新增间距**：若需要等比间距，用公式 `min(G/1440*100vw, Gpx)`
4. **16:9 比例**：内容盒子高度 = 宽度 × 9/16，保证任何屏幕下比例一致
5. **≥1440px 不放大**：scale 最大为 1，超出部分通过 `marginLeft` 居中
6. **useEffect + resize**：scale 通过 `window.addEventListener("resize")` 实时更新
