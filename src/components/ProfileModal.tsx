import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ProfileModalProps {
  show: boolean
  onClose: () => void
  userProfile: Record<string, string>
  profileTab: string
  setProfileTab: (tab: string) => void
  handleProfileUpdate: (event: React.FormEvent<HTMLFormElement>) => void
  handlePasswordReset: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function ProfileModal({
  show,
  onClose,
  userProfile,
  profileTab,
  setProfileTab,
  handleProfileUpdate,
  handlePasswordReset
}: ProfileModalProps) {
  const renderProfileContent = () => {
    switch (profileTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            {Object.entries(userProfile).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )
      case 'edit':
        return (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {Object.entries(userProfile).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input id={key} name={key} defaultValue={value} />
              </div>
            ))}
            <Button type="submit">Save Changes</Button>
          </form>
        )
      case 'security':
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" name="newPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" name="confirmPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-1">Security Question 1</Label>
              <Select name="securityQuestion1">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">What was the name of your first pet?</SelectItem>
                  <SelectItem value="school">What elementary school did you attend?</SelectItem>
                  <SelectItem value="city">In what city were you born?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-1" name="securityAnswer1" placeholder="Your answer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-2">Security Question 2</Label>
              <Select name="securityQuestion2">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                  <SelectItem value="car">What was your first car?</SelectItem>
                  <SelectItem value="street">What street did you grow up on?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-2" name="securityAnswer2" placeholder="Your answer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-question-3">Security Question 3</Label>
              <Select name="securityQuestion3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">What is your favorite book?</SelectItem>
                  <SelectItem value="food">What is your favorite food?</SelectItem>
                  <SelectItem value="teacher">Who was your favorite teacher?</SelectItem>
                </SelectContent>
              </Select>
              <Input id="security-answer-3" name="securityAnswer3" placeholder="Your answer" required />
            </div>
            <Button type="submit">Reset Password</Button>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile information
          </DialogDescription>
        </DialogHeader>
        <Tabs value={profileTab} onValueChange={setProfileTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className="max-h-[60vh] overflow-y-auto pr-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                  <CardDescription>Overview of your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderProfileContent()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="edit">
            <div className="max-h-[60vh] overflow-y-auto pr-4">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderProfileContent()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="max-h-[60vh] overflow-y-auto pr-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security questions</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderProfileContent()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}