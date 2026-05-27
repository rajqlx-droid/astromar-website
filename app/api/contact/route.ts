import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, location, message, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>New Enquiry from ${source || "Website"}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ""}
      ${location ? `<p><strong>FTWZ Location Interest:</strong> ${location}</p>` : ""}
      ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
      <hr>
      <p style="color: #888; font-size: 12px;">Sent from www.astromarfreezone.com contact form</p>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Astromar Website <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "sales@astromarfreezone.com"],
      replyTo: email,
      subject: `New Enquiry from ${name}${company ? ` (${company})` : ""}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
