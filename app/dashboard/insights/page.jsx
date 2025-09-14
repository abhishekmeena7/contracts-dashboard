"use client"

import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { BarChart3 } from "lucide-react"

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contract Insights</h1>
          <p className="text-muted-foreground mt-2">AI-powered analytics and risk assessment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights Dashboard</CardTitle>
            <CardDescription>Advanced analytics and risk assessment tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Insights Coming Soon</h3>
              <p className="text-muted-foreground">
                AI-powered contract insights and analytics will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
