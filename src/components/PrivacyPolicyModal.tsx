import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PrivacyPolicyModalProps {
  show: boolean
  onClose: () => void
}


export default function PrivacyPolicyModal({show, onClose}:PrivacyPolicyModalProps) {

  return (
    <Dialog open={show} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Introduction</h3>
              <p>Welcome to the Personal Banking App Privacy Policy. This policy describes how we collect, use, and protect your personal information.</p>

              <h3 className="text-lg font-semibold">2. Information We Collect</h3>
              <p>We collect various types of information, including:</p>
              <ul className="list-disc pl-5">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Financial information (Account numbers, transaction history, etc.)</li>
                <li>Device and usage information (IP address, browser type, etc.)</li>
              </ul>

              <h3 className="text-lg font-semibold">3. How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul className="list-disc pl-5">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate with you about your account and our services</li>
                <li>Detect and prevent fraud</li>
              </ul>

              <h3 className="text-lg font-semibold">4. Data Security</h3>
              <p>We implement a variety of security measures to maintain the safety of your personal information.</p>

              <h3 className="text-lg font-semibold">5. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.</p>

              <h3 className="text-lg font-semibold">6. Changes to This Policy</h3>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

              <h3 className="text-lg font-semibold">7. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@personalbankingapp.com.</p>
            </div>
          </ScrollArea>
          <DialogFooter>
          <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}