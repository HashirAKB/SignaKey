'use client'
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { MoonIcon, SunIcon } from "lucide-react"
import * as ed from "@noble/ed25519"
import * as secp from "@noble/secp256k1"

export default function Signakey() {
  const [theme, setTheme] = useState('light')
  const [ed25519Keys, setEd25519Keys] = useState({ publicKey: '', privateKey: '' })
  const [secp256k1Keys, setSecp256k1Keys] = useState({ publicKey: '', privateKey: '' })
  const [ed25519Signature, setEd25519Signature] = useState('')
  const [secp256k1Signature, setSecp256k1Signature] = useState('')
  const [ed25519Verified, setEd25519Verified] = useState(false)
  const [secp256k1Verified, setSecp256k1Verified] = useState(false)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const generateEd25519Keys = async () => {
    const privateKey = ed.utils.randomPrivateKey()
    const publicKey = await ed.getPublicKeyAsync(privateKey)
    setEd25519Keys({
      privateKey: Buffer.from(privateKey).toString('hex'),
      publicKey: Buffer.from(publicKey).toString('hex')
    })
  }

  const generateSecp256k1Keys = () => {
    const privateKey = secp.utils.randomPrivateKey()
    const publicKey = secp.getPublicKey(privateKey)
    setSecp256k1Keys({
      privateKey: Buffer.from(privateKey).toString('hex'),
      publicKey: Buffer.from(publicKey).toString('hex')
    })
  }

  const signAndVerifyEd25519 = async () => {
    const message = new TextEncoder().encode("hello world")
    const privateKey = Uint8Array.from(Buffer.from(ed25519Keys.privateKey, 'hex'))
    const signature = await ed.signAsync(message, privateKey)
    setEd25519Signature(Buffer.from(signature).toString('hex'))
    const publicKey = Uint8Array.from(Buffer.from(ed25519Keys.publicKey, 'hex'))
    const isValid = await ed.verifyAsync(signature, message, publicKey)
    setEd25519Verified(isValid)
  }

  const signAndVerifySecp256k1 = async () => {
    const msgHash = "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
    const privateKey = Uint8Array.from(Buffer.from(secp256k1Keys.privateKey, 'hex'))
    const signature = await secp.signAsync(msgHash, privateKey)
    // @ts-ignore
    setSecp256k1Signature(Buffer.from(signature).toString('hex'))
    const publicKey = Uint8Array.from(Buffer.from(secp256k1Keys.publicKey, 'hex'))
    const isValid = secp.verify(signature, msgHash, publicKey)
    setSecp256k1Verified(isValid)
  }

  return (
    <div className="min-h-screen min-w-screen p-10 md:p-20 bg-gradient-to-br from-teal-100 to-purple-200 dark:from-teal-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">SignaKey</h1>
          <div className="flex items-center space-x-2">
            <SunIcon className="h-6 w-6" />
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            <MoonIcon className="h-6 w-6" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>ED25519 (Solana)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateEd25519Keys} className="w-full bg-teal-500 hover:bg-teal-600 text-white">Generate Keypair</Button>
              {ed25519Keys.publicKey && (
                <>
                  <div>
                    <p className="font-semibold">Public Key:</p>
                    <p className="text-xs break-all">{ed25519Keys.publicKey}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Private Key:</p>
                    <p className="text-xs break-all">{ed25519Keys.privateKey}</p>
                  </div>
                  <Button onClick={signAndVerifyEd25519} className="w-full bg-purple-500 hover:bg-purple-600 text-white">Sign & Verify</Button>
                  {ed25519Signature && (
                    <div>
                      <p className="font-semibold">Signature:</p>
                      <p className="text-xs break-all">{ed25519Signature}</p>
                      <p className="font-semibold mt-2">Verified: {ed25519Verified ? '✅' : '❌'}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>secp256k1 (Ethereum)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateSecp256k1Keys} className="w-full bg-teal-500 hover:bg-teal-600 text-white">Generate Keypair</Button>
              {secp256k1Keys.publicKey && (
                <>
                  <div>
                    <p className="font-semibold">Public Key:</p>
                    <p className="text-xs break-all">{secp256k1Keys.publicKey}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Private Key:</p>
                    <p className="text-xs break-all">{secp256k1Keys.privateKey}</p>
                  </div>
                  <Button onClick={signAndVerifySecp256k1} className="w-full bg-purple-500 hover:bg-purple-600 text-white">Sign & Verify</Button>
                  {secp256k1Signature && (
                    <div>
                      <p className="font-semibold">Signature:</p>
                      <p className="text-xs break-all">{secp256k1Signature}</p>
                      <p className="font-semibold mt-2">Verified: {secp256k1Verified ? '✅' : '❌'}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}