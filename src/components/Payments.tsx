import { useState} from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Beneficiary {
  id: number
  firstName: string
  lastName: string
  bankName: string
  accountNumber: string
}

interface PaymentsProps {
  transactions: any[], 
  onPayment: (details: any) => void, 
  onTransactionClick: (transaction: any) => void,
  beneficiaries: Beneficiary[]
}

export default function Payments({ transactions, onPayment, onTransactionClick, beneficiaries }: PaymentsProps) {
  const [paymentType, setPaymentType] = useState('inter-bank')
  const [recipientName, setRecipientName] = useState('')
  const [recipientBank, setRecipientBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 10

  const banks = [
    "Bank of America",
    "JPMorgan Chase",
    "Wells Fargo",
    "Citibank",
    "U.S. Bank",
    "PNC Bank",
    "Capital One",
    "TD Bank",
    "Bank of New York Mellon",
    "State Street Corporation"
  ]

  const utilityTypes = [
    'Electricity Board',
    'Water Board',
    'Telecom',
    'Cable TV',
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value)
    setRecipientName('')
    setRecipientBank('')
    setAccountNumber('')
    setSelectedBeneficiary(null)

    if (value === 'intra-bank') {
      setRecipientBank('ABC Bank')
    }
  }

  const handleBeneficiaryChange = (value: string) => {
    const beneficiary = beneficiaries.find(b => `${b.firstName} ${b.lastName}` === value)
    if (beneficiary) {
      setSelectedBeneficiary(beneficiary)
      setRecipientName(`${beneficiary.firstName} ${beneficiary.lastName}`)
      setRecipientBank(beneficiary.bankName)
      setAccountNumber(beneficiary.accountNumber)
    }
  }

  const handleUtilityTypeChange = (value: string) => {
    setRecipientBank(value)
    setRecipientName(value)
  }

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const details = {
      paymentType,
      fromAccount: (form.fromAccount as HTMLSelectElement).value,
      amount: parseFloat((form.amount as HTMLInputElement).value),
      recipientBank: recipientBank,
      accountNumber: accountNumber,
      recipientName: recipientName,
      description: (form.description as HTMLInputElement).value,
      date: new Date().toLocaleString(),
      modeOfTransaction: 'Online Transfer'
    }
    onPayment(details)
  }

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  const totalPages = Math.ceil(transactions.length / transactionsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => paginate(i)}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            className="mx-1"
          >
            {i}
          </Button>
        )
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      if (startPage > 1) {
        pageNumbers.push(
          <Button key="start" onClick={() => paginate(1)} variant="outline" size="sm" className="mx-1">
            1
          </Button>
        )
        if (startPage > 2) {
          pageNumbers.push(<span key="ellipsis1" className="mx-1">...</span>)
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => paginate(i)}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            className="mx-1"
          >
            {i}
          </Button>
        )
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<span key="ellipsis2" className="mx-1">...</span>)
        }
        pageNumbers.push(
          <Button key="end" onClick={() => paginate(totalPages)} variant="outline" size="sm" className="mx-1">
            {totalPages}
          </Button>
        )
      }
    }

    return pageNumbers
  }

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment-type">Payment Type</Label>
                <Select name="paymentType" value={paymentType} onValueChange={handlePaymentTypeChange}>
                  <SelectTrigger id="payment-type">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beneficiary">Beneficiary</SelectItem>
                    <SelectItem value="intra-bank">Intra-bank</SelectItem>
                    <SelectItem value="inter-bank">Inter-bank</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient-bank">
                  {paymentType === 'utility' ? "Utility Account Type" : "Recipient's Bank"}
                </Label>
                {paymentType === 'utility' ? (
                  <Select name="utilityType" value={recipientBank} onValueChange={handleUtilityTypeChange}>
                    <SelectTrigger id="utility-type">
                      <SelectValue placeholder="Select utility type" />
                    </SelectTrigger>
                    <SelectContent>
                      {utilityTypes.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select 
                    name="recipientBank" 
                    value={recipientBank} 
                    onValueChange={setRecipientBank}
                    disabled={paymentType === 'beneficiary' || paymentType === 'intra-bank'}
                  >
                    <SelectTrigger id="recipient-bank">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank, index) => (
                        <SelectItem key={index} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input 
                id="account-number" 
                name="accountNumber" 
                placeholder="Enter account number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={paymentType === 'beneficiary'}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-name">Recipient's Name</Label>
              {paymentType === 'beneficiary' ? (
                <Select name="beneficiary" value={recipientName} onValueChange={handleBeneficiaryChange}>
                  <SelectTrigger id="beneficiary">
                    <SelectValue placeholder="Select beneficiary" />
                  </SelectTrigger>
                  <SelectContent>
                    {beneficiaries.map((beneficiary) => (
                      <SelectItem key={beneficiary.id} value={`${beneficiary.firstName} ${beneficiary.lastName}`}>
                        {`${beneficiary.firstName} ${beneficiary.lastName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  id="recipient-name" 
                  name="recipientName" 
                  placeholder="Enter recipient's name" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  disabled={paymentType === 'utility'}
                  required 
                />
              )}
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
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-b-0 cursor-pointer hover:bg-gray-100" onClick={() => onTransactionClick(transaction)}>
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
          <div className="flex justify-center items-center p-4 space-x-2">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {renderPageNumbers()}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}