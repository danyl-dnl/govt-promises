import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"

// Helper function to check if the session user is an authorized admin
function isAdmin(email?: string | null): boolean {
  if (!email) return false
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ""
  const adminEmails = adminEmailsEnv
    .split(",")
    .map((e) => e.trim().toLowerCase())
  return adminEmails.includes(email.toLowerCase())
}

// 1. GET - Fetch all submissions (Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Access Denied: You are not authorized to view this page." },
        { status: 403 }
      )
    }

    const dbPath = path.join(process.cwd(), "data", "submissions.json")
    let submissions = []

    if (fs.existsSync(dbPath)) {
      try {
        const fileData = fs.readFileSync(dbPath, "utf8")
        submissions = JSON.parse(fileData)
      } catch (err) {
        console.error("Error reading submissions database:", err)
      }
    }

    // Sort submissions newest first
    submissions.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ success: true, submissions })
  } catch (error) {
    console.error("Admin Submissions GET Error:", error)
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    )
  }
}

// 2. PATCH - Update submission status (Admin Only)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Access Denied: You are not authorized to perform this action." },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status." },
        { status: 400 }
      )
    }

    const allowedStatuses = ["pending", "approved", "rejected"]
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Allowed values are pending, approved, or rejected." },
        { status: 400 }
      )
    }

    const dbPath = path.join(process.cwd(), "data", "submissions.json")
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { error: "Submissions database file not found." },
        { status: 404 }
      )
    }

    let submissions = []
    try {
      const fileData = fs.readFileSync(dbPath, "utf8")
      submissions = JSON.parse(fileData)
    } catch (err) {
      console.error("Error reading submissions database:", err)
      return NextResponse.json(
        { error: "Error reading data file." },
        { status: 500 }
      )
    }

    // Find and update target submission
    const index = submissions.findIndex((sub: any) => sub.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Submission not found with the provided ID." },
        { status: 404 }
      )
    }

    submissions[index].status = status
    submissions[index].lastUpdatedBy = session.user.email
    submissions[index].lastUpdatedAt = new Date().toISOString()

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2), "utf8")

    return NextResponse.json({
      success: true,
      submission: submissions[index],
    })
  } catch (error) {
    console.error("Admin Submissions PATCH Error:", error)
    return NextResponse.json(
      { error: "An internal server error occurred while updating the status." },
      { status: 500 }
    )
  }
}
