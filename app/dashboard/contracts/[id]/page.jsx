"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout"
import { ContractMetadata } from "../../../../components/contracts/contract-metadata"
import { ContractClauses } from "../../../../components/contracts/contract-clauses"
import { AIInsights } from "../../../../components/contracts/ai-insights"
import { EvidencePanel } from "../../../../components/contracts/evidence-panel"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent } from "../../../../components/ui/card"
import { fetchContractById } from "../../../../lib/api"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function ContractDetailPage({ params }) {
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    loadContract()
  }, [params.id])

  const loadContract = async () => {
    try {
      setLoading(true)
      const data = await fetchContractById(params.id)
      setContract(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mr-4"></div>
                <span className="text-muted-foreground">Loading contract details...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center py-12 text-center">
                <div>
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Contract</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={loadContract} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Contracts</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        {/* Contract Metadata */}
        <ContractMetadata contract={contract} />

        {/* Main Content Grid - responsive layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ContractClauses clauses={contract?.clauses} />
            <AIInsights insights={contract?.insights} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <EvidencePanel evidence={contract?.evidence} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
