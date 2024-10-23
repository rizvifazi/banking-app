import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Payments({ transactions, onPayment, onTransactionClick }: { transactions: any[], onPayment: (details: any) => void, onTransactionClick: (transaction: any) => void }) {
  const [recipientName, setRecipientName] = useState('')

  const banks = [
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'US Bank',
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const details = {
      
      fromAccount: (form.fromAccount as HTMLSelectElement).value,
      amount: parseFloat((form.amount as HTMLInputElement).value),
      recipientBank: (form.recipientBank as HTMLSelectElement).value,
      accountNumber: (form.accountNumber as HTMLInputElement).value,
      recipientName: (form.recipientName as HTMLInputElement).value,
      description: (form.description as HTMLInputElement).value,
      date: new Date().toLocaleString(),
      modeOfTransaction: 'Online Transfer'
    }
    onPayment(details)
  }

  const handleRecipientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    const obscuredName = name.split(' ').map(part => 
      part.charAt(0) + '*'.repeat(part.length - 1)
    ).join(' ')
    setRecipientName(obscuredName)
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
        </CardContent>
      </Card>
    </div>
  )
}