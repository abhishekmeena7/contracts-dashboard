"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Search, FileText, ExternalLink } from "lucide-react"

export function EvidencePanel({ evidence }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  if (!evidence || evidence.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Supporting Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No evidence snippets available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return "text-chart-2"
    if (relevance >= 0.6) return "text-chart-4"
    return "text-chart-3"
  }

  const getRelevanceVariant = (relevance) => {
    if (relevance >= 0.8) return "default"
    if (relevance >= 0.6) return "secondary"
    return "destructive"
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Supporting Evidence
            <Badge variant="secondary" className="ml-2">
              {evidence.length} snippets
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {evidence.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{item.source}</span>
                      <Badge variant={getRelevanceVariant(item.relevance)} className="text-xs">
                        {Math.round(item.relevance * 100)}% relevant
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.snippet}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Relevance</span>
                    <Progress value={item.relevance * 100} className="h-2 flex-1 max-w-[100px]" />
                    <span className={`text-xs font-medium ${getRelevanceColor(item.relevance)}`}>
                      {Math.round(item.relevance * 100)}%
                    </span>
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedEvidence(item)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Evidence Details
                        </SheetTitle>
                        <SheetDescription>Detailed view of contract evidence and source information</SheetDescription>
                      </SheetHeader>

                      {selectedEvidence && (
                        <div className="mt-6 space-y-6">
                          {/* Source Information */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">Source</h4>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm font-medium">{selectedEvidence.source}</p>
                            </div>
                          </div>

                          {/* Relevance Score */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">Relevance Score</h4>
                            <div className="flex items-center gap-3">
                              <Progress value={selectedEvidence.relevance * 100} className="h-3 flex-1" />
                              <Badge variant={getRelevanceVariant(selectedEvidence.relevance)}>
                                {Math.round(selectedEvidence.relevance * 100)}%
                              </Badge>
                            </div>
                          </div>

                          {/* Full Snippet */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">Full Text</h4>
                            <div className="bg-muted rounded-lg p-4">
                              <p className="text-sm leading-relaxed">{selectedEvidence.snippet}</p>
                            </div>
                          </div>

                          {/* Context */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">Context</h4>
                            <div className="bg-muted rounded-lg p-4">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                This evidence snippet was extracted from the contract document and is relevant to the
                                risk analysis and clause interpretation. The relevance score indicates how closely this
                                text relates to the identified risks and contractual obligations.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
