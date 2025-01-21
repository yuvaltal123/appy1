'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox.jsx"
import React from 'react'

export function CreateApiKeyDialog({ isOpen, onClose, onCreateKey, initialData }) {
  const [keyName, setKeyName] = useState(initialData?.name || '')
  const [limitUsage, setLimitUsage] = useState(initialData?.usageLimit ? true : false)
  const [usageLimit, setUsageLimit] = useState(initialData?.usageLimit?.toString() || '1000')

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setKeyName(initialData?.name || '')
      setLimitUsage(initialData?.usageLimit ? true : false)
      setUsageLimit(initialData?.usageLimit?.toString() || '1000')
    }
  }, [isOpen, initialData])

  const handleCreate = () => {
    onCreateKey({
      name: keyName,
      usageLimit: limitUsage ? parseInt(usageLimit) : null
    })
    setKeyName('')
    setLimitUsage(false)
    setUsageLimit('1000')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#f8f9fa]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#e9ecef]/40">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {initialData ? 'Edit API Key' : 'Create a new API Key'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Key Name
              <span className="text-xs text-muted-foreground ml-1">
                — A unique name to identify this key
              </span>
            </label>
            <Input
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key Name"
              className="w-full bg-white/50 dark:bg-black/20"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limit"
              checked={limitUsage}
              onCheckedChange={setLimitUsage}
            />
            <label
              htmlFor="limit"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Limit monthly usage*
            </label>
          </div>
          {limitUsage && (
            <Input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full bg-white/50 dark:bg-black/20"
            />
          )}
          <p className="text-xs text-muted-foreground">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
        </div>
        <DialogFooter className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-full bg-black text-white dark:bg-white dark:text-black
                     hover:bg-black/90 dark:hover:bg-white/90 transition-colors 
                     px-6 py-2 text-sm font-medium"
          >
            {initialData ? 'Save Changes' : 'Create'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 