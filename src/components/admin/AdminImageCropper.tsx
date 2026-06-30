"use client"

// ─────────────────────────────────────────────────────────────────────────────
//  AdminImageCropper — Universal Square Image Cropper Modal
//  Works for ALL admin modules: Team photos, Product images, etc.
//
//  Usage:
//    const [cropSrc, setCropSrc] = React.useState<string | null>(null)
//    <ImageUploadButton onFileSelected={setCropSrc} label="Upload Photo" />
//    {cropSrc && (
//      <AdminImageCropper
//        imageSrc={cropSrc}
//        title="Crop Product Image"      // optional, defaults to "Crop Image"
//        onSave={(b64) => { setForm(f => ({ ...f, image: b64 })); setCropSrc(null) }}
//        onCancel={() => setCropSrc(null)}
//      />
//    )}
// ─────────────────────────────────────────────────────────────────────────────

import * as React from "react"
import { X, Crop as CropIcon, Upload, ZoomIn, ZoomOut } from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────
interface AdminImageCropperProps {
  imageSrc: string
  title?: string
  onSave: (croppedBase64: string) => void
  onCancel: () => void
}

interface ImageUploadButtonProps {
  onFileSelected: (dataUrl: string) => void
  hasImage?: boolean
  label?: string
  className?: string
}

// ── Image Upload Button ───────────────────────────────────────────────────────
// Reusable button that reads a file and returns its dataURL string.
export function ImageUploadButton({
  onFileSelected,
  hasImage = false,
  label,
  className = "",
}: ImageUploadButtonProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so the same file can be re-selected
    e.target.value = ""
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) {
        onFileSelected(ev.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex items-center justify-center gap-2 w-full bg-muted border border-input border-dashed rounded-xl px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all font-body">
        <Upload className="h-4 w-4 shrink-0" />
        <span className="text-sm font-semibold">
          {label ?? (hasImage ? "Change Photo" : "Upload Photo")}
        </span>
      </div>
    </div>
  )
}

// ── Cropper Modal ─────────────────────────────────────────────────────────────
export function AdminImageCropper({
  imageSrc,
  title = "Crop Image",
  onSave,
  onCancel,
}: AdminImageCropperProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const imgRef    = React.useRef<HTMLImageElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Crop box state (in px, relative to displayed image)
  const [crop,     setCrop]     = React.useState({ x: 0, y: 0, size: 100 })
  const [imgSize,  setImgSize]  = React.useState({ w: 0, h: 0 })
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [dragging, setDragging] = React.useState<{ startX: number; startY: number; origX: number; origY: number } | null>(null)
  const [resizing, setResizing] = React.useState<{ startX: number; startY: number; origSize: number } | null>(null)

  // Initialize crop box once image loads
  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { offsetWidth: w, offsetHeight: h } = e.currentTarget
    setImgSize({ w, h })
    const size = Math.min(w, h) * 0.8
    setCrop({ x: (w - size) / 2, y: (h - size) / 2, size })
    setImgLoaded(true)
  }

  // Clamp crop box within image bounds
  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val))
  }

  // Mouse drag handlers for moving
  function onMoveStart(e: React.MouseEvent) {
    e.preventDefault()
    setDragging({ startX: e.clientX, startY: e.clientY, origX: crop.x, origY: crop.y })
  }
  function onMouseMove(e: React.MouseEvent) {
    if (dragging) {
      const dx = e.clientX - dragging.startX
      const dy = e.clientY - dragging.startY
      setCrop(c => ({
        ...c,
        x: clamp(dragging.origX + dx, 0, imgSize.w - c.size),
        y: clamp(dragging.origY + dy, 0, imgSize.h - c.size),
      }))
    }
    if (resizing) {
      const delta = e.clientX - resizing.startX
      const newSize = clamp(resizing.origSize + delta, 40, Math.min(imgSize.w, imgSize.h))
      setCrop(c => ({
        ...c,
        size: newSize,
        x: clamp(c.x, 0, imgSize.w - newSize),
        y: clamp(c.y, 0, imgSize.h - newSize),
      }))
    }
  }
  function onMouseUp() { setDragging(null); setResizing(null) }

  // Resize handle
  function onResizeStart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setResizing({ startX: e.clientX, startY: e.clientY, origSize: crop.size })
  }

  // Zoom in/out shortcut
  function zoom(factor: number) {
    setCrop(c => {
      const newSize = clamp(c.size * factor, 40, Math.min(imgSize.w, imgSize.h))
      return {
        size: newSize,
        x: clamp(c.x + (c.size - newSize) / 2, 0, imgSize.w - newSize),
        y: clamp(c.y + (c.size - newSize) / 2, 0, imgSize.h - newSize),
      }
    })
  }

  const [saving, setSaving] = React.useState(false)

  // Produce final cropped base64
  async function handleSave() {
    const img = imgRef.current
    if (!img || !imgLoaded) {
      setSaving(true)
      try {
        await onSave(imageSrc)
      } finally {
        setSaving(false)
      }
      return
    }

    const scaleX = img.naturalWidth  / img.offsetWidth
    const scaleY = img.naturalHeight / img.offsetHeight

    const OUTPUT = 400 // output pixel size
    const canvas = document.createElement("canvas")
    canvas.width  = OUTPUT
    canvas.height = OUTPUT
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setSaving(true)
      try {
        await onSave(imageSrc)
      } finally {
        setSaving(false)
      }
      return
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.size * scaleX,
      crop.size * scaleY,
      0, 0, OUTPUT, OUTPUT,
    )
    
    setSaving(true)
    try {
      await onSave(canvas.toDataURL("image/jpeg", 0.88))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <CropIcon className="h-4 w-4 text-primary" />
            <h2 className="font-headline font-bold text-secondary">{title}</h2>
          </div>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Instructions */}
        <div className="px-5 pt-4 shrink-0">
          <p className="text-xs text-muted-foreground text-center bg-muted/50 rounded-lg py-2 px-3">
            🖱️ <strong>Drag</strong> the square to reposition · <strong>Drag ↘ handle</strong> to resize · <strong>Zoom</strong> buttons below
          </p>
        </div>

        {/* Crop Area */}
        <div className="p-4 flex-1 overflow-hidden flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-xl border border-border shadow-inner bg-black/30"
            style={{ maxHeight: "52vh", maxWidth: "100%" }}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop source"
              onLoad={onImgLoad}
              draggable={false}
              style={{ maxHeight: "52vh", maxWidth: "100%", display: "block" }}
            />

            {/* Overlay */}
            {imgLoaded && (
              <>
                {/* Dark overlay outside crop box */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `
                    linear-gradient(to right, rgba(0,0,0,0.55) ${crop.x}px, transparent ${crop.x}px, transparent ${crop.x + crop.size}px, rgba(0,0,0,0.55) ${crop.x + crop.size}px),
                    linear-gradient(to bottom, rgba(0,0,0,0.55) ${crop.y}px, transparent ${crop.y}px, transparent ${crop.y + crop.size}px, rgba(0,0,0,0.55) ${crop.y + crop.size}px)
                  `
                }} />

                {/* Crop box */}
                <div
                  className="absolute border-2 border-white shadow-lg cursor-move"
                  style={{ left: crop.x, top: crop.y, width: crop.size, height: crop.size }}
                  onMouseDown={onMoveStart}
                >
                  {/* Rule-of-thirds grid */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                    backgroundSize: "33.33% 33.33%",
                  }} />
                  {/* Corner markers */}
                  {[["top-0 left-0","border-t-2 border-l-2"],["top-0 right-0","border-t-2 border-r-2"],["bottom-0 left-0","border-b-2 border-l-2"],["bottom-0 right-0","border-b-2 border-r-2"]].map(([pos, b], i) => (
                    <div key={i} className={`absolute w-4 h-4 border-white ${pos} ${b}`} />
                  ))}
                  {/* Resize handle */}
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-tl-md cursor-se-resize flex items-center justify-center shadow"
                    onMouseDown={onResizeStart}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0 8L8 0M4 8L8 4" stroke="#666" strokeWidth="1.5"/></svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 pb-5 flex flex-col gap-3 shrink-0">
          {/* Zoom buttons */}
          <div className="flex justify-center gap-2">
            <button onClick={() => zoom(0.85)} className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl border border-border transition-colors">
              <ZoomOut className="h-3.5 w-3.5" /> Zoom Out
            </button>
            <button onClick={() => zoom(1.15)} className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl border border-border transition-colors">
              <ZoomIn className="h-3.5 w-3.5" /> Zoom In
            </button>
          </div>
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={saving}
              className="flex-1 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl border border-border transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              {saving ? "Saving..." : "✓ Apply Crop"}
            </button>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
