"use client";

import { useState, useEffect } from 'react'
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
import Reports from '@/components/Reports'
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
  

/**
 * The main app component that renders the sidebar, navigation, and content based on the current tab.
 *
 * @returns The main app component.
 */
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
    //const [chartPeriod, setChartPeriod] = useState('week')
    //const [chartAccount, setChartAccount] = useState('checking')
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
        { id: 5, description: 'Groceries', amount: -75.32, date: '2024-10-02', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Market', modeOfTransaction: 'Card Payment' },
        { id: 6, description: 'Rent Payment', amount: -1200.00, date: '2024-10-05', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Landlord', modeOfTransaction: 'Online Transfer' },
        { id: 7, description: 'Salary Deposit', amount: 2850.00, date: '2024-10-08', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
        { id: 8, description: 'Dining Out', amount: -45.75, date: '2024-10-10', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Restaurant', modeOfTransaction: 'Card Payment' },
        { id: 9, description: 'Online Shopping', amount: -92.18, date: '2024-10-12', type: 'debit', fromAccount: 'Credit Card', recipientName: 'E-commerce Store', modeOfTransaction: 'Card Payment' },
        { id: 10, description: 'Gas Bill', amount: -85.20, date: '2024-10-15', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Gas Company', modeOfTransaction: 'Online Payment' },
        { id: 11, description: 'Groceries', amount: -68.94, date: '2024-10-17', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Market', modeOfTransaction: 'Card Payment' },
        { id: 12, description: 'Phone Bill', amount: -55.00, date: '2024-10-19', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Phone Company', modeOfTransaction: 'Auto-Payment' },
        { id: 13, description: 'Cash Withdrawal', amount: -200.00, date: '2024-10-20', type: 'debit', fromAccount: 'Checking Account', recipientName: 'ATM', modeOfTransaction: 'ATM Withdrawal' },
        { id: 14, description: 'Online Course', amount: -129.99, date: '2024-10-22', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Education Platform', modeOfTransaction: 'Card Payment' },
        { id: 15, description: 'Car Payment', amount: -350.00, date: '2024-10-24', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Car Loan Company', modeOfTransaction: 'Auto-Payment' },
        { id: 16, description: 'Groceries', amount: -72.45, date: '2024-10-26', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Local Market', modeOfTransaction: 'Card Payment' },
        { id: 17, description: 'Entertainment', amount: -35.00, date: '2024-10-27', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Movie Theater', modeOfTransaction: 'Card Payment' },
        { id: 18, description: 'Bonus Deposit', amount: 500.00, date: '2024-10-28', type: 'credit', fromAccount: 'External Transfer', recipientName: 'Your Name', modeOfTransaction: 'Direct Deposit' },
        { id: 19, description: 'Online Shopping', amount: -87.32, date: '2024-10-29', type: 'debit', fromAccount: 'Credit Card', recipientName: 'E-commerce Store', modeOfTransaction: 'Card Payment' },
        { id: 20, description: 'Gift Purchase', amount: -120.00, date: '2024-10-30', type: 'debit', fromAccount: 'Credit Card', recipientName: 'Gift Shop', modeOfTransaction: 'Card Payment' },
        { id: 21, description: 'Dividend Deposit', amount: 25.50, date: '2024-10-03', type: 'credit', fromAccount: 'Investment Account', recipientName: 'Investment Firm', modeOfTransaction: 'Direct Deposit' },
        { id: 22, description: 'Insurance Payment', amount: -150.00, date: '2024-10-11', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Insurance Company', modeOfTransaction: 'Auto-Payment' },
        { id: 23, description: 'Charity Donation', amount: -50.00, date: '2024-10-16', type: 'debit', fromAccount: 'Checking Account', recipientName: 'Charity Organization', modeOfTransaction: 'Online Transfer' },
        { id: 24, description: 'Cashback Reward', amount: 15.23, date: '2024-10-23', type: 'credit', fromAccount: 'Credit Card', recipientName: 'Credit Card Company', modeOfTransaction: 'Credit Card Adjustment' }
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

    const unreadCount = notifications.filter(notification => !notification.read).length

    const handleLogin = () => setIsLoggedIn(true)
    const handleLogout = () => {
        setIsLoggedIn(false)
        setActiveTab('dashboard')
    }

    //Below code is for Password Reset Functionality
    const handleForgotPassword = (email: string) => {
        setForgotPasswordEmail(email)
        setShowForgetPasswordModal(true)
    }

    const handleForgetPasswordSubmit = (answers: string[]) => {
        // Here you would typically verify the answers against the stored security questions
        // For this example, we'll just assume they're correct
        setShowForgetPasswordModal(false)
        setIsLoggedIn(true)
        setShowProfileModal(true)
        setProfileTab('security')
    }



    // Below snippet is for Notifications
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

    // Add these functions to manage beneficiaries
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
            case 'reports':
                return <Reports transactions={transactions} />
            case 'contact':
                return <Contact />
            case 'app-info':
                return <AppInfo />
            default:
                return <div className="text-2xl font-bold">Page not found</div>
        }
    }

    const handleProceed = () => {
        setShowSummaryModal(false)
        setShowOTPModal(true)
    }

    const handleOTPSubmit = (enteredOTP) => {
        if (enteredOTP === "12345") {
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

    const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const updatedProfile = Object.fromEntries(formData.entries())
        setUserProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }))
        setShowProfileModal(false)
    }

    const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Implement password reset logic here
        alert('Password reset functionality to be implemented')
        setShowProfileModal(false)
    }


    if (!isLoggedIn) {
        return (
            <>
                <LoginForm
                    onLogin={handleLogin}
                    onRegister={(userData) => {
                        // Handle user registration here
                        console.log('User registered:', userData)
                        setUserProfile({
                            fullName: userData.name,
                            primaryEmail: userData.email,
                            secondaryEmail: '', // add this
                            phone: '', // add this
                            secondaryPhone: '', // add this
                            address: '', // add this
                            adharId: userData.adharId,
                        })
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
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h1 className="text-2xl font-bold">ABC NetBanking Portal</h1>
                        <div className="flex items-center space-x-4">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="lg:hidden">
                                        <Menu className="h-4 w-4" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64 p-0">
                                    <Sidebar
                                        activeTab={activeTab}
                                        setActiveTab={(tab) => {
                                            setActiveTab(tab)
                                            setIsSheetOpen(false)
                                        }}
                                    />
                                </SheetContent>
                            </Sheet>
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

            <NotificationModal
                show={showNotificationDetails}
                onClose={() => setShowNotificationDetails(false)}
                notification={selectedNotification}
            />

            <ProfileModal
                show={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                userProfile={userProfile}
                profileTab={profileTab}
                setProfileTab={setProfileTab}
                handleProfileUpdate={handleProfileUpdate}
                handlePasswordReset={handlePasswordReset}
            />
        </div>
    )
}