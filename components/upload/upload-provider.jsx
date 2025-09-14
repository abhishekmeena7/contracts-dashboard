"use client"

import { useState, useEffect } from "react"
import { UploadModal } from "./upload-modal"

export function UploadProvider({ children }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  useEffect(() => {
    const handleRequestOpenUpload = () => {
      setIsUploadModalOpen(true)
    }

    window.addEventListener("requestOpenUploadModal", handleRequestOpenUpload)
    return () => window.removeEventListener("requestOpenUploadModal", handleRequestOpenUpload)
  }, [])

  return (
    <>
      {children}
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </>
  )
}
