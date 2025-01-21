/**
 * @version 1.0.0
 * @description Working version of API key management dashboard
 * Last updated: 2024-01-20
 */

'use client'

import { useState } from 'react'
import { initialApiKeys } from './mock-data'
import { CreateApiKeyDialog } from './components/create-api-key-dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table'

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState(initialApiKeys)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState({})
  const [editingKey, setEditingKey] = useState(null)

  const handleCreateKey = (data) => {
    const newKey = {
      id: Date.now(),
      name: data.name,
      key: `pk_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      usage: Math.floor(Math.random() * 200),  // Random usage between 0-200 for testing
      usageLimit: data.usageLimit,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    }
    setApiKeys([...apiKeys, newKey])
  }

  const handleEditKey = (data) => {
    setApiKeys(keys => keys.map(key => 
      key.id === data.id ? { ...key, name: data.name, usageLimit: data.usageLimit } : key
    ))
    setEditingKey(null)
  }

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key)
      .then(() => alert('API key copied to clipboard!'))
      .catch(() => alert('Failed to copy API key'))
  }

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const maskKey = (key) => {
    const firstNonAlpha = key.search(/[^a-zA-Z]/);
    if (firstNonAlpha === -1) return key;
    return key.slice(0, firstNonAlpha) + '•'.repeat(key.length - firstNonAlpha);
  }

  const calculateTotalUsage = () => {
    return apiKeys.reduce((total, key) => total + key.usage, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffc4bc]/40 via-[#9198e5]/30 to-[#66a5ff]/40 
                    dark:from-[#ffc4bc]/10 dark:via-[#9198e5]/10 dark:to-[#66a5ff]/10">
      <div className="container mx-auto p-8 max-w-6xl">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Operational</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </button>
          </div>
        </div>

        {/* Main Card - Updated with new gradient */}
        <div className="rounded-3xl bg-gradient-to-r from-[#ffc4bc] via-[#9198e5] to-[#66a5ff] p-8 mb-8 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="inline-block px-4 py-1 rounded-full bg-white/25 backdrop-blur-sm text-sm text-white">
                  CURRENT PLAN
                </div>
              </div>
              <button className="rounded-full bg-white/25 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                Manage Plan
              </button>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">Researcher</h1>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-white/90">API LIMIT</span>
                    <div className="group relative">
                      <button className="text-white/70 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4"/>
                          <path d="M12 8h.01"/>
                        </svg>
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        Your combined monthly usage from all your keys, including deleted ones cannot exceed your plan's limit.
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-black/90"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/20">
                    <div 
                      className="h-full rounded-full bg-white/50 transition-all duration-500"
                      style={{ width: `${(calculateTotalUsage() / 1000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-semibold text-white/90">
                    {calculateTotalUsage()}/1,000 Credits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="rounded-2xl bg-[#f8f9fa]/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm shadow-lg border border-[#e9ecef]/40 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">API Keys</h2>
              <p className="text-muted-foreground">
                Manage your API keys for accessing the platform.
              </p>
            </div>
            <button 
              className="rounded-full bg-black text-white dark:bg-white dark:text-black
                         hover:bg-black/90 dark:hover:bg-white/90 transition-colors
                         px-6 py-2.5 font-medium flex items-center gap-2 text-sm"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <span className="text-lg">+</span>
              Create New API Key
            </button>
          </div>

          <div className="rounded-xl overflow-hidden bg-white/90 dark:bg-black/40 border border-[#e9ecef]/40">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#f1f3f5]/70 dark:hover:bg-white/5">
                  <TableHead className="font-medium text-sm">NAME</TableHead>
                  <TableHead className="font-medium text-sm">USAGE</TableHead>
                  <TableHead className="font-medium text-sm">KEY</TableHead>
                  <TableHead className="font-medium text-sm">OPTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id} className="hover:bg-[#f1f3f5]/70 dark:hover:bg-white/5">
                    <TableCell className="font-medium">
                      {apiKey.name}
                    </TableCell>
                    <TableCell>{apiKey.usage}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-[#f1f3f5] dark:bg-white/10 px-3 py-1.5 rounded-lg font-mono text-sm">
                          {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <button 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys[apiKey.id] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                          )}
                        </button>
                        <button 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => handleCopyKey(apiKey.key)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        </button>
                        <button 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setEditingKey(apiKey)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteKey(apiKey.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button className="mt-4 rounded-lg border border-border/40 px-6 py-2 text-sm font-medium hover:bg-muted/50">
            Contact us
          </button>
        </div>

        {/* Add the dialog */}
        <CreateApiKeyDialog 
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateKey={handleCreateKey}
        />
        <CreateApiKeyDialog 
          isOpen={!!editingKey}
          onClose={() => setEditingKey(null)}
          onCreateKey={(data) => handleEditKey({ ...data, id: editingKey?.id })}
          initialData={editingKey}
        />
      </div>
    </div>
  )
} 