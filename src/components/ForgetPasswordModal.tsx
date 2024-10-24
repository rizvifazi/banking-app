import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ForgetPasswordModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (answers: string[]) => void
  securityQuestions: string[]
}

export default function ForgetPasswordModal({ show, onClose, onSubmit, securityQuestions }: ForgetPasswordModalProps) {
  const [answers, setAnswers] = useState(['', '', ''])
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (answers.some(answer => answer.trim() === '')) {
      setError('Please answer all security questions')
      return
    }
    setError('')
    onSubmit(answers)
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {securityQuestions.map((question, index) => (
            <div key={index} className="grid gap-4 py-4">
              <Label htmlFor={`question-${index}`}>{question}</Label>
              <Input
                id={`question-${index}`}
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[index] = e.target.value
                  setAnswers(newAnswers)
                }}
                placeholder="Your answer"
                required
              />
            </div>
          ))}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}