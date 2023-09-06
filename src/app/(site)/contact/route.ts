import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"
import { Resend } from "resend"

import { contact } from "@/data/contact"

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) throw new Error("process.env.RESEND_API_KEY is not defined")

    const name = formData.get("name")
    if (!name || typeof name !== "string") throw new Error("name should be a string")

    const email = formData.get("email")
    if (!email || typeof email !== "string") throw new Error("email should be a string")

    const subject = formData.get("subject")
    if (!subject || typeof subject !== "string") throw new Error("subject should be a string")

    const message = formData.get("message")
    if (!message || typeof message !== "string") throw new Error("message should be a string")

    const resend = new Resend(resendApiKey)
    await resend.emails.send({
      from: "website@kevinwolf.cr",
      to: contact.social.email,
      cc: email,
      subject: `Message from website: ${subject}`,
      html: [
        "<strong>Subject:</strong>",
        subject,
        "",
        "<strong>From:</strong>",
        email,
        "",
        "<strong>Message:</strong>",
        message,
      ].join("<br />"),
    })

    return NextResponse.json({ status: "success", data: "Message received! I'll get back to you as soon as possible." })
  } catch (err) {
    return NextResponse.json({ status: "error", data: err instanceof Error ? err.message : "Unknown Error" })
  }
}
