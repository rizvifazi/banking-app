import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function TransactionDetailModal({ show, onClose, transaction }: { show: boolean, onClose: () => void, transaction: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        {transaction && (
          <div className="space-y-4">
            <p><strong>Description:</strong> {transaction.description}</p>
            <p><strong>Amount:</strong> {formatCurrency(transaction.amount)}</p>
            <p><strong>Date:</strong> {transaction.date}</p>
            <p><strong>Type:</strong> {transaction.type}</p>
            <p><strong>From Account:</strong> {transaction.fromAccount}</p>
            <p><strong>Recipient's Name:</strong> {transaction.recipientName}</p>
            <p><strong>Mode of Transaction:</strong> {transaction.modeOfTransaction}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handlePrintReceipt}>Print/Download</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}