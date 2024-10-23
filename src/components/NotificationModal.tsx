import React from 'react'
//import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface NotificationModalProps {
  show: boolean
  onClose: () => void
  notification: {
    id: string
    message: string
    details: string
    timestamp: string
  } | null
}

//const [selectedNotification, setSelectedNotification] = useState(null)
//const [showNotificationDetails, setShowNotificationDetails] = useState(false)

export default function NotificationModal({ show, onClose, notification }: NotificationModalProps) {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notification Details</DialogTitle>
        </DialogHeader>
        {notification && (
          <div className="space-y-4">
            <p><strong>{notification.message}</strong></p>
            <p>{notification.details}</p>
            <p className="text-sm text-gray-500">{notification.timestamp}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}