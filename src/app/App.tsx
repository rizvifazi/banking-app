"use client";

import { useState } from 'react'
import { Bell, User, LogOut, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LoginForm from '@/components/LoginForm'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import Accounts from '@/components/Accounts'
import Payments from '@/components/Payments'
import Investments from '@/components/Investments'
import Contact from '@/components/Contact'
import PaymentSummaryModal from '@/components/PaymentSummaryModal'
import OTPModal from '@/components/OTPModal'
import ReceiptModal from '@/components/ReceiptModal'
import TransactionDetailModal from '@/components/TransactionDetailModal'

/**
 * The main app component that renders the sidebar, navigation, and content based on the current tab.
 *
 * @returns The main app component.
 */
export default function PersonalBankingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -85.20, date: '2023-04-15', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Supermarket', modeOfTransaction: 'Card Payment' },
    { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2023-04-14', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
    { id: 3, description: 'Electric Bill', amount: -120.50, date: '2023-04-13', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Electric Company', modeOfTransaction: 'Online Transfer' },
    { id: 4, description: 'Online Shopping', amount: -65.99, date: '2023-04-12', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Online Retailer', modeOfTransaction: 'Card Payment' },
  ])
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} onTransactionClick={handleTransactionClick} />
      case 'accounts':
        return <Accounts />
      case 'payments':
        return <Payments 
          transactions={transactions} 
          onPayment={handlePayment} 
          onTransactionClick={handleTransactionClick} 
        />
      case 'investments':
        return <Investments />
      case 'contact':
        return <Contact />
      default:
        return <div className="text-2xl font-bold">Page not found</div>
    }
  }

  const handlePayment = (details) => {
    setPaymentDetails(details)
    setShowSummaryModal(true)
  }

  const handleProceed = () => {
    setShowSummaryModal(false)
    setShowOTPModal(true)
  }

  const handleOTPSubmit = (enteredOTP) => {
    if (enteredOTP === '12345') {
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
  }

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetailModal(true)
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} className="hidden lg:block" />
      <div className="flex flex-1 flex-col overflow-hidden">
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
                <SheetContent side="left" className="w-64 p-0">
                  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
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
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      <PaymentSummaryModal
        show={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onProceed={handleProceed}
        paymentDetails={paymentDetails}
      />

      <OTPModal
        show={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmit={handleOTPSubmit}
      />

      <ReceiptModal
        show={showReceiptModal}
        onClose={handleCloseReceipt}
        paymentDetails={paymentDetails}
      />

      <TransactionDetailModal
        show={showTransactionDetailModal}
        onClose={() => setShowTransactionDetailModal(false)}
        transaction={selectedTransaction}
      />
    </div>
  )
}