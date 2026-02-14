'use client'

import React from 'react'

interface EmptyCanvasProps {
  icon: string
  title: string
  instructions: string[]
}

export default function EmptyCanvas({ icon, title, instructions }: EmptyCanvasProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-8 max-w-md border-2 border-blue-200 z-10">
      <div className="text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="text-left space-y-2 text-sm text-slate-700">
          {instructions.map((instruction, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: instruction }} />
          ))}
        </div>
      </div>
    </div>
  )
}
