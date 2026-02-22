import type { Metadata } from 'next'
import FileVault from '@/components/vault/FileVault'

export const metadata: Metadata = {
  title: 'Secure File Vault',
  description: 'Encrypted personal files protected by your anonymous recovery key.',
}

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <FileVault />
    </div>
  )
}
