// src/components/admin/AdminImageCropper.tsx
// Image cropping component for admin team photo uploads
// This is a client‑side component – it uses React‑Image‑Crop which works only in the browser.
// We use the "use client" directive so Next.js treats it as a client component and avoids Turbopack SSR errors.

"use client"

import * as React from "react"
import { useCallback, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { Crop, PixelCrop } from "react-image-crop"
// Lazy load ReactCrop client‑side to avoid SSR import errors
const ReactCrop = dynamic(() => import('react-image-crop').then(mod => mod.default), { ssr: false })

import "react-image-crop/dist/ReactCrop.css"
import { X, Crop as CropIcon } from "lucide-react"

// Helper: create a cropped image Blob from the source image and the pixel crop area.
function getCroppedImg(
  image: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return Promise.reject(new Error("2D context not available"))
  }

  // Draw the cropped portion of the image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Convert canvas to Blob (default JPEG, quality 0.9)
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error("Canvas is empty"))
    }, "image/jpeg", 0.9)
  })
}

interface AdminImageCropperProps {
  /** Image data URL or object URL to be cropped */
  src: string
  /** Called with the final cropped Blob */
  onComplete: (croppedBlob: Blob) => void
  /** Called when the user cancels the operation */
  onCancel: () => void
}

/**
 * A modal‑style image cropper used in the admin team page.
 * It presents the selected image, lets the user draw a crop rectangle, and returns
 * a Blob of the cropped result.
 */
export default function AdminImageCropper({ src, onComplete, onCancel }: AdminImageCropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>(
    // Start with a centered square crop (1:1) – you can adjust the aspect ratio if needed.
    { unit: "%", width: 80, aspect: 1 }
  )
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)

  const [mounted, setMounted] = React.useState(false)
  const [scale, setScale] = useState(1)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // Simple centered square crop (80% width, 1:1 aspect)
    const initialCrop: Crop = { unit: "%", width: 80, aspect: 1 }
    setCrop(initialCrop)
    imgRef.current = e.currentTarget
  }, [])

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return
    try {
      const blob = await getCroppedImg(imgRef.current, completedCrop)
      onComplete(blob)
    } catch (err) {
      console.error("Crop failed:", err)
    }
  }

  // Generate a preview URL whenever the completed crop changes
  React.useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      setPreviewUrl(null)
      return
    }
    const canvas = document.createElement("canvas")
    canvas.width = completedCrop.width
    canvas.height = completedCrop.height
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setPreviewUrl(null)
      return
    }
    ctx.drawImage(
      imgRef.current,
      completedCrop.x,
      completedCrop.y,
      completedCrop.width,
      completedCrop.height,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    )
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }, "image/jpeg", 0.9)
  }, [completedCrop])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl p-4 max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Crop Photo</h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Cropping area */}
        {mounted && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(_, pixelCrop) => setCompletedCrop(pixelCrop)}
              keepSelection={true}
              aspect={1}
            >
              <img
                src={src}
                alt="To be cropped"
                onLoad={onImageLoad}
                ref={imgRef}
                className="max-w-full max-h-[60vh] object-contain"
                style={{ transform: `scale(${scale})` }}
              />
            </ReactCrop>
            {/* Zoom slider */}
            <div className="mt-4 flex items-center space-x-3">
              <label className="text-sm font-medium">Zoom:</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={scale}
                onChange={e => setScale(parseFloat(e.target.value))}
                className="flex-1"
              />
            </div>
            {/* Real‑time preview */}
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Preview:</p>
                <img src={previewUrl} alt="Cropped preview" className="max-w-full h-auto rounded border" />
              </div>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!completedCrop}
            className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            <CropIcon className="inline mr-1" size={16} />
            Save Crop
          </button>
        </div>
      </div>
    </div>
  )
}
