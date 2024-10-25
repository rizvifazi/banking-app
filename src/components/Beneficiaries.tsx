"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Beneficiary {
  id: number
  firstName: string
  lastName: string
  bankName: string
  accountNumber: string
}

// This should be imported from your Payments module
const bankList = [
  "Bank of America",
  "JPMorgan Chase",
  "Wells Fargo",
  "Citibank",
  "U.S. Bank",
  "PNC Bank",
  "Capital One",
  "TD Bank",
  "Bank of New York Mellon",
  "State Street Corporation"
]

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bankName: '',
    accountNumber: ''
  })
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<Beneficiary | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      bankName: '',
      accountNumber: ''
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newBeneficiary = {
      id: Date.now(),
      ...formData
    }
    setBeneficiaries(prev => [...prev, newBeneficiary])
    resetForm()
  }

  const handleEdit = (beneficiary: Beneficiary) => {
    setEditingBeneficiary(beneficiary)
    setFormData(beneficiary)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingBeneficiary) {
      setBeneficiaries(prev =>
        prev.map(b => b.id === editingBeneficiary.id ? { ...editingBeneficiary, ...formData } : b)
      )
      setIsEditModalOpen(false)
      setEditingBeneficiary(null)
    }
  }

  const handleDelete = (beneficiary: Beneficiary) => {
    setBeneficiaryToDelete(beneficiary)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (beneficiaryToDelete) {
      setBeneficiaries(prev => prev.filter(b => b.id !== beneficiaryToDelete.id))
      setIsDeleteModalOpen(false)
      setBeneficiaryToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Select name="bankName" value={formData.bankName} onValueChange={(value) => handleSelectChange(value, 'bankName')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {bankList.map((bank) => (
                  <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              pattern="\d{8}"
              maxLength={8}
              placeholder="8-digit account number"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
          <Button type="submit">Add Beneficiary</Button>
        </div>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beneficiaries.map((beneficiary) => (
            <TableRow key={beneficiary.id}>
              <TableCell>{beneficiary.firstName}</TableCell>
              <TableCell>{beneficiary.lastName}</TableCell>
              <TableCell>{beneficiary.bankName}</TableCell>
              <TableCell>{beneficiary.accountNumber}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(beneficiary)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(beneficiary)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Beneficiary</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editFirstName">First Name</Label>
                <Input
                  id="editFirstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editLastName">Last Name</Label>
                <Input
                  id="editLastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editBankName">Bank Name</Label>
                <Select name="bankName" value={formData.bankName} onValueChange={(value) => handleSelectChange(value, 'bankName')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankList.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editAccountNumber">Account Number</Label>
                <Input
                  id="editAccountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  pattern="\d{8}"
                  maxLength={8}
                  placeholder="8-digit account number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this beneficiary?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the beneficiary from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}