"use client";

import { useState, useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import SingerCard from "./SingerCard";

/* 默认静态倾斜角度 */
const DEFAULT_TILT_X = 40;
const DEFAULT_TILT_Y = 10;
const DEFAULT_ROTATE_Z = -20;

/* SingerCard 的设计基准尺寸 */
const CARD_BASE_WIDTH = 312;
const CARD_BASE_HEIGHT = 168;

export default function SingerCard3D() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  /* 用视口高度算 scale（与 AvatarOrbit 同一基准），1.5 倍放大 */
  useEffect(() => {
    const update = () => {
      // 目标卡片高度 = 视口高度的 30% × 1.5 × 0.6 × 0.9
      const targetH = window.innerHeight * 0.30 * 1.5 * 0.6 * 0.9;
      const s = Math.min(Math.max(targetH / CARD_BASE_HEIGHT, 0.43), 3.0);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* 视觉占位尺寸（补偿 transform:scale 不影响布局流的问题） */
  const visualW = CARD_BASE_WIDTH * scale;
  const visualH = CARD_BASE_HEIGHT * scale;

  return (
    /* 铺满左列的容器 */
    <div ref={containerRef} className="w-full flex items-center justify-center">
      {/* 占位盒：让父级感知到卡片的视觉尺寸 */}
      <div style={{ width: visualW, height: visualH, position: "relative" }}>
        {/* 绝对居中 + 缩放 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* perspective 容器 */}
          <div style={{ perspective: 900 }}>
            {/* 外层：默认固定倾斜，hover 时平滑归零 */}
            <div
              style={{
                transform: isHovering
                  ? "rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
                  : `rotateX(${DEFAULT_TILT_X}deg) rotateY(${DEFAULT_TILT_Y}deg) rotateZ(${DEFAULT_ROTATE_Z}deg)`,
                transition: "transform 0.5s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {/* 内层：Tilt 只负责鼠标跟随 */}
              <Tilt
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                scale={1.03}
                transitionSpeed={400}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="28px"
                onEnter={() => setIsHovering(true)}
                onLeave={() => setIsHovering(false)}
              >
                <SingerCard />
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
