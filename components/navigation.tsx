"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Wallet, Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/my-score", label: "My Score" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/nft-viewer", label: "NFT Viewer" },
  { href: "/about", label: "About" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
          MEGASCORE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-200 relative uppercase tracking-wide ${
                pathname === item.href ? "text-foreground" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item.label}
              {pathname === item.href && <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-mega-coral" />}
            </Link>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="flex items-center space-x-4">
          <Button className="hidden sm:flex bg-foreground hover:bg-foreground/90 text-background border-0 uppercase tracking-wide text-xs font-medium px-6">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-foreground/10">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm font-medium transition-colors uppercase tracking-wide ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full bg-foreground hover:bg-foreground/90 text-background sm:hidden uppercase tracking-wide text-xs">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
