"use client"

import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { FileBarChart } from "lucide-react"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-2">Generate and view contract reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Reports</CardTitle>
            <CardDescription>Comprehensive reporting and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileBarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Reports Coming Soon</h3>
              <p className="text-muted-foreground">Detailed contract reports and analytics will be available here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
