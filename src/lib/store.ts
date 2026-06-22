// ─────────────────────────────────────────────────────────────────────────────
//  HealthSync Data Store
//  All data is stored in localStorage, seeded with the original hardcoded data.
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string // URL or base64
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
  { id:"g1", name:"Antipolo City Hospital System",                        type:"government" },
  { id:"g2", name:"President Ramon Magsaysay Memorial Hospital",          type:"government" },
  { id:"g3", name:"Quirino Memorial Medical Center",                      type:"government" },
  { id:"g4", name:"Amang Rodriguez Memorial Hospital",                   type:"government" },
  { id:"g5", name:"San Marcelino District Hospital",                      type:"government" },
  { id:"g6", name:"Doctor Florentino C. Doble Memorial Hospital",         type:"government" },
  { id:"p1", name:"Binangonan Lakeview Hospital",                         type:"private" },
  { id:"p2", name:"Lorma Medical Center",                                 type:"private" },
  { id:"p3", name:"Pag-asa Hospital",                                     type:"private" },
  { id:"p4", name:"San Isidro Hospital",                                  type:"private" },
  { id:"p5", name:"San Lorenzo Hospital Health Management Co., Inc.",     type:"private" },
  { id:"p6", name:"Bermudez Polymedic Hospital",                          type:"private" },
  { id:"p7", name:"Catanduanes Doctors Hospital",                         type:"private" },
]

// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEYS = {
  team:     "hs_team",
  products: "hs_products",
  jobs:     "hs_jobs",
  clients:  "hs_clients",
  seeded:   "hs_seeded",
}

function isBrowser() { return typeof window !== "undefined" }

function seed() {
  if (!isBrowser()) return
  if (localStorage.getItem(KEYS.seeded)) return
  localStorage.setItem(KEYS.team,     JSON.stringify(SEED_TEAM))
  localStorage.setItem(KEYS.products, JSON.stringify(SEED_PRODUCTS))
  localStorage.setItem(KEYS.jobs,     JSON.stringify(SEED_JOBS))
  localStorage.setItem(KEYS.clients,  JSON.stringify(SEED_CLIENTS))
  localStorage.setItem(KEYS.seeded,   "1")
}

// ─── Generic helpers ──────────────────────────────────────────────────────────
function getList<T>(key: string, fallback: T[]): T[] {
  seed()
  if (!isBrowser()) return fallback
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback } catch { return fallback }
}

function saveList<T>(key: string, data: T[]): boolean {
  if (!isBrowser()) return false
  try {
    localStorage.setItem(key, JSON.stringify(data))
    // Notify all same-tab listeners (useStore hooks) to re-render immediately
    window.dispatchEvent(new Event("hs_store_updated"))
    return true
  } catch (e: any) {
    console.error("Storage Error:", e)
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert("⚠️ Storage limit exceeded!\n\nThe file (image or PDF) you uploaded is too large. Since this is a local demo, browser storage is limited to ~5MB total. Please use a smaller file or compress your PDF.")
    } else {
      alert("An error occurred while saving: " + e.message)
    }
    return false
  }
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2) }

// ─── Team ─────────────────────────────────────────────────────────────────────
export function getTeam():                       TeamMember[] { return getList(KEYS.team, SEED_TEAM) }
export function saveTeam(data: TeamMember[]):    boolean      { return saveList(KEYS.team, data) }
export function addTeamMember(m: Omit<TeamMember,"id">):    TeamMember | null { const n={...m,id:uid()}; return saveTeam([...getTeam(),n]) ? n : null }
export function updateTeamMember(m: TeamMember): boolean      { return saveTeam(getTeam().map(x=>x.id===m.id?m:x)) }
export function deleteTeamMember(id: string):    boolean      { return saveTeam(getTeam().filter(x=>x.id!==id)) }

// ─── Products ─────────────────────────────────────────────────────────────────
export function getProducts():                   Product[]    { return getList(KEYS.products, SEED_PRODUCTS) }
export function saveProducts(data: Product[]):   boolean      { return saveList(KEYS.products, data) }
export function addProduct(p: Omit<Product,"id">):   Product | null { const n={...p,id:uid()}; return saveProducts([...getProducts(),n]) ? n : null }
export function updateProduct(p: Product):       boolean      { return saveProducts(getProducts().map(x=>x.id===p.id?p:x)) }
export function deleteProduct(id: string):       boolean      { return saveProducts(getProducts().filter(x=>x.id!==id)) }

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export function getJobs():                       Job[]        { return getList(KEYS.jobs, SEED_JOBS) }
export function saveJobs(data: Job[]):           boolean      { return saveList(KEYS.jobs, data) }
export function addJob(j: Omit<Job,"id">):           Job | null   { const n={...j,id:uid()}; return saveJobs([...getJobs(),n]) ? n : null }
export function updateJob(j: Job):               boolean      { return saveJobs(getJobs().map(x=>x.id===j.id?j:x)) }
export function deleteJob(id: string):           boolean      { return saveJobs(getJobs().filter(x=>x.id!==id)) }

// ─── Clients ──────────────────────────────────────────────────────────────────
export function getClients():                       HospitalClient[] { return getList(KEYS.clients, SEED_CLIENTS) }
export function saveClients(data: HospitalClient[]): boolean         { return saveList(KEYS.clients, data) }
export function addClient(c: Omit<HospitalClient,"id">): HospitalClient | null { const n={...c,id:uid()}; return saveClients([...getClients(),n]) ? n : null }
export function updateClient(c: HospitalClient):    boolean         { return saveClients(getClients().map(x=>x.id===c.id?c:x)) }
export function deleteClient(id: string):           boolean         { return saveClients(getClients().filter(x=>x.id!==id)) }

export const PRODUCT_CATEGORIES = [
  "Medical Equipment",
  "Laboratory Equipment",
  "Consumables | Medical Supplies",
  "Accessories | Medical Supplies",
  "Packaging Solutions",
]
