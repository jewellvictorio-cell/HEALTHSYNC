"use client"

import * as React from "react"
import { getSlideshow, saveSlideshow, getSlideshow2, saveSlideshow2, type SlideshowImage } from "@/lib/store"
import { useToast } from "@/components/admin/AdminToast"
import { AdminImageCropper, ImageUploadButton } from "@/components/admin/AdminImageCropper"
import { Trash2, ArrowUp, ArrowDown, Plus, Loader2, Check, LayoutGrid, Layers } from "lucide-react"
import Image from "next/image"

type Tab = "hero" | "about"

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = React.useState<Tab>("hero")
  
  // Hero slideshow state
  const [heroSlides, setHeroSlides] = React.useState<SlideshowImage[]>([])
  // About slideshow state
  const [aboutSlides, setAboutSlides] = React.useState<SlideshowImage[]>([])

  const [cropSrc, setCropSrc] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [busyId, setBusyId] = React.useState<string | null>(null)
  const { toast } = useToast()

  // Selection states
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  React.useEffect(() => {
    setHeroSlides(getSlideshow())
    setAboutSlides(getSlideshow2())
  }, [])

  // Clear selections when switching tab
  React.useEffect(() => {
    setSelectedIds([])
  }, [activeTab])

  const currentSlides = activeTab === "hero" ? heroSlides : aboutSlides

  const allSelected = currentSlides.length > 0 && currentSlides.every(slide => selectedIds.includes(slide.id))

  function toggleSelectAll() {
    if (allSelected) {
      const currentIds = currentSlides.map(slide => slide.id)
      setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)))
    } else {
      const currentIds = currentSlides.map(slide => slide.id)
      setSelectedIds(prev => Array.from(new Set([...prev, ...currentIds])))
    }
  }

  async function handleSave() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    let success = false
    if (activeTab === "hero") {
      success = saveSlideshow(heroSlides)
    } else {
      success = saveSlideshow2(aboutSlides)
    }
    setSaving(false)
    if (success) {
      toast("Slideshow arrangement updated!")
    }
  }

  async function handleAddSlide(croppedBase64: string) {
    if (currentSlides.length >= 10) {
      alert("Maximum limit of 10 slides reached.")
      setCropSrc(null)
      return
    }
    setCropSrc(null)
    setBusyId("add")
    await new Promise(r => setTimeout(r, 800))

    const newSlide: SlideshowImage = {
      id: (activeTab === "hero" ? "slide_" : "slide2_") + Date.now().toString(36) + Math.random().toString(36).slice(2),
      url: croppedBase64
    }

    let success = false
    if (activeTab === "hero") {
      const newList = [...heroSlides, newSlide]
      setHeroSlides(newList)
      success = saveSlideshow(newList)
    } else {
      const newList = [...aboutSlides, newSlide]
      setAboutSlides(newList)
      success = saveSlideshow2(newList)
    }

    setBusyId(null)
    if (success) {
      toast("Slideshow photo successfully saved!")
    }
  }

  async function handleDeleteSlide(id: string) {
    setBusyId("remove_" + id)
    await new Promise(r => setTimeout(r, 700))

    let success = false
    if (activeTab === "hero") {
      const newList = heroSlides.filter(slide => slide.id !== id)
      setHeroSlides(newList)
      success = saveSlideshow(newList)
    } else {
      const newList = aboutSlides.filter(slide => slide.id !== id)
      setAboutSlides(newList)
      success = saveSlideshow2(newList)
    }

    setSelectedIds(prev => prev.filter(x => x !== id))
    setBusyId(null)
    if (success) {
      toast("Slideshow photo successfully removed!")
    }
  }

  async function handleBulkDelete() {
    setBusyId("bulk_remove")
    await new Promise(r => setTimeout(r, 800))

    let success = false
    if (activeTab === "hero") {
      const newList = heroSlides.filter(slide => !selectedIds.includes(slide.id))
      setHeroSlides(newList)
      success = saveSlideshow(newList)
    } else {
      const newList = aboutSlides.filter(slide => !selectedIds.includes(slide.id))
      setAboutSlides(newList)
      success = saveSlideshow2(newList)
    }

    setSelectedIds([])
    setBusyId(null)
    if (success) {
      toast("Selected slideshow photos successfully removed!")
    }
  }

  async function moveSlide(index: number, direction: "up" | "down") {
    const list = activeTab === "hero" ? [...heroSlides] : [...aboutSlides]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= list.length) return

    const temp = list[index]
    list[index] = list[targetIndex]
    list[targetIndex] = temp

    setBusyId("move_" + direction + "_" + temp.id)
    await new Promise(r => setTimeout(r, 600))

    let success = false
    if (activeTab === "hero") {
      setHeroSlides(list)
      success = saveSlideshow(list)
    } else {
      setAboutSlides(list)
      success = saveSlideshow2(list)
    }

    setBusyId(null)
    if (success) {
      toast("Slideshow arrangement updated!")
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-headline font-bold text-secondary">Home Page Visuals</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage slideshow carousels for the landing page.
          </p>
        </div>
      </div>

      {/* Tab selection */}
      <div className="flex bg-muted border border-border rounded-xl p-1 w-fit animate-in fade-in duration-300">
        <button
          onClick={() => { setActiveTab("hero"); setCropSrc(null) }}
          disabled={busyId !== null}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "hero"
              ? "bg-card text-primary shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          } disabled:opacity-50`}
        >
          <LayoutGrid className="h-4 w-4" />
          Page 1: Hero Slideshow
        </button>
        <button
          onClick={() => { setActiveTab("about"); setCropSrc(null) }}
          disabled={busyId !== null}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "about"
              ? "bg-card text-primary shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          } disabled:opacity-50`}
        >
          <Layers className="h-4 w-4" />
          Page 2: About Slideshow
        </button>
      </div>

      {/* Grid Header Actions */}
      <div className="flex justify-between items-center bg-card border border-border/80 px-6 py-4 rounded-xl shadow-sm">
        <span className="text-sm font-semibold text-secondary">
          Active Slides ({currentSlides.length} / 10)
        </span>
        {currentSlides.length < 10 && (
          <ImageUploadButton
            onFileSelected={setCropSrc}
            label={busyId === "add" ? "Saving..." : "Upload New Slide"}
            className={busyId !== null ? "pointer-events-none opacity-40" : ""}
          />
        )}
      </div>

      {/* Selection / Bulk Actions Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-muted/50 border border-border p-4 rounded-xl animate-in fade-in duration-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="select-all-slides"
            checked={currentSlides.length > 0 && allSelected}
            onChange={toggleSelectAll}
            disabled={busyId !== null}
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="select-all-slides" className="text-xs font-semibold text-secondary select-none cursor-pointer">
            Select All Displayed ({currentSlides.length})
          </label>
          {selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds([])}
              disabled={busyId !== null}
              className="text-xs text-primary hover:underline font-bold ml-2"
            >
              Unselect All ({selectedIds.length})
            </button>
          )}
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={busyId !== null}
            className="flex items-center gap-1.5 bg-destructive hover:bg-destructive/95 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all hover:scale-[1.02] shadow-md shadow-destructive/10"
          >
            {busyId === "bulk_remove" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                Remove Selected ({selectedIds.length})
              </>
            )}
          </button>
        )}
      </div>

      {/* Grid of Active Slides */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentSlides.map((slide, i) => (
          <div key={slide.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-primary/30 transition-all flex flex-col group animate-in zoom-in-95 duration-200">
            <div className="relative aspect-square bg-muted">
              {/* Card Checkbox Overlay */}
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur p-1.5 rounded-lg border border-border flex items-center justify-center shadow">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(slide.id)}
                  onChange={() => {
                    setSelectedIds(prev =>
                      prev.includes(slide.id)
                        ? prev.filter(id => id !== slide.id)
                        : [...prev, slide.id]
                    )
                  }}
                  disabled={busyId !== null}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              <Image
                src={slide.url}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-md">
                Slide {i + 1}
              </span>
            </div>
            <div className="p-3 border-t border-border flex items-center justify-between gap-2 bg-muted/20">
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={i === 0 || busyId !== null}
                  onClick={() => moveSlide(i, "up")}
                  className="p-1.5 rounded-lg border border-border bg-white text-secondary hover:text-primary disabled:opacity-40 transition-colors"
                >
                  {busyId === "move_up_" + slide.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ArrowUp className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  disabled={i === currentSlides.length - 1 || busyId !== null}
                  onClick={() => moveSlide(i, "down")}
                  className="p-1.5 rounded-lg border border-border bg-white text-secondary hover:text-primary disabled:opacity-40 transition-colors"
                >
                  {busyId === "move_down_" + slide.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <button
                type="button"
                disabled={busyId !== null}
                onClick={() => handleDeleteSlide(slide.id)}
                className="p-1.5 rounded-lg border border-border bg-white text-secondary hover:text-destructive hover:border-destructive/30 transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                {busyId === "remove_" + slide.id ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-destructive shrink-0" />
                    <span className="text-[10px] font-bold text-destructive">Removing...</span>
                  </>
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {currentSlides.length === 0 && (
          <div className="col-span-full text-center py-20 bg-card border-2 border-dashed border-border rounded-2xl">
            <Plus className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-semibold text-muted-foreground">No slides added yet</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Upload a photo to get started.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleSave}
          disabled={busyId !== null || saving}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Mandatory 1:1 Image Cropper */}
      {cropSrc && (
        <AdminImageCropper
          imageSrc={cropSrc}
          title={activeTab === "hero" ? "Crop Page 1 Hero Slide" : "Crop Page 2 About Slide"}
          onSave={handleAddSlide}
          onCancel={() => setCropSrc(null)}
        />
      )}
    </div>
  )
}
