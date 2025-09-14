"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { Alert, AlertDescription } from "../ui/alert"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const UPLOAD_STATUS = {
  PENDING: "pending",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
}

export function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Listen for custom upload modal events
  useEffect(() => {
    const handleOpenUpload = () => {
      if (!isOpen) {
        // This would be handled by parent component
        const event = new CustomEvent("requestOpenUploadModal")
        window.dispatchEvent(event)
      }
    }

    window.addEventListener("openUploadModal", handleOpenUpload)
    return () => window.removeEventListener("openUploadModal", handleOpenUpload)
  }, [isOpen])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }, [])

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      // Accept common document formats
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/rtf",
      ]
      return validTypes.includes(file.type) || file.name.toLowerCase().endsWith(".pdf")
    })

    const fileObjects = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      status: UPLOAD_STATUS.PENDING,
      progress: 0,
      error: null,
    }))

    setFiles((prev) => [...prev, ...fileObjects])

    // Start upload simulation for each file
    fileObjects.forEach((fileObj) => {
      simulateUpload(fileObj.id)
    })
  }

  const simulateUpload = async (fileId) => {
    // Update status to uploading
    setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: UPLOAD_STATUS.UPLOADING, progress: 0 } : f)))

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))

      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
    }

    // Simulate random success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1

    await new Promise((resolve) => setTimeout(resolve, 500))

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: isSuccess ? UPLOAD_STATUS.SUCCESS : UPLOAD_STATUS.ERROR,
              progress: isSuccess ? 100 : 0,
              error: isSuccess ? null : "Upload failed. Please try again.",
            }
          : f,
      ),
    )
  }

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const retryUpload = (fileId) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: UPLOAD_STATUS.PENDING, progress: 0, error: null } : f)),
    )
    simulateUpload(fileId)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case UPLOAD_STATUS.UPLOADING:
        return <Loader2 className="h-4 w-4 animate-spin text-accent" />
      case UPLOAD_STATUS.SUCCESS:
        return <CheckCircle className="h-4 w-4 text-chart-2" />
      case UPLOAD_STATUS.ERROR:
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case UPLOAD_STATUS.UPLOADING:
        return <Badge variant="secondary">Uploading</Badge>
      case UPLOAD_STATUS.SUCCESS:
        return <Badge variant="default">Success</Badge>
      case UPLOAD_STATUS.ERROR:
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const handleClose = () => {
    setFiles([])
    onClose()
  }

  const successCount = files.filter((f) => f.status === UPLOAD_STATUS.SUCCESS).length
  const errorCount = files.filter((f) => f.status === UPLOAD_STATUS.ERROR).length
  const uploadingCount = files.filter((f) => f.status === UPLOAD_STATUS.UPLOADING).length

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Contracts
          </DialogTitle>
          <DialogDescription>
            Upload contract documents for analysis. Supported formats: PDF, DOC, DOCX, TXT, RTF
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-accent/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Drag & drop files here</h3>
            <p className="text-muted-foreground mb-4">or click to browse and select files</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mb-2">
              Browse Files
            </Button>
            <p className="text-xs text-muted-foreground">Maximum file size: 10MB per file</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Summary */}
          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-2">{successCount}</div>
                <div className="text-xs text-muted-foreground">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{uploadingCount}</div>
                <div className="text-xs text-muted-foreground">Uploading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Upload Progress</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((fileObj) => (
                  <div key={fileObj.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getStatusIcon(fileObj.status)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{fileObj.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(fileObj.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(fileObj.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileObj.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {fileObj.status === UPLOAD_STATUS.UPLOADING && (
                      <div className="space-y-1">
                        <Progress value={fileObj.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{fileObj.progress}% uploaded</p>
                      </div>
                    )}

                    {fileObj.status === UPLOAD_STATUS.ERROR && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                          <span className="text-xs">{fileObj.error}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => retryUpload(fileObj.id)}
                            className="h-6 text-xs"
                          >
                            Retry
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          {files.length > 0 && successCount > 0 && (
            <Button onClick={handleClose}>Done ({successCount} uploaded)</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
