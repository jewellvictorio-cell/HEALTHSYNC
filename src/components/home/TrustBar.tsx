import { ShieldCheck, Award, Users, Package, Clock } from "lucide-react"

const trustItems = [
  {
    icon: ShieldCheck,
    value: "DOH",
    label: "Accredited Supplier",
  },
  {
    icon: Award,
    value: "ISO 9001",
    label: "Quality Certified",
  },
  {
    icon: Clock,
    value: "15+ Years",
    label: "Industry Experience",
  },
  {
    icon: Users,
    value: "500+",
    label: "Satisfied Clients",
  },
  {
    icon: Package,
    value: "1,000+",
    label: "Products in Catalog",
  },
]

export function TrustBar() {
  return (
    <section className="border-y border-border bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 lg:gap-x-16">
          {trustItems.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 group animate-in fade-in duration-500"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary transition-colors duration-300">
                <Icon className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-secondary">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
