import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const KV_REST_API_URL = process.env.KV_REST_API_URL
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN

// Helper to fetch submissions from Vercel KV
async function getKVSubmissions(): Promise<any[]> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error("Vercel KV is not configured on the Vercel Dashboard.")
  }

  const res = await fetch(`${KV_REST_API_URL}/get/submissions`, {
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Vercel KV read failed: ${res.statusText}`)
  }

  const data = await res.json()
  const val = data.result
  if (!val) return []
  return typeof val === "string" ? JSON.parse(val) : val
}

// Helper to write submissions back to Vercel KV
async function saveKVSubmissions(submissions: any[]): Promise<void> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error("Vercel KV is not configured on the Vercel Dashboard.")
  }

  const res = await fetch(`${KV_REST_API_URL}/set/submissions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissions),
  })

  if (!res.ok) {
    throw new Error(`Vercel KV write failed: ${res.statusText}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get the authenticated session
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be authenticated to submit evidence." },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await req.json()
    const { promiseId, evidenceUrl, details } = body

    // 3. Validation
    if (!evidenceUrl || typeof evidenceUrl !== "string") {
      return NextResponse.json(
        { error: "A valid evidence URL is required." },
        { status: 400 }
      )
    }

    try {
      new URL(evidenceUrl)
    } catch (_) {
      return NextResponse.json(
        { error: "The provided evidence link must be a valid absolute URL." },
        { status: 400 }
      )
    }

    if (!details || typeof details !== "string" || details.trim().length === 0) {
      return NextResponse.json(
        { error: "Details and context regarding the evidence are required." },
        { status: 400 }
      )
    }

    // 4. Retrieve existing submissions from Vercel KV
    const submissions = await getKVSubmissions()

    // Create unique ID using timestamp and random hex
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const newSubmission = {
      id: submissionId,
      promiseId: promiseId ? promiseId.trim() : null,
      evidenceUrl: evidenceUrl.trim(),
      details: details.trim(),
      status: "pending",
      submittedBy: {
        name: session.user.name || "Anonymous",
        email: session.user.email || "",
        image: session.user.image || null,
      },
      createdAt: new Date().toISOString(),
    }

    submissions.push(newSubmission)

    // 5. Write back to Vercel KV database
    await saveKVSubmissions(submissions)

    return NextResponse.json(
      { success: true, submission: newSubmission },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Submission API Error:", error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error?.message || error}` },
      { status: 500 }
    )
  }
}
