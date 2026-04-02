"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const AUDIO_SRC = `/home/${encodeURIComponent("Dan + Shay&Justin Bieber - 10,000 Hours_78332262.mp3")}`;

export default function SingerCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isDragging = useRef(false);

  /* 格式化时间 m:ss */
  const fmt = (t: number) => {
    if (!isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* 播放 / 暂停 */
  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else { a.play(); setIsPlaying(true); }
  }, [isPlaying]);

  /* 快进 / 快退 */
  const skip = (sec: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + sec, a.duration || 0));
  };

  /* ── 音频事件 + 修复 duration 可能在 useEffect 前已加载的问题 ── */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    /* 修复 Bug2：如果 metadata 已经加载完成，直接读取 */
    if (isFinite(a.duration) && a.duration > 0) {
      setDuration(a.duration);
    }

    const onDurationChange = () => {
      if (isFinite(a.duration) && a.duration > 0) setDuration(a.duration);
    };
    const onEnded = () => setIsPlaying(false);

    a.addEventListener("loadedmetadata", onDurationChange);
    a.addEventListener("durationchange", onDurationChange); // 双重保险
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("loadedmetadata", onDurationChange);
      a.removeEventListener("durationchange", onDurationChange);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ── 60fps 进度更新（播放中 + 非拖拽时） ── */
  useEffect(() => {
    if (!isPlaying) return;
    let rafId: number;
    const tick = () => {
      const a = audioRef.current;
      if (a && !isDragging.current) {
        setCurrentTime(a.currentTime);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  /* ── 修复 Bug1：window 级 mouseup/touchend，防止拖出 input 后卡死 ── */
  useEffect(() => {
    const onUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
      }
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = duration - currentTime;

  /* range 拖拽 → 实时 seek + 更新橙色 */
  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    setCurrentTime(t); // 立即更新 state → 橙色渐变实时跟进
    if (audioRef.current) audioRef.current.currentTime = t;
  };

  /* 开始拖拽 → 自动播放 */
  const handleRangeStart = () => {
    isDragging.current = true;
    const a = audioRef.current;
    if (a && a.paused) { a.play(); setIsPlaying(true); }
  };

  return (
    <>
      <style>{`
        .qqf-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .qqf-range::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          height: 3px;
          background: transparent !important;
          border: none;
        }
        .qqf-range::-moz-range-track {
          height: 3px;
          background: transparent !important;
          border: none;
        }
        .qqf-range::-moz-range-progress {
          height: 3px;
          border-radius: 2px;
          background: #FF7F50;
        }
        .qqf-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FF7F50;
          cursor: grab;
          margin-top: -5.5px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.25);
          transition: transform 0.1s;
        }
        .qqf-range:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.35);
        }
        .qqf-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FF7F50;
          border: none;
          cursor: grab;
          box-shadow: 0 1px 5px rgba(0,0,0,0.25);
        }
      `}</style>

      <div
        className="w-[312px] rounded-[28px] px-5 pt-4 pb-3"
        style={{
          backgroundImage: "url('/home/singcard_bg.svg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

        {/* 顶部：封面 + 歌曲信息 */}
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-[52px] h-[52px] rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
            <Image
              src="/home/singcard.jpg"
              alt="10,000 Hours Album"
              width={52}
              height={52}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13px] font-bold text-black leading-tight truncate">
              《10,000 Hours》
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">--- Justin Bieber</p>
          </div>
        </div>

        {/* 中部：进度条 */}
        <div className="mb-0">
          {/* 时间：左=当前时间  右=剩余时间 */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
            <span>{fmt(currentTime)}</span>
            <span>{duration > 0 ? `-${fmt(remaining)}` : fmt(0)}</span>
          </div>

          {/* 进度条：橙色=已播放  灰色=未播放 */}
          <input
            type="range"
            className="qqf-range"
            min={0}
            max={duration || 1}
            step={0.01}
            value={currentTime}
            onChange={handleRangeInput}
            onInput={handleRangeInput as unknown as React.FormEventHandler<HTMLInputElement>}
            onMouseDown={handleRangeStart}
            onTouchStart={handleRangeStart}
            style={{
              background: `linear-gradient(to right, #FF7F50 ${progress}%, rgba(0,0,0,0.12) ${progress}%)`
            }}
          />
        </div>

        {/* 底部：播放控制 */}
        <div className="flex items-center justify-center gap-8 mt-1">
          <button
            onClick={() => skip(-10)}
            className="text-black/80 hover:text-black transition-colors cursor-pointer"
            aria-label="Rewind"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="text-black hover:scale-110 transition-transform cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => skip(10)}
            className="text-black/80 hover:text-black transition-colors cursor-pointer"
            aria-label="Forward"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
