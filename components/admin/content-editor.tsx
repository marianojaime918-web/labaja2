"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updatePageContent } from "@/app/actions/content-actions"
import { useRouter } from "next/navigation"

interface ContentEditorProps {
  slug: string
  initialContent: string
}

export function ContentEditor({ slug, initialContent }: ContentEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Parse initial content to state
  const [content, setContent] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(initialContent)
    } catch {
      return {}
    }
  })

  // Keep track of raw JSON strings for object/array fields
  const [jsonEdits, setJsonEdits] = useState<Record<string, string>>(() => {
    const edits: Record<string, string> = {}
    try {
      const parsed = JSON.parse(initialContent)
      Object.entries(parsed).forEach(([key, value]) => {
        if (typeof value === 'object') {
          edits[key] = JSON.stringify(value, null, 2)
        }
      })
    } catch {}
    return edits
  })

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleJsonChange = (key: string, value: string) => {
    setJsonEdits(prev => ({ ...prev, [key]: value }))
    try {
      const parsed = JSON.parse(value)
      // Update the main content state only if valid JSON
      handleChange(key, parsed)
    } catch {
      // Invalid JSON, ignore for main state but keep in local edit state
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Use the current content state, but maybe we should validate jsonEdits?
      // If jsonEdits has invalid JSON, content state won't be updated.
      // So content state is always valid JSON object (or whatever it was last valid).
      
      const result = await updatePageContent(slug, JSON.stringify(content))
      if (result.success) {
        alert("Content updated successfully")
        router.refresh()
      } else {
        alert("Error updating: " + result.error)
      }
    } catch (error) {
      console.error(error)
      alert("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center sticky top-4 z-10 bg-white/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-semibold">Editing: {slug}</h2>
        <Button onClick={handleSave} disabled={loading} size="lg" className="shadow-lg">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-8 bg-white p-8 rounded-lg border shadow-sm">
        {Object.entries(content).map(([key, value]) => {
          const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())

          // Handle Objects/Arrays (JSON Editor)
          if (typeof value === 'object') {
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={key} className="font-bold text-blue-900">{label} (JSON)</Label>
                  <span className="text-xs text-muted-foreground">Edit carefully (JSON format)</span>
                </div>
                <Textarea 
                  id={key}
                  value={jsonEdits[key] || JSON.stringify(value, null, 2)}
                  onChange={(e) => handleJsonChange(key, e.target.value)}
                  className="font-mono text-xs min-h-[200px] bg-slate-50"
                />
              </div>
            )
          }

          // Handle Long Strings (Textarea)
          const isLongText = typeof value === 'string' && value.length > 60
          
          if (isLongText) {
             return (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="font-bold text-gray-700">{label}</Label>
                <Textarea 
                  id={key} 
                  value={value} 
                  onChange={(e) => handleChange(key, e.target.value)} 
                  className="min-h-[120px]"
                />
              </div>
            )
          }

          // Handle Short Strings/Numbers (Input)
          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="font-bold text-gray-700">{label}</Label>
              <Input 
                id={key} 
                value={value} 
                onChange={(e) => handleChange(key, e.target.value)} 
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
