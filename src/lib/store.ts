import { supabase } from "./supabase"

// ─────────────────────────────────────────────────────────────────────────────
//  HealthSync Data Store (Supabase Postgres Version)
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  email?: string
  password?: string
}

export interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  brochure?: string
}

export interface Job {
  id: string
  title: string
  location: string
  type: "Full-time" | "Part-time"
  postedDate: string
  shortDescription: string
  longDescription: string
}

export interface HospitalClient {
  id: string
  name: string
  type: "government" | "private"
}

export const PRODUCT_CATEGORIES = [
  "Medical Equipment",
  "Laboratory Equipment",
  "Consumables | Medical Supplies",
  "Accessories | Medical Supplies",
  "Packaging Solutions",
]

// ─── Team ─────────────────────────────────────────────────────────────────────
export async function getTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase.from('team').select('*').order('created_at', { ascending: true })
  if (error) { console.error("Error fetching team:", error); return [] }
  return data as TeamMember[]
}
export async function addTeamMember(m: Omit<TeamMember,"id">): Promise<TeamMember | null> {
  const { data, error } = await supabase.from('team').insert([m]).select().single()
  if (error) { console.error("Error adding team member:", error); return null }
  return data as TeamMember
}
export async function updateTeamMember(m: TeamMember): Promise<boolean> {
  const { id, ...rest } = m
  const { error } = await supabase.from('team').update(rest).eq('id', id)
  if (error) { console.error("Error updating team member:", error); return false }
  return true
}
export async function deleteTeamMember(id: string): Promise<boolean> {
  const { error } = await supabase.from('team').delete().eq('id', id)
  if (error) { console.error("Error deleting team member:", error); return false }
  return true
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true })
  if (error) { console.error("Error fetching products:", error); return [] }
  return data as Product[]
}
export async function addProduct(p: Omit<Product,"id">): Promise<Product | null> {
  const { data, error } = await supabase.from('products').insert([p]).select().single()
  if (error) { console.error("Error adding product:", error); return null }
  return data as Product
}
export async function updateProduct(p: Product): Promise<boolean> {
  const { id, ...rest } = p
  const { error } = await supabase.from('products').update(rest).eq('id', id)
  if (error) { console.error("Error updating product:", error); return false }
  return true
}
export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) { console.error("Error deleting product:", error); return false }
  return true
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: true })
  if (error) { console.error("Error fetching jobs:", error); return [] }
  return data as Job[]
}
export async function addJob(j: Omit<Job,"id">): Promise<Job | null> {
  const { data, error } = await supabase.from('jobs').insert([j]).select().single()
  if (error) { console.error("Error adding job:", error); return null }
  return data as Job
}
export async function updateJob(j: Job): Promise<boolean> {
  const { id, ...rest } = j
  const { error } = await supabase.from('jobs').update(rest).eq('id', id)
  if (error) { console.error("Error updating job:", error); return false }
  return true
}
export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) { console.error("Error deleting job:", error); return false }
  return true
}

// ─── Clients ──────────────────────────────────────────────────────────────────
export async function getClients(): Promise<HospitalClient[]> {
  const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: true })
  if (error) { console.error("Error fetching clients:", error); return [] }
  return data as HospitalClient[]
}
export async function addClient(c: Omit<HospitalClient,"id">): Promise<HospitalClient | null> {
  const { data, error } = await supabase.from('clients').insert([c]).select().single()
  if (error) { console.error("Error adding client:", error); return null }
  return data as HospitalClient
}
export async function updateClient(c: HospitalClient): Promise<boolean> {
  const { id, ...rest } = c
  const { error } = await supabase.from('clients').update(rest).eq('id', id)
  if (error) { console.error("Error updating client:", error); return false }
  return true
}
export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) { console.error("Error deleting client:", error); return false }
  return true
}
