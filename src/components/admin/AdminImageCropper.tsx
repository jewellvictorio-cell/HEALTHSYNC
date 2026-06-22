"use client"

import * as React from "react"
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { X, Crop as CropIcon } from "lucide-react"

interface AdminImageCropperProps {
  imageSrc: string
  onSave: (croppedBase64: string) => void
  onCancel: () => void
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function AdminImageCropper({ imageSrc, onSave, onCancel }: AdminImageCropperProps) {
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [crop, setCrop] = React.useState<Crop>()
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  async function handleSave() {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas')
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height
      canvas.width = completedCrop.width
      canvas.height = completedCrop.height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(
          imgRef.current,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        )
        const base64Image = canvas.toDataURL('image/jpeg', 0.9)
        onSave(base64Image)
      }
    } else {
      // If no crop happens, just return original
      onSave(imageSrc)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 shrink-0">
          <div className="flex items-center gap-2">
            <CropIcon className="h-5 w-5 text-primary" />
            <h2 className="font-headline font-bold text-secondary text-lg">Crop Profile Photo</h2>
          </div>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center bg-black/5">
          <p className="text-sm text-muted-foreground mb-4 text-center">Drag the box to crop the image to a 1:1 square ratio.</p>
          <div className="max-w-full max-h-[60vh] overflow-hidden rounded-xl border border-border bg-white/50 shadow-inner p-2">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={true}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                className="max-h-[50vh] w-auto object-contain"
              />
            </ReactCrop>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Save Crop
          </button>
        </div>
      </div>
    </div>
  )
}
