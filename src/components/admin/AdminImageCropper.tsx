// src/components/admin/AdminImageCropper.tsx
// Image cropping component for admin team photo uploads
// Client-side only – uses React-Image-Crop which requires the browser.

"use client"

import * as React from "react"
import { useCallback, useRef, useState } from "react"
import type { Crop, PixelCrop } from "react-image-crop"
import ReactCrop from "react-image-crop"

import "react-image-crop/dist/ReactCrop.css"
import { X, Check } from "lucide-react"

/**
 * Create a cropped image Blob from the source image and the pixel crop area.
 *
 * IMPORTANT: react-image-crop's PixelCrop values are in *displayed* pixels
 * (i.e. the size the <img> is rendered at in CSS). The canvas drawImage()
 * source coordinates must be in *natural* pixels (the real image resolution).
 * We compute the ratio and scale accordingly.
 */
function getCroppedImg(
  image: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<Blob> {
  // pixelCrop from onComplete is already in natural pixel coordinates.
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(pixelCrop.width);
  canvas.height = Math.round(pixelCrop.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return Promise.reject(new Error("2D context not available"));
  }

  // Draw the cropped portion from the natural image using scaled coordinates
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Canvas is empty"))
      },
      "image/jpeg",
      0.92
    )
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
 * A modal image cropper used in the admin team page.
 * It presents the selected image, lets the user draw a 1:1 crop rectangle,
 * shows a live preview, and returns a Blob of the cropped result.
 */
export default function AdminImageCropper({ src, onComplete, onCancel }: AdminImageCropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [mounted, setMounted] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget
    // Set an initial centered crop
    const { width, height } = e.currentTarget
    const size = Math.min(width, height) * 0.8
    const x = (width - size) / 2
    const y = (height - size) / 2
    const initialCrop: Crop = {
      unit: "px",
      x,
      y,
      width: size,
      height: size,
    }
    setCrop(initialCrop)
  }, [])

  const toNaturalCrop = (crop: PixelCrop): PixelCrop => {
    if (!imgRef.current) return crop;
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    return {
      x: crop.x * scaleX,
      y: crop.y * scaleY,
      width: crop.width * scaleX,
      height: crop.height * scaleY,
      unit: "px",
    };
  };

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;
    setSaving(true);
    try {
      const naturalCrop = toNaturalCrop(completedCrop);
      const blob = await getCroppedImg(imgRef.current, naturalCrop);
      onComplete(blob);
    } catch (err) {
      console.error("Crop failed:", err);
    } finally {
      setSaving(false);
    }
  };

  // Generate a live preview that matches the final cropped image exactly
  React.useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      setPreviewUrl(null);
      return;
    }
    let isCancelled = false;
    const naturalCrop = toNaturalCrop(completedCrop);
    getCroppedImg(imgRef.current, naturalCrop)
      .then((blob) => {
        if (isCancelled) return;
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
        } else {
          setPreviewUrl(null);
        }
      })
      .catch((err) => {
        console.error("Preview generation failed:", err);
        setPreviewUrl(null);
      });
    return () => {
      isCancelled = true;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [completedCrop]);

  // Clean up preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col mx-4 animate-in zoom-in-95 fade-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-headline font-bold text-secondary text-lg">Crop Photo</h2>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Crop area */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {mounted && (
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Cropper */}
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-xl p-3 border border-border/50 min-h-[200px]">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
                  keepSelection
                  aspect={1}
                  className="max-w-full"
                >
                  <img
                    src={src}
                    alt="Photo to crop"
                    onLoad={onImageLoad}
                    ref={imgRef}
                    className="max-w-full max-h-[50vh] object-contain"
                  />
                </ReactCrop>
              </div>

              {/* Live preview */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Preview</p>
                <div className="rounded-xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center" style={{ width: 200, height: 200 }}>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Cropped preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground/50">Select area</span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground/60 text-center max-w-[140px]">
                  This is how the photo will appear on the team page.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border shrink-0">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all border border-border"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!completedCrop || saving}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all disabled:opacity-40 shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            {saving ? "Saving…" : "Save Photo"}
          </button>
        </div>
      </div>
    </div>
  )
}
