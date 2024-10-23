import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ReceiptModal({ show, onClose, paymentDetails }: { show: boolean, onClose: () => void, paymentDetails: any }) {
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
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}