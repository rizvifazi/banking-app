"use client";

import { useState } from 'react'
import { Bell, User, LogOut, Menu, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import LoginForm from '@/components/LoginForm'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import Beneficiaries from '@/components/Beneficiaries'
import Payments from '@/components/Payments'
import Investments from '@/components/Investments'
import Contact from '@/components/Contact'
import PaymentSummaryModal from '@/components/PaymentSummaryModal'
import OTPModal from '@/components/OTPModal'
import ReceiptModal from '@/components/ReceiptModal'
import TransactionDetailModal from '@/components/TransactionDetailModal'
import AppInfo from '@/components/AppInfo'
import NotificationModal from '@/components/NotificationModal'
import ProfileModal from '@/components/ProfileModal'
import ForgetPasswordModal from '@/components/ForgetPasswordModal'

interface Beneficiary {
  id: number
  firstName: string
  lastName: string
  bankName: string
  accountNumber: string
}

export default function PersonalBankingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileTab, setProfileTab] = useState('summary')
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: 1, firstName: "John", lastName: "Doe", bankName: "Bank of America", accountNumber: "12345678" },
    { id: 2, firstName: "Jane", lastName: "Smith", bankName: "JPMorgan Chase", accountNumber: "23456789" },
    { id: 3, firstName: "Michael", lastName: "Johnson", bankName: "Wells Fargo", accountNumber: "34567890" },
    { id: 4, firstName: "Emily", lastName: "Brown", bankName: "Citibank", accountNumber: "45678901" },
    { id: 5, firstName: "David", lastName: "Wilson", bankName: "U.S. Bank", accountNumber: "56789012" },
    { id: 6, firstName: "Sarah", lastName: "Taylor", bankName: "PNC Bank", accountNumber: "67890123" },
  ])

  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -85.20, date: '2023-04-15', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Supermarket', modeOfTransaction: 'Card Payment' },
    { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2023-04-14', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
    { id: 3, description: 'Electric Bill', amount: -120.50, date: '2023-04-13', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Electric Company', modeOfTransaction: 'Online Transfer' },
    { id: 4, description: 'Online Shopping', amount: -65.99, date: '2023-04-12', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Online Retailer', modeOfTransaction: 'Card Payment' },
  ])

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const handleForgotPassword = (email: string) => {
    setForgotPasswordEmail(email)
    setShowForgetPasswordModal(true)
  }

  const handleForgetPasswordSubmit = (answers: string[]) => {
    setShowForgetPasswordModal(false)
    setIsLoggedIn(true)
    setShowProfileModal(true)
    setProfileTab('security')
  }

  const handleAddBeneficiary = (newBeneficiary: Omit<Beneficiary, 'id'>) => {
    setBeneficiaries(prev => [...prev, { ...newBeneficiary, id: Date.now() }])
  }

  const handleEditBeneficiary = (updatedBeneficiary: Beneficiary) => {
    setBeneficiaries(prev => prev.map(b => b.id === updatedBeneficiary.id ? updatedBeneficiary : b))
  }

  const handleDeleteBeneficiary = (id: number) => {
    setBeneficiaries(prev => prev.filter(b => b.id !== id))
  }

  const handlePayment = (details: any) => {
    setPaymentDetails(details)
    setShowSummaryModal(true)
  }

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetailModal(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} onTransactionClick={handleTransactionClick} />
      case 'beneficiaries':
        return <Beneficiaries 
          beneficiaries={beneficiaries}
          onAddBeneficiary={handleAddBeneficiary}
          onEditBeneficiary={handleEditBeneficiary}
          onDeleteBeneficiary={handleDeleteBeneficiary}
        />
      case 'payments':
        return <Payments
          transactions={transactions}
          onPayment={handlePayment}
          onTransactionClick={handleTransactionClick}
          beneficiaries={beneficiaries}
        />
      case 'investments':
        return <Investments />
      case 'contact':
        return <Contact />
      case 'app-info':
        return <AppInfo />
      default:
        return <div className="text-2xl font-bold">Page not found</div>
    }
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm 
          onLogin={handleLogin} 
          onRegister={(userData) => {
            console.log('User registered:', userData)
            handleLogin()
          }}
          onForgotPassword={handleForgotPassword}
        />
        <ForgetPasswordModal
          show={showForgetPasswordModal}
          onClose={() => setShowForgetPasswordModal(false)}
          onSubmit={handleForgetPasswordSubmit}
          securityQuestions={[
            "What was the name of your first pet?",
            "In what city were you born?",
            "What is your mother's maiden name?"
          ]}
        />
      </>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab)
        setIsSheetOpen(false)
      }} className="hidden lg:block" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
                setActiveTab(tab)
                setIsSheetOpen(false)
              }} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Personal Banking</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setShowProfileModal(true)}>
              <User className="h-6 w-6" />
              <span className="sr-only">User profile</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      <PaymentSummaryModal
        show={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onConfirm={() => {
          setShowSummaryModal(false)
          setShowOTPModal(true)
        }}
        paymentDetails={paymentDetails}
      />
      <OTPModal
        show={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmit={() => {
          setShowOTPModal(false)
          setShowReceiptModal(true)
        }}
      />
      <ReceiptModal
        show={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        paymentDetails={paymentDetails}
      />
      <TransactionDetailModal
        show={showTransactionDetailModal}
        onClose={() => setShowTransactionDetailModal(false)}
        transaction={selectedTransaction}
      />
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userProfile={{}}
        profileTab={profileTab}
        setProfileTab={setProfileTab}
        handleProfileUpdate={() => {}}
        handlePasswordReset={() => {}}
      />
    </div>
  )
}