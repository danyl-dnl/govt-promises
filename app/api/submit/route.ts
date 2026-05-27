import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"

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

    // 4. File system operations to write to local database
    const dbPath = path.join(process.cwd(), "data", "submissions.json")
    let submissions = []

    if (fs.existsSync(dbPath)) {
      try {
        const fileData = fs.readFileSync(dbPath, "utf8")
        submissions = JSON.parse(fileData)
      } catch (err) {
        console.error("Error reading submissions database:", err)
        submissions = []
      }
    }

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

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2), "utf8")

    return NextResponse.json(
      { success: true, submission: newSubmission },
      { status: 201 }
    )
  } catch (error) {
    console.error("Submission API Error:", error)
    return NextResponse.json(
      { error: "An internal server error occurred while processing your submission." },
      { status: 500 }
    )
  }
}
