import { Home, CreditCard, DollarSign, PieChart, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Sidebar({ activeTab, setActiveTab, className = "" }: { activeTab: string, setActiveTab: (tab: string) => void, className?: string }) {
  const NavItem = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <Button
      variant={activeTab === label.toLowerCase() ? 'secondary' : 'ghost'}
      className="w-full justify-start"
      onClick={() => setActiveTab(label.toLowerCase())}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )

  return (
    <aside className={`w-64 bg-white p-6 shadow-md ${className}`}>
      <nav className="space-y-2">
        <NavItem icon={Home} label="Dashboard" />
        <NavItem icon={CreditCard} label="Accounts" />
        <NavItem icon={DollarSign} label="Payments" />
        <NavItem icon={PieChart} label="Investments" />
        <NavItem icon={Phone} label="Contact" />
      </nav>
    </aside>
  )
}