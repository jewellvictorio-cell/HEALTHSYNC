// ─────────────────────────────────────────────────────────────────────────────
//  HealthSync Data Store
//  All data is stored in localStorage, seeded with the original hardcoded data.
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string // URL or base64
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
  logo?: string
}

// ─── Seed data (original hardcoded values) ───────────────────────────────────

const SEED_TEAM: TeamMember[] = [
  { id: "t1", name: "Renz Marlon Buban",   role: "President",               photo: `https://picsum.photos/seed/RenzMarlonBuban/400/400` },
  { id: "t2", name: "Riena Mae Buban",     role: "Corporate Secretary",     photo: `https://picsum.photos/seed/RienaMaeBuban/400/400` },
  { id: "t3", name: "John Michael Siochi", role: "Chief Finance Officer",   photo: `https://picsum.photos/seed/JohnMichaelSiochi/400/400` },
  { id: "t4", name: "Jobelle Velasquez",   role: "Finance Analyst",         photo: `https://picsum.photos/seed/JobelleVelasquez/400/400` },
  { id: "t5", name: "Donmark Capispisan",  role: "Technical Coordinator",   photo: `https://picsum.photos/seed/DonmarkCapispisan/400/400` },
  { id: "t6", name: "Marwinn Vicente",     role: "Sales Coordinator",       photo: `https://picsum.photos/seed/MarwinnVicente/400/400` },
]

const SEED_PRODUCTS: Product[] = [
  ...["Anesthesia Machine","Anesthesia Vaporizer","Aspirator","Autoclave Machine","CPAP/BiPAP","Defibrillator","ECG Machine","Electrosurgical Unit","Fetal Monitor","Infusion Device","Nebulizer","Oxygen Concentrator","Patient Monitor","Patient Scale","Pulse Oximeter","Radiant Warmer","Ventilator Machine"].map((name,i)=>({ id:`me-${i}`, name, category:"Medical Equipment", description:`High-quality ${name} designed for professional clinical use and precision diagnostics.`, image:`https://picsum.photos/seed/me${i}/400/300` })),
  ...["Centrifuge","Freezer","Incubator","Lab Oven","Lab Refrigerator","Microscope","Pipette","pH Meter","Thermohygrometer","Water Bath"].map((name,i)=>({ id:`le-${i}`, name, category:"Laboratory Equipment", description:`Precision ${name} for clinical laboratories and research institutions.`, image:`https://picsum.photos/seed/le${i}/400/300` })),
  ...["Anesthesia Breathing Circuit","Bacterial Filter","BP Cuff, Dual Tube (Disposable)","BP Cuff, Single Tube (Disposable)","Bubble Humidifier","Closed Suction Catheter","EtCO₂ Water Trap","FHME","Flex Tube","Full Face Mask (CPAP, BiPAP)","Gas Sampling Line","High Flow Consumables","Humidification Chamber","Incentive Spirometer","Nasal Cannula","NIV Face Mask","Peak Flowmeter","Ventilator Breathing Circuit, Dual Limb","Ventilator Breathing Circuit, Single Limb"].map((name,i)=>({ id:`ms-c-${i}`, name, category:"Consumables | Medical Supplies", description:`Essential ${name} for respiratory therapy and patient care.`, image:`https://picsum.photos/seed/msc${i}/400/300` })),
  ...["BP Bulb","BP Cuff, Dual Tube (Reusable)","BP Cuff, Dual Tube (Disposable)","ECG Leads (3, 5, 12 Leads)","Flow Sensor, Ventilator","High-Pressure Regulator, Compressed Air","High-Pressure Regulator, Oxygen","NIBP Hose, Coiled","NIBP Hose, Dual Tube","NIBP Hose, Single Tube","Oxygen Flowmeter, 15 LPM","Oxygen Flowmeter, 70 LPM","Oxygen/Air Blender","SpO₂ Sensor","SpO₂ Trunk Cable","Temperature Probe"].map((name,i)=>({ id:`ms-a-${i}`, name, category:"Accessories | Medical Supplies", description:`Durable ${name} compatible with various medical monitor systems.`, image:`https://picsum.photos/seed/msa${i}/400/300` })),
  { id:"pkg-1", name:"Standard Packaging",       category:"Packaging Solutions", description:"Secure and reliable packaging for everyday products.", image:"https://picsum.photos/seed/pkg1/400/300" },
  { id:"pkg-2", name:"Foam Protection Packaging", category:"Packaging Solutions", description:"Enhanced protection with high-quality foam for delicate equipment.", image:"https://picsum.photos/seed/pkg2/400/300" },
  { id:"pkg-3", name:"Wooden Crate Packaging",    category:"Packaging Solutions", description:"Heavy-duty wooden crates for maximum safety of valuable equipment.", image:"https://picsum.photos/seed/pkg3/400/300" },
  { id:"pkg-4", name:"Export Grade Packaging",    category:"Packaging Solutions", description:"ISPM-15 compliant packaging for safe and secure international shipping.", image:"https://picsum.photos/seed/pkg4/400/300" },
]

const SEED_JOBS: Job[] = [
  { id:"j1", title:"Biomedical Technician",  location:"Binangonan, Rizal", type:"Full-time", postedDate:"2025-06-01", shortDescription:"Responsible for maintenance and calibration of hospital equipment.", longDescription:"The Biomedical Technician is responsible for the installation, maintenance, calibration, and repair of biomedical equipment used in hospitals and healthcare facilities. The role requires a deep understanding of electrical and mechanical systems, as well as the ability to troubleshoot complex medical devices.\n\nKey Responsibilities:\n• Perform routine preventive maintenance on all biomedical equipment\n• Conduct calibration of instruments to ensure accuracy and compliance\n• Coordinate with medical staff for equipment training and support\n• Maintain detailed records of equipment service history\n\nQualifications:\n• BS Biomedical Engineering or equivalent degree\n• At least 1 year of relevant experience preferred\n• Strong analytical and problem-solving skills" },
  { id:"j2", title:"Sales Representative",    location:"Binangonan, Rizal", type:"Full-time", postedDate:"2025-06-01", shortDescription:"Grow our network of partner hospitals and clinics.", longDescription:"The Sales Representative is tasked with expanding HealthSync's reach by developing relationships with hospitals, clinics, and healthcare institutions. This role involves presenting our product catalog, negotiating contracts, and ensuring client satisfaction.\n\nKey Responsibilities:\n• Identify and pursue new business opportunities in the healthcare sector\n• Present and demonstrate HealthSync products to medical professionals\n• Prepare and submit sales proposals and quotations\n• Achieve monthly and quarterly sales targets\n\nQualifications:\n• Experience in medical or pharmaceutical sales is strongly preferred\n• Excellent communication and interpersonal skills\n• Willingness to travel within the assigned territory\n• Bachelor's degree in any business-related course" },
  { id:"j3", title:"Product Specialist",      location:"Binangonan, Rizal", type:"Full-time", postedDate:"2025-06-05", shortDescription:"Provide clinical training for lab and imaging equipment.", longDescription:"The Product Specialist serves as a technical expert for HealthSync's medical devices, providing clinical training and product support to healthcare professionals.\n\nKey Responsibilities:\n• Conduct product demonstrations and in-service training sessions\n• Provide technical support to customers post-sale\n• Collaborate with the sales team to address product-related queries\n• Stay updated on the latest developments in medical technology\n\nQualifications:\n• Medical background (Registered Nurse or Medical Technologist) is a strong advantage\n• Ability to clearly explain technical concepts to non-technical audiences\n• Strong customer service orientation" },
  { id:"j4", title:"HR Officer",              location:"Binangonan, Rizal", type:"Full-time", postedDate:"2025-06-08", shortDescription:"Manage talent acquisition and employee relations.", longDescription:"The HR Officer handles all aspects of human resources management, from recruitment and onboarding to employee welfare and compliance.\n\nKey Responsibilities:\n• Manage end-to-end recruitment processes\n• Administer employee benefits, leave, and payroll coordination\n• Develop and implement HR policies in compliance with labor laws\n• Foster a positive workplace culture and handle employee concerns\n\nQualifications:\n• Degree in Human Resources, Psychology, or a related field\n• Knowledge of Philippine labor laws and regulations\n• At least 1–2 years of HR experience" },
]

const SEED_CLIENTS: HospitalClient[] = [
  { id:"g1", name:"Antipolo City Hospital System",                        type:"government", logo: "https://picsum.photos/seed/g1/300/300" },
  { id:"g2", name:"President Ramon Magsaysay Memorial Hospital",          type:"government", logo: "https://picsum.photos/seed/g2/300/300" },
  { id:"g3", name:"Quirino Memorial Medical Center",                      type:"government", logo: "https://picsum.photos/seed/g3/300/300" },
  { id:"g4", name:"Amang Rodriguez Memorial Hospital",                   type:"government", logo: "https://picsum.photos/seed/g4/300/300" },
  { id:"g5", name:"San Marcelino District Hospital",                      type:"government", logo: "https://picsum.photos/seed/g5/300/300" },
  { id:"g6", name:"Doctor Florentino C. Doble Memorial Hospital",         type:"government", logo: "https://picsum.photos/seed/g6/300/300" },
  { id:"p1", name:"Binangonan Lakeview Hospital",                         type:"private",    logo: "https://picsum.photos/seed/p1/300/300" },
  { id:"p2", name:"Lorma Medical Center",                                 type:"private",    logo: "https://picsum.photos/seed/p2/300/300" },
  { id:"p3", name:"Pag-asa Hospital",                                     type:"private",    logo: "https://picsum.photos/seed/p3/300/300" },
  { id:"p4", name:"San Isidro Hospital",                                  type:"private",    logo: "https://picsum.photos/seed/p4/300/300" },
  { id:"p5", name:"San Lorenzo Hospital Health Management Co., Inc.",     type:"private",    logo: "https://picsum.photos/seed/p5/300/300" },
  { id:"p6", name:"Bermudez Polymedic Hospital",                          type:"private",    logo: "https://picsum.photos/seed/p6/300/300" },
  { id:"p7", name:"Catanduanes Doctors Hospital",                         type:"private",    logo: "https://picsum.photos/seed/p7/300/300" },
]

export interface FooterSettings {
  address: string
  phones: string[]
  emails: string[]
  /** @deprecated kept for migration only */ phone?: string
  /** @deprecated kept for migration only */ email?: string
}

const SEED_FOOTER: FooterSettings = {
  address: "Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines",
  phones: ["+63 915 392 5794"],
  emails: ["healthsync.med@gmail.com"],
}

export interface SlideshowImage {
  id: string
  url: string
}

const SEED_SLIDESHOW: SlideshowImage[] = [
  { id: "s1", url: "/images/hero-medical.png" },
  { id: "s2", url: "/images/about_hero_medical.png" },
  { id: "s3", url: "/images/about-team.png" },
]

const SEED_SLIDESHOW2: SlideshowImage[] = [
  { id: "s2_1", url: "/images/about-team.png" },
  { id: "s2_2", url: "/images/about_hero_medical.png" },
  { id: "s2_3", url: "/images/hero-medical.png" },
]

// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEYS = {
  team:       "hs_team",
  products:   "hs_products",
  jobs:       "hs_jobs",
  clients:    "hs_clients",
  footer:     "hs_footer",
  slideshow:  "hs_slideshow",
  slideshow2: "hs_slideshow2",
  seeded:     "hs_seeded",
}

// ─── Firebase Integration ───────────────────────────────────────────────────────
import { db } from "./firebase"
import { collection, doc, setDoc, getDocs, deleteDoc, getDoc, writeBatch } from "firebase/firestore"
import { uploadBase64File } from "./supabase"

async function uploadIfBase64(value: string | undefined, path: string): Promise<string | undefined> {
  if (!value) return value
  if (value.startsWith("data:")) {
    return await uploadBase64File(value, path)
  }
  return value
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2) }

export function markHydrated() {
  // No-op for Firebase since we don't need hydration for localStorage
}

export const PRODUCT_CATEGORIES = [
  "Medical Equipment",
  "Biomedical Equipment",
  "Laboratory Equipment",
  "Consumables | Medical Supplies",
  "Accessories | Medical Supplies",
  "Packaging Solutions",
]

export async function ensureSeeded() {
  if (typeof window === "undefined") return
  try {
    const metaRef = doc(db, "settings", "_meta")
    const metaSnap = await getDoc(metaRef)
    if (!metaSnap.exists() || !metaSnap.data().seeded) {
      console.log("Seeding database...")
      const batch = writeBatch(db)
      
      SEED_TEAM.forEach(t => batch.set(doc(db, "team", t.id), t))
      SEED_PRODUCTS.forEach(p => batch.set(doc(db, "products", p.id), p))
      SEED_JOBS.forEach(j => batch.set(doc(db, "jobs", j.id), j))
      SEED_CLIENTS.forEach(c => batch.set(doc(db, "clients", c.id), c))
      
      batch.set(doc(db, "settings", "footer"), SEED_FOOTER)
      batch.set(doc(db, "settings", "slideshow"), { items: SEED_SLIDESHOW })
      batch.set(doc(db, "settings", "slideshow2"), { items: SEED_SLIDESHOW2 })
      
      batch.set(metaRef, { seeded: true })
      
      await batch.commit()
      console.log("Seeding complete.")
    }
  } catch (err) {
    console.error("Error ensuring seeded data:", err)
  }
}

// ─── Team ─────────────────────────────────────────────────────────────────────
export async function addTeamMember(m: Omit<TeamMember,"id">): Promise<TeamMember | null> {
  try {
    const photoUrl = await uploadIfBase64(m.photo, "team")
    const newMember: TeamMember = { ...m, id: uid(), photo: photoUrl || m.photo }
    await setDoc(doc(db, "team", newMember.id), newMember)
    return newMember
  } catch (e) { console.error(e); return null }
}
export async function updateTeamMember(m: TeamMember): Promise<boolean> {
  try {
    const photoUrl = await uploadIfBase64(m.photo, "team")
    const updated = { ...m, photo: photoUrl || m.photo }
    await setDoc(doc(db, "team", m.id), updated)
    return true
  } catch (e) { console.error(e); return false }
}
export async function deleteTeamMember(id: string): Promise<boolean> {
  try { await deleteDoc(doc(db, "team", id)); return true } catch (e) { console.error(e); return false }
}
export async function saveTeam(team: TeamMember[]): Promise<boolean> {
  try {
    const snap = await getDocs(collection(db, "team"))
    const existingIds = snap.docs.map(d => d.id)
    const newIds = team.map(t => t.id)
    const toDelete = existingIds.filter(id => !newIds.includes(id))
    
    const batch = writeBatch(db)
    toDelete.forEach(id => batch.delete(doc(db, "team", id)))
    team.forEach(t => batch.set(doc(db, "team", t.id), t))
    await batch.commit()
    return true
  } catch (e) { console.error(e); return false }
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function addProduct(p: Omit<Product,"id">): Promise<Product | null> {
  try {
    const imageUrl = await uploadIfBase64(p.image, "products")
    const brochureUrl = await uploadIfBase64(p.brochure, "brochures")
    const newProduct: Product = { ...p, id: uid(), image: imageUrl || p.image, brochure: brochureUrl || p.brochure }
    await setDoc(doc(db, "products", newProduct.id), newProduct)
    return newProduct
  } catch (e) { console.error(e); return null }
}
export async function updateProduct(p: Product): Promise<boolean> {
  try {
    const imageUrl = await uploadIfBase64(p.image, "products")
    const brochureUrl = await uploadIfBase64(p.brochure, "brochures")
    const updated = { ...p, image: imageUrl || p.image, brochure: brochureUrl || p.brochure }
    await setDoc(doc(db, "products", p.id), updated)
    return true
  } catch (e) { console.error(e); return false }
}
export async function deleteProduct(id: string): Promise<boolean> {
  try { await deleteDoc(doc(db, "products", id)); return true } catch (e) { console.error(e); return false }
}
export async function saveProducts(products: Product[]): Promise<boolean> {
  try {
    const snap = await getDocs(collection(db, "products"))
    const existingIds = snap.docs.map(d => d.id)
    const newIds = products.map(p => p.id)
    const toDelete = existingIds.filter(id => !newIds.includes(id))
    
    const batch = writeBatch(db)
    toDelete.forEach(id => batch.delete(doc(db, "products", id)))
    products.forEach(p => batch.set(doc(db, "products", p.id), p))
    await batch.commit()
    return true
  } catch (e) { console.error(e); return false }
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export async function addJob(j: Omit<Job, "id">): Promise<Job | null> {
  try {
    const newJob: Job = { ...j, id: uid() }
    await setDoc(doc(db, "jobs", newJob.id), newJob)
    return newJob
  } catch (e) { console.error(e); return null }
}
export async function updateJob(j: Job): Promise<boolean> {
  try { await setDoc(doc(db, "jobs", j.id), j); return true } catch (e) { console.error(e); return false }
}
export async function deleteJob(id: string): Promise<boolean> {
  try { await deleteDoc(doc(db, "jobs", id)); return true } catch (e) { console.error(e); return false }
}
export async function saveJobs(jobs: Job[]): Promise<boolean> {
  try {
    const snap = await getDocs(collection(db, "jobs"))
    const existingIds = snap.docs.map(d => d.id)
    const newIds = jobs.map(j => j.id)
    const toDelete = existingIds.filter(id => !newIds.includes(id))
    
    const batch = writeBatch(db)
    toDelete.forEach(id => batch.delete(doc(db, "jobs", id)))
    jobs.forEach(j => batch.set(doc(db, "jobs", j.id), j))
    await batch.commit()
    return true
  } catch (e) { console.error(e); return false }
}

// ─── Clients ──────────────────────────────────────────────────────────────────
export async function addClient(c: Omit<HospitalClient, "id">): Promise<HospitalClient | null> {
  try {
    const logoUrl = await uploadIfBase64(c.logo, "clients")
    const newClient: HospitalClient = { ...c, id: uid(), logo: logoUrl || c.logo }
    await setDoc(doc(db, "clients", newClient.id), newClient)
    return newClient
  } catch (e) { console.error(e); return null }
}
export async function updateClient(c: HospitalClient): Promise<boolean> {
  try {
    const logoUrl = await uploadIfBase64(c.logo, "clients")
    const updated = { ...c, logo: logoUrl || c.logo }
    await setDoc(doc(db, "clients", c.id), updated)
    return true
  } catch (e) { console.error(e); return false }
}
export async function deleteClient(id: string): Promise<boolean> {
  try { await deleteDoc(doc(db, "clients", id)); return true } catch (e) { console.error(e); return false }
}
export async function saveClients(clients: HospitalClient[]): Promise<boolean> {
  try {
    const snap = await getDocs(collection(db, "clients"))
    const existingIds = snap.docs.map(d => d.id)
    const newIds = clients.map(c => c.id)
    const toDelete = existingIds.filter(id => !newIds.includes(id))
    
    const batch = writeBatch(db)
    toDelete.forEach(id => batch.delete(doc(db, "clients", id)))
    clients.forEach(c => batch.set(doc(db, "clients", c.id), c))
    await batch.commit()
    return true
  } catch (e) { console.error(e); return false }
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export async function saveFooterSettings(data: FooterSettings): Promise<boolean> {
  try { await setDoc(doc(db, "settings", "footer"), data); return true } catch (e) { console.error(e); return false }
}

export async function saveSlideshow(data: SlideshowImage[]): Promise<boolean> {
  try {
    const items = await Promise.all(data.map(async (s) => ({
      id: s.id,
      url: (await uploadIfBase64(s.url, "slideshow")) || s.url
    })))
    await setDoc(doc(db, "settings", "slideshow"), { items })
    return true
  } catch (e) { console.error(e); return false }
}

export async function saveSlideshow2(data: SlideshowImage[]): Promise<boolean> {
  try {
    const items = await Promise.all(data.map(async (s) => ({
      id: s.id,
      url: (await uploadIfBase64(s.url, "slideshow2")) || s.url
    })))
    await setDoc(doc(db, "settings", "slideshow2"), { items })
    return true
  } catch (e) { console.error(e); return false }
}



