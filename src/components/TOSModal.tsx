import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TOSModalProps {
  show: boolean
  onClose: () => void
}

export default function TOSModal({ show, onClose }: TOSModalProps) {
  return (
    <Dialog open={show} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
              <p>By accessing or using the Personal Banking App, you agree to be bound by these Terms of Service.</p>

              <h3 className="text-lg font-semibold">2. Description of Service</h3>
              <p>The Personal Banking App provides online banking services, including account management, fund transfers, and bill payments.</p>

              <h3 className="text-lg font-semibold">3. User Accounts</h3>
              <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

              <h3 className="text-lg font-semibold">4. User Conduct</h3>
              <p>You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.</p>

              <h3 className="text-lg font-semibold">5. Intellectual Property</h3>
              <p>All content and functionality on the app is the exclusive property of Personal Banking App and its licensors.</p>

              <h3 className="text-lg font-semibold">6. Disclaimer of Warranties</h3>
              <p>The service is provided "as is" without any warranties, express or implied.</p>

              <h3 className="text-lg font-semibold">7. Limitation of Liability</h3>
              <p>Personal Banking App shall not be liable for any indirect, incidental, special, consequential or punitive damages.</p>

              <h3 className="text-lg font-semibold">8. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Your continued use of the service constitutes agreement to such modifications.</p>

              <h3 className="text-lg font-semibold">9. Governing Law</h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>

              <h3 className="text-lg font-semibold">10. Contact Information</h3>
              <p>If you have any questions about these Terms, please contact us at legal@personalbankingapp.com.</p>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}