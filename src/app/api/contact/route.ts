import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, botfield } = await request.json();

    // Spam honeypot protection: if a bot fills out 'botfield', pretend it was successful but don't send anything.
    if (botfield) {
      console.warn("Honeypot field triggered. Blocking spam message silently.");
      return NextResponse.json(
        { message: "Message sent successfully!" },
        { status: 200 }
      );
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    console.log("USER:", process.env.GMAIL_USER);
    console.log("PASS:", process.env.GMAIL_APP_PASSWORD ? "FOUND" : "NOT FOUND");
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    // Local / Dev Fallback: If credentials are not present, log to console instead of throwing errors.
    if (!gmailUser || !gmailAppPassword) {
      console.log("=================== PORTFOLIO FORM DEMO ===================");
      console.log(`Date: ${new Date().toISOString()}`);
      console.log(`From: ${name} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message:\n${message}`);
      console.log("==========================================================");

      return NextResponse.json(
        {
          message: "Form received! (Demo Mode: SMTP credentials not set, check server console logs).",
        },
        { status: 200 }
      );
    }

    // Set up Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const mailOptions = {
      from: `"${name}" <${gmailUser}>`, // Must be sender authentication account
      to: "shahinalam4317@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent on: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #0f172a; background-color: #ffffff;">
          <h2 style="color: #38bdf8; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 20px; font-size: 20px; font-weight: bold;">New Message Received</h2>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Sender</p>
            <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 600; color: #1e293b;">${name} (${email})</p>
          </div>

          <div style="margin-bottom: 15px;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Subject</p>
            <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 600; color: #1e293b;">${subject}</p>
          </div>

          <div style="margin-bottom: 25px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 6px;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin: 0; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px; text-align: right;">
            Sent on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer Route Error:", error);
    return NextResponse.json(
      { error: "Unable to process email delivery. Please try again later." },
      { status: 500 }
    );
  }
}


