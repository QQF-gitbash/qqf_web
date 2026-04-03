"use client";

import { useState, useEffect } from "react";
import AvatarOrbit from "./components/AvatarOrbit";
import SingerCard3D from "./components/SingerCard3D";
import LifeCard from "./components/LifeCard";

/** 设计稿基准宽度 — 内层按此宽度布局，再整体缩放到视口宽度 */
const DESIGN_W = 1440;

export default function Home() {
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw >= DESIGN_W) {
        // 视口 ≥ 设计宽度 → 不缩放，居中
        setScale(1);
        setLeftOffset((vw - DESIGN_W) / 2);
      } else {
        // 视口 < 设计宽度 → 等比缩小，贴左
        setScale(vw / DESIGN_W);
        setLeftOffset(0);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    /* 外层：撑满可视区，隐藏缩放溢出 */
    <div
      className="w-full overflow-hidden"
      style={{ height: "calc(100vh - 66px)" }}
    >
      {/* 内层：固定 DESIGN_W，等比 scale 到视口宽度 */}
      <div
        className="flex items-center"
        style={{
          width: DESIGN_W,
          height: `calc((100vh - 66px) / ${scale})`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginLeft: leftOffset,
        }}
      >
        {/* ── 左侧盒子：SingerCard3D + LifeCard ── */}
        <div className="flex-1 flex items-center justify-center overflow-visible">
          <div
            className="flex flex-col items-center gap-20"
            style={{ transform: "translateY(-30px)" }}
          >
            <SingerCard3D />
            <LifeCard />
          </div>
        </div>

        {/* ── 中间盒子：AvatarOrbit ── */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <AvatarOrbit />
        </div>

        {/* ── 右侧盒子：暂时留空 ── */}
        <div className="flex-1 min-w-0" />
      </div>
    </div>
  );
}
