"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { getRiskColor, getStatusColor, formatDate } from "../../lib/api"
import { Calendar, Users, FileText, AlertTriangle } from "lucide-react"

export function ContractMetadata({ contract }) {
  if (!contract) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <span className="truncate">{contract.name}</span>
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">Contract ID: {contract.id}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={getStatusColor(contract.status)} className="text-sm">
              {contract.status}
            </Badge>
            <Badge variant={getRiskColor(contract.risk)} className="text-sm">
              {contract.risk} Risk
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Parties */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4 flex-shrink-0" />
              Contracting Parties
            </div>
            <p className="text-sm font-medium leading-relaxed">{contract.parties}</p>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              Start Date
            </div>
            <p className="text-sm font-medium">{formatDate(contract.start)}</p>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              Expiry Date
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{formatDate(contract.expiry)}</p>
              {new Date(contract.expiry) < new Date() && <span className="text-xs text-destructive">Expired</span>}
              {new Date(contract.expiry) > new Date() &&
                new Date(contract.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                  <span className="text-xs text-chart-4">Expiring soon</span>
                )}
            </div>
          </div>

          {/* Risk Score */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Risk Assessment
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getRiskColor(contract.risk)} className="text-sm">
                {contract.risk}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {contract.risk === "High" ? "8.2/10" : contract.risk === "Medium" ? "5.4/10" : "2.1/10"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
