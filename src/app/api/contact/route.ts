import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, company, subject, budgetRange, message } =
      await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const subjectLabels: Record<string, string> = {
      job: "Job Offer",
      project: "Project Inquiry",
      consulting: "Consulting Request",
      other: "General Inquiry",
    };

    const emailSubject = `Portfolio Contact: ${subjectLabels[subject] || subject}`;

    let emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    if (company) {
      emailContent += `<p><strong>Company:</strong> ${company}</p>`;
    }

    emailContent += `<p><strong>Subject:</strong> ${subjectLabels[subject] || subject}</p>`;

    if (budgetRange) {
      const rangeLabel = subject === "job" ? "Salary Range" : "Budget Range";
      emailContent += `<p><strong>${rangeLabel}:</strong> ${budgetRange}</p>`;
    }

    emailContent += `
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "devstefanv@gmail.com",
      replyTo: email,
      subject: emailSubject,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
