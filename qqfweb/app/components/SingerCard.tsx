"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const AUDIO_SRC = `/home/${encodeURIComponent("Dan + Shay&Justin Bieber - 10,000 Hours_78332262.mp3")}`;

export default function SingerCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* 格式化时间 m:ss */
  const formatTime = (t: number) => {
    if (!isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* 播放 / 暂停 */
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play();
      setIsPlaying(true);
    }
  };

  /* 快进 / 快退 */
  const skip = (sec: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + sec, a.duration || 0));
  };

  /* 根据鼠标位置计算百分比并 seek */
  const seekFromClientX = useCallback((clientX: number) => {
    const a = audioRef.current;
    const track = trackRef.current;
    if (!a || !track) return;
    const d = a.duration;
    if (!d || !isFinite(d)) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pct * d;
    a.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  /* 确保播放中（拖动 / 点击轨道时自动播放） */
  const ensurePlaying = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setIsPlaying(true);
    }
  }, []);

  /* 监听 audio 事件 */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTimeUpdate = () => {
      if (!draggingRef.current) {
        setCurrentTime(a.currentTime);
      }
    };
    const onLoadedMetadata = () => setDuration(a.duration);
    const onEnded = () => setIsPlaying(false);

    a.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("loadedmetadata", onLoadedMetadata);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("loadedmetadata", onLoadedMetadata);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ===== 拖拽逻辑 (使用 ref 避免闭包问题) ===== */
  useEffect(() => {
    const thumb = document.getElementById("singer-thumb");
    const track = trackRef.current;
    if (!thumb || !track) return;

    const getClientX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const a = audioRef.current;
      if (!a || !isFinite(a.duration)) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (getClientX(e) - rect.left) / rect.width));
      const newTime = pct * a.duration;
      a.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.userSelect = "";
      // 拖拽结束后确保播放
      const a = audioRef.current;
      if (a && a.paused) {
        a.play();
        setIsPlaying(true);
      }
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      draggingRef.current = true;
      document.body.style.userSelect = "none";
      // 拖动即自动播放
      const a = audioRef.current;
      if (a && a.paused) {
        a.play();
        setIsPlaying(true);
      }
    };

    thumb.addEventListener("mousedown", onDown);
    thumb.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      thumb.removeEventListener("mousedown", onDown);
      thumb.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  /* 点击轨道跳转 + 自动播放 */
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingRef.current) return;
    seekFromClientX(e.clientX);
    ensurePlaying();
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const remaining = duration - currentTime;

  return (
    <div
      className="w-[312px] rounded-[28px] px-5 pt-4 pb-3"
      style={{
        backgroundImage: "url('/home/singcard_bg.svg')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 隐藏 audio 元素 */}
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
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>+{formatTime(remaining)}</span>
        </div>
        {/* 轨道 — 增大点击热区 */}
        <div
          ref={trackRef}
          className="relative w-full h-[14px] flex items-center cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* 轨道背景 */}
          <div className="absolute left-0 right-0 h-[3px] bg-gray-200/60 rounded-full" />
          {/* 已播放进度 */}
          <div
            className="absolute left-0 h-[3px] rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "#FF7F50" }}
          />
          {/* 可拖动小圆点 — 大热区包裹 */}
          <div
            id="singer-thumb"
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{
              left: `${progress}%`,
              width: 24,
              height: 24,
              marginLeft: -12,
            }}
          >
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF7F50] shadow-md transition-transform hover:scale-150" />
          </div>
        </div>
      </div>

      {/* 底部：播放控制按钮 */}
      <div className="flex items-center justify-center gap-8">
        {/* 上一首 / 快退 */}
        <button
          onClick={() => skip(-10)}
          className="text-black/80 hover:text-black transition-colors cursor-pointer"
          aria-label="Rewind"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        {/* 播放 / 暂停 */}
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

        {/* 下一首 / 快进 */}
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
  );
}
