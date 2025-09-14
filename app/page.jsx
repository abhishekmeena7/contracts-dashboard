"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "../../contracts/components/dashboard/dashboard-layout"
import { ContractsTable } from "../../contracts/components/contracts/contracts-table"
import { Card, CardContent, CardHeader, CardTitle } from "../../contracts/components/ui/card"
import { Badge } from "../../contracts/components/ui/badge"
import { fetchDashboardStats } from "../../contracts/lib/api"
import { FileText, AlertTriangle, Clock, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await fetchDashboardStats()
      setStats(data)
    } catch (error) {
      console.error("Error loading stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = stats
    ? [
        {
          title: "Total Contracts",
          value: stats.totalContracts.toString(),
          change: "+2",
          changeType: "positive",
          icon: FileText,
          description: "Active contracts in system",
        },
        {
          title: "High Risk",
          value: stats.highRiskContracts.toString(),
          change: "+1",
          changeType: "negative",
          icon: AlertTriangle,
          description: "Contracts requiring attention",
        },
        {
          title: "Expiring Soon",
          value: stats.expiringContracts.toString(),
          change: "-1",
          changeType: "positive",
          icon: Clock,
          description: "Contracts expiring in 30 days",
        },
        {
          title: "Completed Reviews",
          value: stats.completedReviews.toString(),
          change: "+3",
          changeType: "positive",
          icon: CheckCircle,
          description: "Reviews completed this month",
        },
      ]
    : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Contracts Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage your contract portfolio</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
                    <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-muted rounded animate-pulse w-16 mb-2"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
                  </CardContent>
                </Card>
              ))
            : statsCards.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                        {stat.change}
                      </Badge>
                      <p className="text-xs text-muted-foreground leading-tight">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Contracts table */}
        <ContractsTable />
      </div>
    </DashboardLayout>
  )
}
