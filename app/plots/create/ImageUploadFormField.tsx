'use client'

import { ImagesSquare } from '@phosphor-icons/react'
import { useState } from 'react'

export default function ImageUploadFormField() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <>
      {files.map((file, i) => (
        <img
          alt={`Image ${i + 1}`}
          className="aspect-square rounded-2xl"
          key={i}
          src={URL.createObjectURL(file)}
        />
      ))}
      <div className="border-2 border-amber-50 border-dashed flex grow items-center justify-center relative rounded-2xl">
        <ImagesSquare
          className="pointer-events-none relative z-10"
          size={40}
          weight="light"
        />
        <input
          className="absolute cursor-pointer inset-0 text-transparent file:hidden"
          multiple
          onChange={e => {
            setFiles(Array.from(e.target.files || []))
          }}
          type="file"
        />
      </div>
    </>
  )
}
