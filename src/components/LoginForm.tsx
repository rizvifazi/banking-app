import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LoginFormProps {
  onLogin: () => void
  onRegister: (userData: {
    name: string
    email: string
    adharId: string
    accountNumber: string
    password: string
    securityQuestions: { question: string; answer: string }[]
  }) => void
  onForgotPassword: (email: string) => void
}

const securityQuestions = [
  "What was the name of your first pet?",
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What high school did you attend?",
  "What was the make of your first car?",
  "What was your favorite food as a child?",
  "What is the name of your favorite childhood friend?",
  "What street did you live on in third grade?",
  "What is the middle name of your oldest child?",
  "What is your favorite team?"
]

export default function LoginForm({ onLogin, onRegister, onForgotPassword }: LoginFormProps) {
  const [activeTab, setActiveTab] = useState('login')
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [email, setEmail] = useState('')

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add login logic here
    onLogin()
  }

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const adharId = formData.get('adharId') as string
    const accountNumber = formData.get('accountNumber') as string
    const password = formData.get('password') as string
    const reenterPassword = formData.get('reenterPassword') as string
    const securityQuestions = [
      { question: formData.get('securityQuestion1') as string, answer: formData.get('securityAnswer1') as string },
      { question: formData.get('securityQuestion2') as string, answer: formData.get('securityAnswer2') as string },
      { question: formData.get('securityQuestion3') as string, answer: formData.get('securityAnswer3') as string },
    ]

    // Validations
    if (password !== reenterPassword) {
      setRegisterError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setRegisterError('Password must be at least 8 characters long')
      return
    }

    if (!/^\d{12}$/.test(adharId)) {
      setRegisterError('Adhar ID must be 12 digits')
      return
    }

    if (!/^\d{10}$/.test(accountNumber)) {
      setRegisterError('Account number must be 10 digits')
      return
    }

    if (new Set(securityQuestions.map(q => q.question)).size !== 3) {
      setRegisterError('Please select three different security questions')
      return
    }

    if (securityQuestions.some(q => q.answer.trim() === '')) {
      setRegisterError('Please provide answers for all security questions')
      return
    }

    setRegisterError('')
    onRegister({ name, email, adharId, accountNumber, password, securityQuestions })
  }

  const handleForgotPassword = () => {
    if (!email) {
      setLoginError('Please enter your email address')
      return
    }
    setLoginError('')
    onForgotPassword(email)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Personal Banking</CardTitle>
          <CardDescription>Login or create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" placeholder="Enter your password" required />
                  </div>
                </div>
                {loginError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                <Button className="w-full mt-4" type="submit">
                  Login
                </Button>
                <Button className="w-full mt-2" type="button" variant="outline" onClick={handleForgotPassword}>
                  Forgot Password
                </Button>
              </form>
            </TabsContent>

            {/* Register tab */}
            <TabsContent value="register">
              <ScrollArea className="h-[400px] pr-4">
                <form onSubmit={handleRegisterSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Enter your full name" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="adharId">Adhar ID</Label>
                      <Input id="adharId" name="adharId" placeholder="Enter your 12-digit Adhar ID" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" name="accountNumber" placeholder="Enter your 10-digit account number" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" name="password" type="password" placeholder="Enter your password" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="reenterPassword">Re-enter Password</Label>
                      <Input id="reenterPassword" name="reenterPassword" type="password" placeholder="Re-enter your password" required />
                    </div>
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="space-y-2">
                        <Label htmlFor={`securityQuestion${num}`}>Security Question {num}</Label>
                        <Select name={`securityQuestion${num}`} required>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select security question ${num}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {securityQuestions.map((question, index) => (
                              <SelectItem key={index} value={question}>
                                {question}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id={`securityAnswer${num}`}
                          name={`securityAnswer${num}`}
                          placeholder={`Answer for security question ${num}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  {registerError && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <Button className="w-full mt-4" type="submit">
                    Register
                  </Button>
                </form>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}