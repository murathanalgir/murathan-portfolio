'use client'

import React from 'react'

export default function Heart() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-[10rem] animate-heartbeat">
        💖
      </div>
      <style jsx>{`
        @keyframes heartbeat {
          from { transform: scale(0.7); }
          to   { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s infinite alternate linear;
        }
      `}</style>
    </div>
  )
}
