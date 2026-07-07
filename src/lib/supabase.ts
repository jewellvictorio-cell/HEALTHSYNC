import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "healthsync_images"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Uploads a base64 encoded file (image, PDF, etc.) to Supabase Storage.
 * Returns the public URL of the uploaded file.
 * If the input is already a URL, it returns it immediately (no re-upload).
 */
export async function uploadBase64File(base64Str: string, path: string): Promise<string> {
  // If it's already a URL, return it immediately — no upload needed
  if (base64Str.startsWith("http")) {
    return base64Str
  }

  // Not a data: URI either — nothing to upload
  if (!base64Str.startsWith("data:")) {
    return base64Str
  }

  // Parse the data URI
  // Format: "data:image/jpeg;base64,/9j/4AAQ..." or "data:application/pdf;base64,..."
  const matches = base64Str.match(/^data:([A-Za-z-+./]+);base64,(.+)$/)
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 data URI")
  }

  const contentType = matches[1]
  const base64Data = matches[2]

  // Convert base64 to Blob for browser compatibility
  const byteString = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const int8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([int8Array], { type: contentType })

  // Derive file extension from content type
  const extMap: Record<string, string> = {
    "application/pdf": "pdf",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  }
  const ext = extMap[contentType] || contentType.split("/")[1] || "bin"
  const fileName = `${path}_${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, blob, {
      contentType,
      upsert: true,
    })

  if (error) {
    console.error("Supabase upload error:", error)
    throw error
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

// Backward-compatible alias
export const uploadBase64Image = uploadBase64File
