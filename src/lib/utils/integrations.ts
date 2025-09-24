// src/lib/utils/integrations.ts
import { Integration, IntegrationStatus } from "@/types/integrations"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: IntegrationStatus): {
  bg: string
  text: string
  border: string
} {
  switch (status) {
    case "connected":
      return {
        bg: "bg-green-50",
        text: "text-green-800", 
        border: "border-green-200"
      }
    case "warning":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-800",
        border: "border-yellow-200"
      }
    case "error":
      return {
        bg: "bg-red-50", 
        text: "text-red-800",
        border: "border-red-200"
      }
    default:
      return {
        bg: "bg-gray-50",
        text: "text-gray-800", 
        border: "border-gray-200"
      }
  }
}

export function formatLastSync(lastSync: string): string {
  const now = new Date()
  const syncTime = new Date(lastSync)
  const diffInMinutes = Math.floor((now.getTime() - syncTime.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) {
    return "Just now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days === 1 ? '' : 's'} ago`
  }
}

export function generateApiKey(prefix: string = "qir"): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = `${prefix}_`
  
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

export function maskApiKey(key: string): string {
  if (key.length <= 8) return key
  
  const prefix = key.substring(0, 4)
  const masked = "•".repeat(key.length - 8)
  const suffix = key.substring(key.length - 4)
  
  return `${prefix}${masked}${suffix}`
}

export function validateWebhookUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
  } catch {
    return false
  }
}

export function getIntegrationsByCategory(integrations: Integration[], category: string): Integration[] {
  return integrations.filter(integration => integration.category === category)
}

export function getIntegrationStats(integrations: Integration[]) {
  const stats = integrations.reduce(
    (acc, integration) => {
      acc[integration.status] = (acc[integration.status] || 0) + 1
      return acc
    },
    {} as Record<IntegrationStatus, number>
  )

  return {
    connected: stats.connected || 0,
    warning: stats.warning || 0, 
    error: stats.error || 0,
    notConnected: stats["not-connected"] || 0,
    total: integrations.length
  }
}

export function sortIntegrationsByStatus(integrations: Integration[]): Integration[] {
  const statusOrder: Record<IntegrationStatus, number> = {
    "connected": 1,
    "warning": 2,
    "error": 3,
    "not-connected": 4
  }

  return [...integrations].sort((a, b) => {
    const aOrder = statusOrder[a.status]
    const bOrder = statusOrder[b.status]
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }
    
    return a.name.localeCompare(b.name)
  })
}