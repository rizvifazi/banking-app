import { useState, useEffect } from 'react'
import { Bell, CreditCard, DollarSign, Home, LogOut, Menu, PieChart, User, Phone, Mail, MessageSquare, Facebook, Twitter, Instagram, CreditCardIcon, HelpCircle, Lock, Check, Info, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function PersonalBankingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileTab, setProfileTab] = useState('summary')
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showTermsOfService, setShowTermsOfService] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [chartPeriod, setChartPeriod] = useState('week')
  const [chartAccount, setChartAccount] = useState('checking')

  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -85.20, date: '2023-04-15', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Supermarket', modeOfTransaction: 'Card Payment' },
    { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2023-04-14', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
    { id: 3, description: 'Electric Bill', amount: -120.50, date: '2023-04-13', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Electric Company', modeOfTransaction: 'Online Transfer' },
    { id: 4, description: 'Online Shopping', amount: -65.99, date: '2023-04-12', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Online Retailer', modeOfTransaction: 'Card Payment' },
  ])

  const [userProfile, setUserProfile] = useState({
    fullName: 'John Doe',
    primaryEmail: 'john.doe@example.com',
    secondaryEmail: 'johnd@work.com',
    phone: '+1 (555) 123-4567',
    secondaryPhone: '+1 (555) 987-6543',
    address: '123 Main St, Anytown, USA 12345',
    adharId: '1234 5678 9012',
  })

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your account balance is low', read: false, timestamp: '2023-04-15 09:30:00', details: 'Your checking account balance has fallen below $500. Consider transferring funds to avoid overdraft fees.' },
    { id: 2, message: 'New security update available', read: false, timestamp: '2023-04-14 14:45:00', details: 'We\'ve released a new security update for our mobile app. Please update at your earliest convenience to ensure your account remains protected.' },
    { id: 3, message: 'Upcoming bill payment reminder', read: false, timestamp: '2023-04-13 11:20:00', details: 'Your monthly utility bill payment of $120.50 is due in 3 days. Ensure you have sufficient funds in your account.' },
    { id: 4, message: 'Suspicious activity detected on your account', read: false, timestamp: '2023-04-12 18:15:00', details: 'We\'ve noticed an unusual login attempt on your account. If this wasn\'t you, please contact our security team immediately.' },
    { id: 5, message: 'Your loan application has been approved', read: true, timestamp: '2023-04-11 10:00:00', details: 'Congratulations! Your loan application for $10,000 has been approved. The funds will be deposited into your account within 2-3 business days.' },
  ])

  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showNotificationDetails, setShowNotificationDetails] = useState(false)

  const generateDummyData = (period, account) => {
    const data = []
    let startValue = account === 'checking' ? 5000 : account === 'savings' ? 10000 : -1000
    const volatility = account === 'credit' ? 0.05 : 0.02
    const trend = account === 'savings' ? 0.001 : account === 'credit' ? -0.0005 : 0

    const periods = period === 'week' ? 7 : period === 'month' ? 30 : 365
    const step = period === 'week' ? 1 : period === 'month' ? 1 : 7

    for (let i = 0; i < periods; i += step) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const value = startValue * (1 + (Math.random() - 0.5) * volatility + trend * i)
      data.unshift({
        date: date.toISOString().split('T')[0],
        value: parseFloat(value.toFixed(2))
      })
      startValue = value
    }

    return data
  }

  const [chartData, setChartData] = useState(generateDummyData('week', 'checking'))

  useEffect(() => {
    setChartData(generateDummyData(chartPeriod, chartAccount))
  }, [chartPeriod, chartAccount])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedProfile = Object.fromEntries(formData.entries())
    setUserProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }))
    alert('Profile updated successfully!')
  }

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Password reset request submitted. Check your email for further instructions.')
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    )
  }

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification)
    setShowNotificationDetails(true)
  }

  useEffect(() => {
    let timer
    if (showNotificationDetails && selectedNotification) {
      timer = setTimeout(() => {
        handleMarkAsRead(selectedNotification.id)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [showNotificationDetails, selectedNotification])

  const unreadCount = notifications.filter(notification => !notification.read).length

  const renderProfileContent = () => {
    switch (profileTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            {Object.entries(userProfile).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )
      case 'edit':
        return (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {Object.entries(userProfile).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input id={key} name={key} defaultValue={value} />
              </div>
            ))}
            <Button type="submit">Save Changes</Button>
          </form>
        )
      case 'security':
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" name="newPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" name="confirmPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-1">Security Question 1</Label>
              <Select name="securityQuestion1">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">What was the name of your first pet?</SelectItem>
                  <SelectItem value="school">What elementary school did you attend?</SelectItem>
                  <SelectItem value="city">In what city were you born?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-1" name="securityAnswer1" placeholder="Your answer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-2">Security Question 2</Label>
              <Select name="securityQuestion2">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                  <SelectItem value="car">What was your first car?</SelectItem>
                  <SelectItem value="street">What street did you grow up on?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-2" name="securityAnswer2" placeholder="Your answer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-3">Security Question 3</Label>
              <Select name="securityQuestion3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">What is your favorite book?</SelectItem>
                  <SelectItem value="food">What is your favorite food?</SelectItem>
                  <SelectItem value="teacher">Who was your favorite teacher?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-3" name="securityAnswer3" placeholder="Your answer" required />
            </div>
            <Button type="submit">Reset Password</Button>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Account Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'Checking Account', balance: 5280.50 },
                { name: 'Savings Account', balance: 12750.75 },
                { name: 'Credit Card', balance: -1520.30 },
              ].map((account, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                    {account.name === 'Credit Card' ? <CreditCard className="h-4 w-4 text-muted-foreground" /> : <DollarSign className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.balance)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Balance History</CardTitle>
                <CardDescription>View your account balance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Select value={chartAccount} onValueChange={setChartAccount}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking Account</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={chartPeriod} onValueChange={setChartPeriod}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      
                      <SelectContent>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Balance",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            <h3 className="text-xl font-bold mt-6 mb-4">Recent Transactions</h3>
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Description</th>
                      <th className="text-right p-4">Amount</th>
                      <th className="text-right p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 4).map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-b-0">
                        <td className="p-4">{transaction.description}</td>
                        <td className={`text-right p-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                        </td>
                        <td className="text-right p-4">{transaction.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )
      case 'accounts':
        return <div className="text-2xl font-bold">Accounts Page</div>
      case 'payments':
        return <div className="text-2xl font-bold">Payments Page</div>
      case 'investments':
        return <div className="text-2xl font-bold">Investments Page</div>
      case 'contact':
        return <div className="text-2xl font-bold">Contact Page</div>
      case 'app-info':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>App Information</CardTitle>
                <CardDescription>Details about the Personal Banking App</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">App Name:</span>
                    <span>Personal Banking App</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Version:</span>
                    <span>1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Last Updated:</span>
                    <span>April 19, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Developer:</span>
                    <span>FinTech Solutions Inc.</span>
                  </div>
                  <div className="flex justify-between  items-center">
                    <span className="font-semibold">Contact Email:</span>
                    <span>support@personalbankingapp.com</span>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">About</h4>
                    <p className="text-sm text-gray-600">
                      The Personal Banking App is a secure and user-friendly platform designed to help you manage your finances with ease. 
                      Our app provides real-time account information, easy fund transfers, bill payments, and personalized financial insights 
                      to help you make informed decisions about your money.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Privacy Policy</h4>
                    <p className="text-sm text-gray-600">
                      We are committed to protecting your privacy and ensuring the security of your personal and financial information. 
                      To learn more about how we collect, use, and safeguard your data, please read our full Privacy Policy.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setShowPrivacyPolicy(true)}>Read Privacy Policy</Button>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Terms of Service</h4>
                    <p className="text-sm text-gray-600">
                      By using the Personal Banking App, you agree to our Terms of Service. These terms outline the rules and regulations 
                      for the use of our app and the services we provide.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setShowTermsOfService(true)}>Read Terms of Service</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <div className="text-2xl font-bold">Page not found</div>
    }
  }

  const NavItem = ({ icon: Icon, label }) => (
    <Button
      variant={activeTab === label.toLowerCase().replace(/\s+/g, '-') ? 'secondary' : 'ghost'}
      className="w-full justify-start"
      onClick={() => {
        setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))
        setIsSheetOpen(false)
      }}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login to Personal Banking</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
              </div>
              <Button className="w-full mt-4" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-white p-6 shadow-md lg:block">
        <nav className="space-y-2">
          <NavItem icon={Home} label="Dashboard" />
          <NavItem icon={CreditCard} label="Accounts" />
          <NavItem icon={DollarSign} label="Payments" />
          <NavItem icon={PieChart} label="Investments" />
          <NavItem icon={Phone} label="Contact" />
          <NavItem icon={Info} label="App Info" />
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Personal Banking</h1>
            <div className="flex items-center space-x-4">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <nav className="space-y-2">
                    <NavItem icon={Home} label="Dashboard" />
                    <NavItem icon={CreditCard} label="Accounts" />
                    <NavItem icon={DollarSign} label="Payments" />
                    <NavItem icon={PieChart} label="Investments" />
                    <NavItem icon={Phone} label="Contact" />
                    <NavItem icon={Info} label="App Info" />
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                  <ScrollArea className="h-[300px]">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-2 ${notification.read ? 'opacity-50' : ''} cursor-pointer hover:bg-gray-100`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm">{notification.message}</p>
                          {!notification.read && (
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification.id); }}>
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" onClick={() => setShowProfileModal(true)}>
                <User className="h-5 w-5" />
                <span className="sr-only">User profile</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              View and manage your profile information
            </DialogDescription>
          </DialogHeader>
          <Tabs value={profileTab} onValueChange={setProfileTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <div className="max-h-[60vh] overflow-y-auto pr-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Summary</CardTitle>
                    <CardDescription>Overview of your profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderProfileContent()}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="edit">
              <div className="max-h-[60vh] overflow-y-auto pr-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderProfileContent()}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="max-h-[60vh] overflow-y-auto pr-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderProfileContent()}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Notification Details Modal */}
      <Dialog open={showNotificationDetails} onOpenChange={setShowNotificationDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <p><strong>{selectedNotification.message}</strong></p>
              <p>{selectedNotification.details}</p>
              <p className="text-sm text-gray-500">{selectedNotification.timestamp}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowNotificationDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Introduction</h3>
              <p>Welcome to the Personal Banking App Privacy Policy. This policy describes how we collect, use, and protect your personal information.</p>

              <h3 className="text-lg font-semibold">2. Information We Collect</h3>
              <p>We collect various types of information, including:</p>
              <ul className="list-disc pl-5">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Financial information (Account numbers, transaction history, etc.)</li>
                <li>Device and usage information (IP address, browser type, etc.)</li>
              </ul>

              <h3 className="text-lg font-semibold">3. How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul className="list-disc pl-5">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate with you about your account and our services</li>
                <li>Detect and prevent fraud</li>
              </ul>

              <h3 className="text-lg font-semibold">4. Data Security</h3>
              <p>We implement a variety of security measures to maintain the safety of your personal information.</p>

              <h3 className="text-lg font-semibold">5. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.</p>

              <h3 className="text-lg font-semibold">6. Changes to This Policy</h3>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

              <h3 className="text-lg font-semibold">7. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@personalbankingapp.com.</p>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowPrivacyPolicy(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={showTermsOfService} onOpenChange={setShowTermsOfService}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
              <p>By accessing or using the Personal Banking App, you agree to be bound by these Terms of Service.</p>

              <h3 className="text-lg font-semibold">2. Description of Service</h3>
              <p>The Personal Banking App provides online banking services, including account management, fund transfers, and bill payments.</p>

              <h3 className="text-lg font-semibold">3. User Accounts</h3>
              <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

              <h3 className="text-lg font-semibold">4. User Conduct</h3>
              <p>You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.</p>

              <h3 className="text-lg font-semibold">5. Intellectual Property</h3>
              <p>All content and functionality on the app is the exclusive property of Personal Banking App and its licensors.</p>

              <h3 className="text-lg font-semibold">6. Disclaimer of Warranties</h3>
              <p>The service is provided "as is" without any warranties, express or implied.</p>

              <h3 className="text-lg font-semibold">7. Limitation of Liability</h3>
              <p>Personal Banking App shall not be liable for any indirect, incidental, special, consequential or punitive damages.</p>

              <h3 className="text-lg font-semibold">8. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Your continued use of the service constitutes agreement to such modifications.</p>

              <h3 className="text-lg font-semibold">9. Governing Law</h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>

              <h3 className="text-lg font-semibold">10. Contact Information</h3>
              <p>If you have any questions about these Terms, please contact us at legal@personalbankingapp.com.</p>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowTermsOfService(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}