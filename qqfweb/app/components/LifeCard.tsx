"use client";

import Image from "next/image";

export default function LifeCard() {
  return (
    /* 外层占位：补偿 rotate 不影响文档流 */
    <div style={{ width: 250, height: 195 }}>
      <div
        className="rounded-[16px] relative overflow-hidden"
        style={{
          width: 250,
          height: 150,
          background:
            "linear-gradient(135deg, rgba(252, 211, 77, 0.5), rgba(255, 127, 80, 0.8))",
          transform: "rotate(6deg)",
        }}
      >
        {/* ── 上部：左文字 + 右插画 ── */}
        <div className="flex items-start justify-between px-4 pt-3.5">
          {/* 左侧文字 */}
          <div className="max-w-[130px] flex-shrink-0 mt-4">
            <h3 className="text-[18px] font-extrabold text-black leading-[1.1] tracking-tight">
              Enjoying Life
            </h3>
            <p className="text-[8.5px] text-black/45 mt-1.5 leading-[1.7]">
              Savor the sunshine, breathe
              deeply, and make every single
              second count today.
            </p>
          </div>

          {/* 右侧插画拼贴 */}
          <div className="relative w-[100px] h-[90px] flex-shrink-0">
            {/* 山 — 右上 */}
            <Image
              src="/home/mountain.png"
              alt="Mountain"
              width={80}
              height={80}
              className="absolute top-0 right-3 rounded-lg object-cover drop-shadow-md"
            />
            {/* 相框 — 左中 */}
            <Image
              src="/home/picture.png"
              alt="Picture"
              width={90}
              height={90}
              className="absolute top-[30px] right-5 rounded-lg object-cover drop-shadow-md"
            />
            {/* 跑步 — 中下 */}
            <Image
              src="/home/run.png"
              alt="Running"
              width={85}
              height={85}
              className="absolute bottom-0 right-[-10px] top-[40px] rounded-lg object-cover drop-shadow-md"
            />
          </div>
        </div>

        {/* ── 底部：View My Life 按钮 ── */}
        <div className="absolute bottom-5 left-3">
          <button
            onClick={() => {
              /* TODO: 跳转到 Life 页面 */
            }}
            className="
              group flex items-center gap-1
              bg-orange-500/50 hover:bg-black/50
              text-white text-[8px] font-semibold
              px-2.5 py-1 rounded-full
              transition-all duration-200
              cursor-pointer
              backdrop-blur-sm
            "
          >
            <span>View My Life</span>
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
