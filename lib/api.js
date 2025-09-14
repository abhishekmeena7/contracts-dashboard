// Mock API functions for contract management

export async function fetchContracts() {
  try {
    const response = await fetch("/contracts.json")
    if (!response.ok) {
      throw new Error("Failed to fetch contracts")
    }
    const contracts = await response.json()
    return contracts
  } catch (error) {
    console.error("Error fetching contracts:", error)
    throw error
  }
}

export async function fetchContractById(id) {
  try {
    // First try to fetch from individual contract detail files
    const detailResponse = await fetch(`/contract-details/${id}.json`)
    if (detailResponse.ok) {
      return await detailResponse.json()
    }

    // Fallback to generating mock data from contracts list
    const contracts = await fetchContracts()
    const contract = contracts.find((c) => c.id === id)

    if (!contract) {
      throw new Error("Contract not found")
    }

    // Generate mock detailed contract data
    const detailedContract = {
      ...contract,
      start: "2023-01-01", // Mock start date
      clauses: generateMockClauses(contract),
      insights: generateMockInsights(contract),
      evidence: generateMockEvidence(contract),
    }

    return detailedContract
  } catch (error) {
    console.error("Error fetching contract details:", error)
    throw error
  }
}

function generateMockClauses(contract) {
  const clauseTemplates = [
    { title: "Termination", summary: "90 days notice period required for contract termination.", confidence: 0.82 },
    { title: "Liability Cap", summary: "Total liability limited to 12 months' fees.", confidence: 0.87 },
    { title: "Data Protection", summary: "GDPR compliance required for all data processing.", confidence: 0.91 },
    { title: "Intellectual Property", summary: "All IP rights remain with respective parties.", confidence: 0.78 },
    { title: "Payment Terms", summary: "Net 30 payment terms with 1.5% monthly late fees.", confidence: 0.85 },
    { title: "Confidentiality", summary: "5-year confidentiality obligation post-termination.", confidence: 0.79 },
    {
      title: "Force Majeure",
      summary: "Standard force majeure clause excluding foreseeable events.",
      confidence: 0.73,
    },
    { title: "Governing Law", summary: "Agreement governed by laws of Delaware.", confidence: 0.88 },
  ]

  // Return 3-5 random clauses
  const numClauses = Math.floor(Math.random() * 3) + 3
  return clauseTemplates
    .sort(() => 0.5 - Math.random())
    .slice(0, numClauses)
    .map((clause) => ({
      ...clause,
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
    }))
}

function generateMockInsights(contract) {
  const riskTemplates = {
    high: [
      "Liability cap excludes data breach costs, creating potential exposure.",
      "Broad force majeure clause may excuse performance inappropriately.",
      "Automatic renewal terms may lead to unintended contract extensions.",
      "Indemnification obligations are one-sided and overly broad.",
    ],
    medium: [
      "Contract auto-renews unless cancelled 60 days before expiry.",
      "Late payment fees compound monthly at 1.5% rate.",
      "Termination clause requires 90-day notice period.",
      "Confidentiality obligations extend 5 years post-termination.",
    ],
    low: [
      "Standard termination clause provides adequate notice period.",
      "Governing law clause is clearly defined and appropriate.",
      "Payment terms are industry standard at Net 30.",
      "IP ownership provisions are clearly delineated.",
    ],
  }

  const insights = []

  // Add insights based on contract risk level
  if (contract.risk === "High") {
    insights.push(
      { risk: "High", message: riskTemplates.high[Math.floor(Math.random() * riskTemplates.high.length)] },
      { risk: "High", message: riskTemplates.high[Math.floor(Math.random() * riskTemplates.high.length)] },
      { risk: "Medium", message: riskTemplates.medium[Math.floor(Math.random() * riskTemplates.medium.length)] },
    )
  } else if (contract.risk === "Medium") {
    insights.push(
      { risk: "Medium", message: riskTemplates.medium[Math.floor(Math.random() * riskTemplates.medium.length)] },
      { risk: "Medium", message: riskTemplates.medium[Math.floor(Math.random() * riskTemplates.medium.length)] },
      { risk: "Low", message: riskTemplates.low[Math.floor(Math.random() * riskTemplates.low.length)] },
    )
  } else {
    insights.push(
      { risk: "Low", message: riskTemplates.low[Math.floor(Math.random() * riskTemplates.low.length)] },
      { risk: "Low", message: riskTemplates.low[Math.floor(Math.random() * riskTemplates.low.length)] },
      { risk: "Medium", message: riskTemplates.medium[Math.floor(Math.random() * riskTemplates.medium.length)] },
    )
  }

  return insights
}

function generateMockEvidence(contract) {
  const evidenceTemplates = [
    {
      source: "Section 12.2 - Limitation of Liability",
      snippet:
        "Total liability shall be limited to the aggregate amount of fees paid in the twelve (12) months preceding the claim.",
      relevance: 0.91,
    },
    {
      source: "Section 8.1 - Termination",
      snippet: "Either party may terminate this agreement with ninety (90) days written notice to the other party.",
      relevance: 0.85,
    },
    {
      source: "Section 15.3 - Automatic Renewal",
      snippet: "This agreement shall automatically renew for successive one-year terms unless terminated.",
      relevance: 0.78,
    },
    {
      source: "Section 4.2 - Payment Terms",
      snippet:
        "Payment shall be due within thirty (30) days of invoice date. Late payments shall incur interest at 1.5% per month.",
      relevance: 0.82,
    },
    {
      source: "Section 9 - Confidentiality",
      snippet:
        "Each party agrees to maintain confidentiality of proprietary information for a period of five (5) years.",
      relevance: 0.79,
    },
  ]

  // Return 2-4 random evidence snippets
  const numEvidence = Math.floor(Math.random() * 3) + 2
  return evidenceTemplates
    .sort(() => 0.5 - Math.random())
    .slice(0, numEvidence)
    .map((evidence) => ({
      ...evidence,
      relevance: Math.random() * 0.3 + 0.7, // Random relevance between 0.7-1.0
    }))
}

// Dashboard statistics
export async function fetchDashboardStats() {
  try {
    const contracts = await fetchContracts()

    const totalContracts = contracts.length
    const highRiskContracts = contracts.filter((c) => c.risk === "High").length
    const expiringContracts = contracts.filter((c) => {
      const expiryDate = new Date(c.expiry)
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      return expiryDate <= thirtyDaysFromNow && expiryDate >= new Date()
    }).length
    const activeContracts = contracts.filter((c) => c.status === "Active").length

    return {
      totalContracts,
      highRiskContracts,
      expiringContracts,
      activeContracts,
      completedReviews: Math.floor(totalContracts * 0.6), // Mock 60% completion rate
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

export function getRiskColor(risk) {
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

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "active":
      return "default"
    case "renewal due":
      return "secondary"
    case "expired":
      return "destructive"
    default:
      return "secondary"
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Mock upload API
export async function uploadContract(file) {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate 90% success rate
  if (Math.random() > 0.1) {
    return {
      success: true,
      contractId: `c${Date.now()}`,
      message: "Contract uploaded successfully",
    }
  } else {
    throw new Error("Upload failed. Please try again.")
  }
}
