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
import AppInfo from '@/components/AppInfo'

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

    const handleLogin = () => setIsLoggedIn(true)
    const handleLogout = () => {
        setIsLoggedIn(false)
        setActiveTab('dashboard')
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

    /*useEffect(() => {
        let timer
        if (showNotificationDetails && selectedNotification) {
            timer = setTimeout(() => {
                handleMarkAsRead(selectedNotification.id)
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [showNotificationDetails, selectedNotification])*/

    const unreadCount = notifications.filter(notification => !notification.read).length


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
            case 'app-info':
                return <AppInfo />
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
            <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
                setActiveTab(tab)
                setIsSheetOpen(false)
                }} className="hidden lg:block" />
            <div className="flex flex-1 flex-col overflow-hidden">
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
                                <SheetContent side="left" className="w-64 p-0">
                                    <Sidebar 
                                        activeTab={activeTab} 
                                        setActiveTab={ (tab) => {
                                            setActiveTab(tab)
                                            setIsSheetOpen(false)
                                        }} 
                                    />
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