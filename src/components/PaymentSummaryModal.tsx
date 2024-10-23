import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function PaymentSummaryModal({ show, onClose, onProceed, paymentDetails }: { show: boolean, onClose: () => void, onProceed: () => void, paymentDetails: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Summary</DialogTitle>
        </DialogHeader>
        {paymentDetails && (
          <div className="space-y-4">
            <p><strong>From Account:</strong> {paymentDetails.fromAccount}</p>
            <p><strong>Amount:</strong> {formatCurrency(paymentDetails.amount)}</p>
            <p><strong>Recipient's Bank:</strong> {paymentDetails.recipientBank}</p>
            <p><strong>Account Number:</strong> {paymentDetails.accountNumber}</p>
            <p><strong>Recipient's Name:</strong> {paymentDetails.recipientName}</p>
            <p><strong>Description:</strong> {paymentDetails.description}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onProceed}>Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}