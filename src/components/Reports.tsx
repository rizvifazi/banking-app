import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: number
  description: string
  amount: number
  date: string
  type: string
  fromAccount: string
  recipientName: string
  modeOfTransaction: string
}

interface ReportsProps {
  transactions: Transaction[]
}

export default function Reports({ transactions }: ReportsProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [transactionType, setTransactionType] = useState('all')
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  const accounts = useMemo(() => {
    const accountSet = new Set(transactions.map(t => t.fromAccount))
    return ['all', ...Array.from(accountSet)]
  }, [transactions])

  const handleFilter = () => {
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      const start = startDate ? new Date(startDate) : new Date(0)
      const end = endDate ? new Date(endDate) : new Date()
      
      return (
        transactionDate >= start &&
        transactionDate <= end &&
        (transactionType === 'all' || transaction.type === transactionType) &&
        (selectedAccount === 'all' || transaction.fromAccount === selectedAccount)
      )
    })
    setFilteredTransactions(filtered)
  }

  const handleDownloadCSV = () => {
    const headers = ['Description', 'Amount', 'Date', 'Type', 'From Account', 'Recipient Name', 'Mode of Transaction']
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        [t.description, t.amount, t.date, t.type, t.fromAccount, t.recipientName, t.modeOfTransaction].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'transaction_report.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Filter transactions and download as CSV.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-account">From Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger id="from-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account} value={account}>
                      {account === 'all' ? 'All Accounts' : account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={handleFilter}>Filter</Button>
            <Button onClick={handleDownloadCSV} disabled={filteredTransactions.length === 0}>
              Download CSV
            </Button>
          </div>
        </CardContent>
      </Card>
      {filteredTransactions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Filtered Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From Account</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.fromAccount}</TableCell>
                    <TableCell>{transaction.recipientName}</TableCell>
                    <TableCell>{transaction.modeOfTransaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-lg text-gray-500">No transactions found matching the selected filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}