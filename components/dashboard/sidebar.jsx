"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { FileText, BarChart3, FileBarChart, Settings, Menu, X, Upload } from "lucide-react"

const navigation = [
  { name: "Contracts", href: "/dashboard", icon: FileText },
  { name: "Insights", href: "/dashboard/insights", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ className }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href) => {
    router.push(href)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-sidebar-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">ContractHub</h1>
                <p className="text-xs text-muted-foreground">Contract Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-11 px-4 text-left font-medium",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </nav>

          {/* Upload button */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              className="w-full bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-accent-foreground"
              onClick={() => {
                // This will be handled by the upload modal
                const event = new CustomEvent("openUploadModal")
                window.dispatchEvent(event)
                setIsMobileOpen(false)
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Contract
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
