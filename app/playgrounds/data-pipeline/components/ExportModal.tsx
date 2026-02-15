'use client'

import { useState } from 'react'
import { Node, Edge } from 'reactflow'
import { toast } from 'sonner'
import {
  generateTerraform,
  generateCloudFormation,
  generateArchitectureDocs,
} from '@/lib/iac-export'

interface ExportModalProps {
  nodes: Node[]
  edges: Edge[]
  onClose: () => void
}

export default function ExportModal({ nodes, edges, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<'terraform' | 'cloudformation' | 'docs'>('terraform')
  const [provider, setProvider] = useState<'aws' | 'azure' | 'gcp'>('aws')
  const [includeComments, setIncludeComments] = useState(true)
  const [exportedCode, setExportedCode] = useState('')

  const handleExport = () => {
    let code = ''

    switch (format) {
      case 'terraform':
        code = generateTerraform(nodes, edges, provider, includeComments)
        break
      case 'cloudformation':
        code = generateCloudFormation(nodes, edges, includeComments)
        break
      case 'docs':
        code = generateArchitectureDocs(nodes, edges)
        break
    }

    setExportedCode(code)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportedCode)
    toast.success('Copied to clipboard!')
  }

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      terraform: 'tf',
      cloudformation: 'json',
      docs: 'md',
    }

    const blob = new Blob([exportedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data-pipeline.${extensions[format]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📦 Export Infrastructure-as-Code</h2>
            <p className="text-sm text-slate-600 mt-1">
              Convert your pipeline design to deployable infrastructure
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Configuration */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="grid grid-cols-3 gap-4">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="terraform">Terraform (HCL)</option>
                <option value="cloudformation">CloudFormation (JSON)</option>
                <option value="docs">Architecture Docs (MD)</option>
              </select>
            </div>

            {/* Provider Selection (only for Terraform) */}
            {format === 'terraform' && (
              <div>
                <label className="block text-sm font-medium mb-2">Cloud Provider</label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="aws">AWS</option>
                  <option value="azure">Azure</option>
                  <option value="gcp">Google Cloud Platform</option>
                </select>
              </div>
            )}

            {/* Options */}
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeComments}
                  onChange={(e) => setIncludeComments(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm">Include comments</span>
              </label>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            🚀 Generate Infrastructure Code
          </button>
        </div>

        {/* Code Output */}
        {exportedCode && (
          <>
            <div className="flex-1 overflow-hidden p-6">
              <div className="h-full bg-slate-900 rounded-lg overflow-hidden flex flex-col">
                <div className="px-4 py-2 bg-slate-800 flex items-center justify-between border-b border-slate-700">
                  <span className="text-xs text-slate-300 font-mono">
                    {format === 'terraform' && `main.tf (${provider.toUpperCase()})`}
                    {format === 'cloudformation' && 'template.json (AWS)'}
                    {format === 'docs' && 'architecture.md'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyToClipboard}
                      className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
                <pre className="flex-1 overflow-auto p-4 text-xs text-green-400 font-mono leading-relaxed">
                  {exportedCode}
                </pre>
              </div>
            </div>

            {/* Footer with deployment hints */}
            <div className="px-6 py-4 border-t border-slate-200 bg-blue-50">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Next Steps:</p>
                  <ul className="text-blue-800 space-y-1">
                    {format === 'terraform' && (
                      <>
                        <li>• Save this file as <code className="bg-blue-100 px-1 rounded">main.tf</code></li>
                        <li>• Run <code className="bg-blue-100 px-1 rounded">terraform init</code> to initialize</li>
                        <li>• Run <code className="bg-blue-100 px-1 rounded">terraform plan</code> to preview changes</li>
                        <li>• Run <code className="bg-blue-100 px-1 rounded">terraform apply</code> to deploy</li>
                      </>
                    )}
                    {format === 'cloudformation' && (
                      <>
                        <li>• Save this file as <code className="bg-blue-100 px-1 rounded">template.json</code></li>
                        <li>• Deploy via AWS Console or CLI</li>
                        <li>• CLI: <code className="bg-blue-100 px-1 rounded">aws cloudformation create-stack</code></li>
                      </>
                    )}
                    {format === 'docs' && (
                      <>
                        <li>• Save this as <code className="bg-blue-100 px-1 rounded">architecture.md</code></li>
                        <li>• Add to your project documentation</li>
                        <li>• Keep updated as architecture evolves</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
