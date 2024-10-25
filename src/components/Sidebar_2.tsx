import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, DollarSign, Home, PiggyBank, Send, Users } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  className?: string
}

export default function Sidebar({ activeTab, setActiveTab, className = "" }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", value: "dashboard" },
    { icon: Users, label: "Beneficiaries", value: "beneficiaries" },
    { icon: Send, label: "Payments", value: "payments" },
    { icon: PiggyBank, label: "Investments", value: "investments" },
    { icon: CreditCard, label: "Contact", value: "contact" },
    { icon: DollarSign, label: "App Info", value: "app-info" },
  ]

  return (
    <div className={`pb-12 w-64 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.value)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}