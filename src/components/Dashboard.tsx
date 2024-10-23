import { DollarSign, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard({ transactions, onTransactionClick }: { transactions: any[], onTransactionClick: (transaction: any) => void }) {
  const accounts = [
    { name: 'Checking Account', balance: 5280.50 },
    { name: 'Savings Account', balance: 12750.75 },
    { name: 'Credit Card', balance: -1520.30 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

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
                <tr key={transaction.id} className="border-b last:border-b-0 cursor-pointer hover:bg-gray-100" onClick={() => onTransactionClick(transaction)}>
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
}