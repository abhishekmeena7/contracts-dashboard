"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Alert, AlertDescription } from "../ui/alert"
import { Brain, AlertTriangle, Info, CheckCircle } from "lucide-react"

export function AIInsights({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No AI insights available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskIcon = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return AlertTriangle
      case "medium":
        return Info
      case "low":
        return CheckCircle
      default:
        return Info
    }
  }

  const getRiskVariant = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "secondary"
    }
  }

  const getRiskAlertVariant = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Risk Analysis & Recommendations
          <Badge variant="secondary" className="ml-2">
            {insights.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const RiskIcon = getRiskIcon(insight.risk)
            return (
              <Alert key={index} variant={getRiskAlertVariant(insight.risk)}>
                <RiskIcon className="h-4 w-4" />
                <AlertDescription className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getRiskVariant(insight.risk)} className="text-xs">
                        {insight.risk} Risk
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{insight.message}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-destructive">
                {insights.filter((i) => i.risk?.toLowerCase() === "high").length}
              </div>
              <div className="text-xs text-muted-foreground">High Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-chart-4">
                {insights.filter((i) => i.risk?.toLowerCase() === "medium").length}
              </div>
              <div className="text-xs text-muted-foreground">Medium Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-chart-2">
                {insights.filter((i) => i.risk?.toLowerCase() === "low").length}
              </div>
              <div className="text-xs text-muted-foreground">Low Risk</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
