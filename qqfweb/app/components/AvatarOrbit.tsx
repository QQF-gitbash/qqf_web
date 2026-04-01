"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const BASE_SIZE = 378; // 设计基准尺寸(px)

const orbitIcons = [
  { src: "/home/sing.png", alt: "Sing", bg: "#E8E8ED" },
  { src: "/home/climb.png", alt: "Climb", bg: "#FDE8C8" },
  { src: "/home/cake.png", alt: "Cake", bg: "#FDCDD5" },
  { src: "/home/red_dog.png", alt: "Red Dog", bg: "#FDDBC8" },
  { src: "/home/coffee.png", alt: "Coffee", bg: "#FFF3DC" },
  { src: "/home/flower.png", alt: "Flower", bg: "#D4EBFD" },
  { src: "/home/car.png", alt: "Car", bg: "#D4E8F7" },
  { src: "/home/bag.png", alt: "Bag", bg: "#E8DDD4" },
  { src: "/home/read.png", alt: "Read", bg: "#F0E6D4" },
  { src: "/home/run.png", alt: "Run", bg: "#FDDBC8" },
  { src: "/home/chart.png", alt: "Chart", bg: "#D4F0D9" },
  { src: "/home/picture.png", alt: "Picture", bg: "#FDE8C8" },
];

export default function AvatarOrbit() {
  const [spinning, setSpinning] = useState(false);
  const playState = spinning ? "running" : "paused";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const vh45 = window.innerHeight * 0.55;
      setScale(vh45 / BASE_SIZE);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 品牌标识 */}
      <div className="flex items-center gap-2 mb-4" style={{ transform: `scale(${scale})`, transformOrigin: "center bottom" }}>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold leading-none">Q</span>
        <span className="text-base font-bold tracking-wide">QQF-WEB</span>
      </div>
      <div className="flex items-center justify-center" style={{ width: `${BASE_SIZE * scale}px`, height: `${BASE_SIZE * scale}px` }}>
      <div className="relative" style={{ width: BASE_SIZE, height: BASE_SIZE, transform: `scale(${scale})` }}>
        {/* 旋转轨道容器 */}
        <div
          className="absolute inset-0"
          style={{
            animation: "orbit-spin 20s linear infinite",
            animationPlayState: playState,
          }}
        >
          {/* 12个环绕图标 */}
          {orbitIcons.map((icon, i) => {
            const angle = (360 / orbitIcons.length) * i;
            const radius = 150;
            return (
              <div
                key={icon.alt}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center overflow-hidden shadow-sm"
                  style={{
                    backgroundColor: icon.bg,
                    width: 56,
                    height: 56,
                    animation: "counter-spin 20s linear infinite",
                    animationPlayState: playState,
                  }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 中心头像 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-[108px] h-[108px] rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src="/home/me.jpg"
              alt="QQF Avatar"
              width={108}
              height={108}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* 虚线箭头 + Click&Rotate/Stop 按钮 */}
        <div className="absolute -top-4 -right-20 flex items-start gap-0">
          {/* 虚线灵动箭头：从左下蜿蜒绕圈再指向右上按钮 */}
          <svg
            width="75"
            height="65"
            viewBox="0 0 75 65"
            fill="none"
            className="mt-5 -mr-1"
          >
            <path
              d="M6 58 Q2 45, 10 38 Q18 30, 24 35 Q30 40, 28 30 Q26 20, 34 16 Q42 10, 50 14 Q56 17, 52 12 Q48 6, 56 5 L65 8"
              stroke="#FF7F50"
              strokeWidth="2"
              strokeDasharray="5 4"
              fill="none"
              strokeLinecap="round"
            />
            <polygon points="62,3 70,8 63,13" fill="#FF7F50" />
          </svg>
          {/* 按钮 */}
          <button
            onClick={() => setSpinning(!spinning)}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{ backgroundColor: "#FF7F50" }}
          >
            {spinning ? "Click&Stop" : "Click&Rotate"}
          </button>
        </div>

        {/* 全局动画样式 */}
        <style jsx global>{`
          @keyframes orbit-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes counter-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </div>
      </div>
    </div>
  );
}
