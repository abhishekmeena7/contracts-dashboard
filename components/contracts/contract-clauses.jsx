"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { FileText, CheckCircle } from "lucide-react"

export function ContractClauses({ clauses }) {
  if (!clauses || clauses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Clauses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No clauses analyzed yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "text-chart-2"
    if (confidence >= 0.6) return "text-chart-4"
    return "text-chart-3"
  }

  const getConfidenceVariant = (confidence) => {
    if (confidence >= 0.8) return "default"
    if (confidence >= 0.6) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contract Clauses
          <Badge variant="secondary" className="ml-2">
            {clauses.length} clauses
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clauses.map((clause, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-chart-2" />
                    {clause.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{clause.summary}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Confidence Score</span>
                  <Badge variant={getConfidenceVariant(clause.confidence)} className="text-xs">
                    {Math.round(clause.confidence * 100)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Progress value={clause.confidence * 100} className="h-2 flex-1" />
                  <span className={`text-xs font-medium ${getConfidenceColor(clause.confidence)}`}>
                    {Math.round(clause.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
