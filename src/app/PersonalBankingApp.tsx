"use client";

import { useState } from 'react'
import { Bell, CreditCard, DollarSign, Home, LogOut, Menu, PieChart, User, Phone, Mail, MessageSquare, Facebook, Twitter, Instagram, CreditCard as CreditCardIcon, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

export default function PersonalBankingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -85.20, date: '2023-04-15', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Supermarket', modeOfTransaction: 'Card Payment' },
    { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2023-04-14', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
    { id: 3, description: 'Electric Bill', amount: -120.50, date: '2023-04-13', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Electric Company', modeOfTransaction: 'Online Transfer' },
    { id: 4, description: 'Online Shopping', amount: -65.99, date: '2023-04-12', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Online Retailer', modeOfTransaction: 'Card Payment' },
  ])
  const [recipientName, setRecipientName] = useState('')
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [otp, setOTP] = useState('')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const accounts = [
    { name: 'Checking Account', balance: 5280.50 },
    { name: 'Savings Account', balance: 12750.75 },
    { name: 'Credit Card', balance: -1520.30 },
  ]

  const banks = [
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'US Bank',
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const handlePayment = (event) => {
    event.preventDefault()
    const form = event.target
    const details = {
      fromAccount: form.fromAccount.value,
      amount: parseFloat(form.amount.value),
      recipientBank: form.recipientBank.value,
      accountNumber: form.accountNumber.value,
      recipientName: form.recipientName.value,
      description: form.description.value,
      date: new Date().toLocaleString(),
      modeOfTransaction: 'Online Transfer'
    }
    setPaymentDetails(details)
    setShowSummaryModal(true)
  }

  const handleProceed = () => {
    setShowSummaryModal(false)
    setShowOTPModal(true)
  }

  const handleOTPSubmit = (event) => {
    event.preventDefault()
    if (otp === '12345') {
      setShowOTPModal(false)
      setShowReceiptModal(true)
      const newTransaction = {
        id: transactions.length + 1,
        description: paymentDetails.description,
        amount: -paymentDetails.amount,
        date: paymentDetails.date.split(',')[0],
        type: 'debit',
        fromAccount: paymentDetails.fromAccount,
        recipientName: paymentDetails.recipientName,
        modeOfTransaction: paymentDetails.modeOfTransaction
      }
      setTransactions([newTransaction, ...transactions])
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  const handleCloseReceipt = () => {
    setShowReceiptModal(false)
    setPaymentDetails(null)
    setOTP('')
    setRecipientName('')
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleRecipientNameChange = (event) => {
    const name = event.target.value
    const obscuredName = name.split(' ').map(part => 
      part.charAt(0) + '*'.repeat(part.length - 1)
    ).join(' ')
    setRecipientName(obscuredName)
  }

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetailModal(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Account Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                    {account.name === 'Credit Card' ? <CreditCard className="h-4 w-4 text-muted-foreground" /> : <DollarSign className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                      <tr key={transaction.id} className="border-b last:border-b-0 cursor-pointer hover:bg-gray-100" onClick={() => handleTransactionClick(transaction)}>
                        <td className="p-4">{transaction.description}</td>
                        <td className={`text-right p-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {formatCurrency(transaction.amount)}
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
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Send money to someone or pay your bills.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-account">From Account</Label>
                      <Select name="fromAccount" defaultValue="checking">
                        <SelectTrigger id="from-account">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking Account</SelectItem>
                          <SelectItem value="savings">Savings Account</SelectItem>
                          <SelectItem value="credit">Credit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" name="amount" type="number" step="0.01" placeholder="Enter amount" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-bank">Recipient's Bank</Label>
                    <Select name="recipientBank">
                      <SelectTrigger id="recipient-bank">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank, index) => (
                          <SelectItem key={index} value={bank.toLowerCase().replace(/\s+/g, '-')}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" name="accountNumber" placeholder="Enter account number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-name">Recipient's Name</Label>
                    <Input 
                      id="recipient-name" 
                      name="recipientName" 
                      placeholder="Enter recipient's name" 
                      onChange={handleRecipientNameChange}
                      value={recipientName}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" placeholder="Enter payment description" required />
                  </div>
                  <Button type="submit" className="w-full">Make Payment</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent transactions are listed below.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Description</th>
                      <th className="text-right p-4">Amount</th>
                      <th className="text-right p-4">Date</th>
                      <th className="text-right p-4">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-b-0 cursor-pointer hover:bg-gray-100" onClick={() => handleTransactionClick(transaction)}>
                        <td className="p-4">{transaction.description}</td>
                        <td className={`text-right p-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="text-right p-4">{transaction.date}</td>
                        <td className="text-right p-4 capitalize">{transaction.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )
      case 'investments':
        return <div className="text-2xl font-bold">Investments Page</div>
      case 'contact':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Methods</h3>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>Hotline: 1-800-123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>Email: support@personalbanking.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <Button variant="outline">Start Live Chat</Button>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <a href="#" className="text-primary hover:text-primary-dark">
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-primary hover:text-primary-dark">
                        <Twitter className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-primary hover:text-primary-dark">
                        <Instagram className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Important Links</h3>
                    <Button variant="outline" className="w-full justify-start" onClick={() =>alert("Redirecting to report stolen card page")}>
                      <CreditCardIcon className="mr-2 h-4 w-4" />
                      Report Stolen Credit Card
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={()=>alert("Redirecting to fraud prevention page")}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Fraud Prevention Tips
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={()=>alert("Redirecting to security center")}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Security Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      To reset your password, click on the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How can I dispute a transaction?</AccordionTrigger>
                    <AccordionContent>
                      To dispute a transaction, log into your account, find the transaction in question, and click on the "Dispute" button. Follow the prompts to submit your dispute.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are the daily withdrawal limits?</AccordionTrigger>
                    <AccordionContent>
                      Daily withdrawal limits vary depending on your account type. Generally, ATM withdrawals are limited to $500 per day, while point-of-sale transactions are limited to $2,500 per day.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I set up direct deposit?</AccordionTrigger>
                    <AccordionContent>
                      To set up direct deposit, provide your employer with your account number and our bank's routing number. You can find this information in the "Account Details" section of your online banking portal.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Form</CardTitle>
                <CardDescription>We value your opinion. Please share your thoughts with us.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); alert('Feedback submitted successfully!'); }}>
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Your email" type="email" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="general">General Feedback</SelectItem>
                          <SelectItem value="bug">Report a Bug</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="Please provide your feedback here" />
                    </div>
                    <Button type="submit">Submit Feedback</Button>
                  </div>
                </form>
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
      variant={activeTab === label.toLowerCase() ? 'secondary' : 'ghost'}
      className="w-full justify-start"
      onClick={() => setActiveTab(label.toLowerCase())}
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
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Personal Banking</h1>
            <div className="flex items-center space-x-4">
              <Sheet>
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
                  </nav>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
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

      {/* Payment Summary Modal */}
      <Dialog open={showSummaryModal} onOpenChange={setShowSummaryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Summary</DialogTitle>
          </DialogHeader>
          {paymentDetails && (
            <div className="space-y-4">
              <p><strong>From Account:</strong> {paymentDetails.fromAccount}</p>
              <p><strong>Amount:</strong> {formatCurrency(paymentDetails.amount)}</p>
              <p><strong>Recipient's Bank:</strong> {paymentDetails.recipientBank}</p>
              <p><strong>Account Number:</strong> {paymentDetails.accountNumber}</p>
              <p><strong>Recipient's Name:</strong> {paymentDetails.recipientName}</p>
              <p><strong>Description:</strong> {paymentDetails.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowSummaryModal(false)}>Cancel</Button>
            <Button onClick={handleProceed}>Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Modal */}
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              Please enter the 5-digit OTP sent to your registered mobile number.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOTPSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                maxLength={5}
                required
              />
              <DialogFooter>
                <Button type="button" onClick={() => setShowOTPModal(false)}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Receipt Modal */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
          </DialogHeader>
          {paymentDetails && (
            <div className="space-y-4">
              <p><strong>From Account:</strong> {paymentDetails.fromAccount}</p>
              <p><strong>Amount:</strong> {formatCurrency(paymentDetails.amount)}</p>
              <p><strong>Recipient's Bank:</strong> {paymentDetails.recipientBank}</p>
              <p><strong>Account Number:</strong> {paymentDetails.accountNumber}</p>
              <p><strong>Recipient's Name:</strong> {paymentDetails.recipientName}</p>
              <p><strong>Description:</strong> {paymentDetails.description}</p>
              <p><strong>Date and Time:</strong> {paymentDetails.date}</p>
              <p><strong>Mode of Transaction:</strong> {paymentDetails.modeOfTransaction}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handlePrintReceipt}>Print/Download</Button>
            <Button onClick={handleCloseReceipt}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Modal */}
      <Dialog open={showTransactionDetailModal} onOpenChange={setShowTransactionDetailModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <p><strong>Description:</strong> {selectedTransaction.description}</p>
              <p><strong>Amount:</strong> {formatCurrency(selectedTransaction.amount)}</p>
              <p><strong>Date:</strong> {selectedTransaction.date}</p>
              <p><strong>Type:</strong> {selectedTransaction.type}</p>
              <p><strong>From Account:</strong> {selectedTransaction.fromAccount}</p>
              <p><strong>Recipient's Name:</strong> {selectedTransaction.recipientName}</p>
              <p><strong>Mode of Transaction:</strong> {selectedTransaction.modeOfTransaction}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handlePrintReceipt}>Print/Download</Button>
            <Button onClick={() => setShowTransactionDetailModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}