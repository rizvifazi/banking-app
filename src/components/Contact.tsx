import { Phone, Mail, MessageSquare, Facebook, Twitter, Instagram, CreditCard as CreditCardIcon, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Contact() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Methods</h3>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>Hotline: 1-800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email: support@personalbanking.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <Button variant="outline">Start Live Chat</Button>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <a href="#" className="text-primary hover:text-primary-dark">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Important Links</h3>
              <Button variant="outline" className="w-full justify-start" onClick={() =>alert("Redirecting to report stolen card page")}>
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Report Stolen Credit Card
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={()=>alert("Redirecting to fraud prevention page")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Fraud Prevention Tips
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={()=>alert("Redirecting to security center")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Security Center
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                To reset your password, click on the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I dispute a transaction?</AccordionTrigger>
              <AccordionContent>
                To dispute a transaction, log into your account, find the transaction in question, and click on the "Dispute" button. Follow the prompts to submit your dispute.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are the daily withdrawal limits?</AccordionTrigger>
              <AccordionContent>
                Daily withdrawal limits vary depending on your account type. Generally, ATM withdrawals are limited to $500 per day, while point-of-sale transactions are limited to $2,500 per day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I set up direct deposit?</AccordionTrigger>
              <AccordionContent>
                To set up direct deposit, provide your employer with your account number and our bank's routing number. You can find this information in the "Account Details" section of your online banking portal.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Form</CardTitle>
          <CardDescription>We value your opinion. Please share your thoughts with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); alert('Feedback submitted successfully!'); }}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Please provide your feedback here" />
              </div>
              <Button type="submit">Submit Feedback</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}