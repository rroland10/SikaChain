import type { ProducerApplication } from "@/app/api/apply/route";

type NotifyPayload = ProducerApplication & { id: string };

type EmailPayload = {
  to: string | string[];
  subject: string;
  text: string;
};

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

async function sendEmail({ to, subject, text }: EmailPayload): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM || "SikaChain <onboarding@sikachain.com>";

  if (!resendKey) return false;

  const recipients = Array.isArray(to) ? to : [to];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: recipients, subject, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function logDev(message: string, details?: string) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[SikaChain] ${message}`, details ?? "");
  }
}

export async function notifyNewApplication(application: NotifyPayload): Promise<void> {
  const adminEmail = process.env.NOTIFY_EMAIL;
  const adminSubject = `New Genesis Producer Application — ${application.org}`;
  const adminBody = `
New Genesis Producer Program application received.

Organization: ${application.org}
Email: ${application.email}
Category: ${application.category}
Jurisdiction: ${application.jurisdiction}
Region: ${application.region || "—"}
Website: ${application.website || "—"}
Reference: ${application.id}
Submitted: ${application.submittedAt}

Technical plan:
${application.infrastructure || "—"}

Ecosystem plan:
${application.ecosystem || "—"}

Compliance:
${application.compliance || "—"}

Review in admin: ${siteUrl()}/admin
`.trim();

  if (adminEmail) {
    const sent = await sendEmail({ to: adminEmail, subject: adminSubject, text: adminBody });
    if (!sent) logDev("Admin notification (Resend unavailable):", application.id);
  } else {
    logDev("New application (no NOTIFY_EMAIL):", `${application.id} ${application.org}`);
  }

  const applicantSubject = "SikaChain Genesis Producer — application received";
  const applicantBody = `
Thank you for applying to the SikaChain Genesis Producer Program.

Organization: ${application.org}
Reference: ${application.id}
Submitted: ${new Date(application.submittedAt).toLocaleDateString()}

Our team will review your application and respond within 5–10 business days. Save your reference ID for follow-up.

Learn more: ${siteUrl()}/genesis
`.trim();

  const confirmationSent = await sendEmail({
    to: application.email,
    subject: applicantSubject,
    text: applicantBody,
  });

  if (!confirmationSent) {
    logDev("Applicant confirmation (Resend unavailable):", application.email);
  }
}

const STATUS_MESSAGES: Record<
  Exclude<ProducerApplication["reviewStatus"], undefined>,
  { subject: string; body: (app: NotifyPayload) => string }
> = {
  new: {
    subject: "",
    body: () => "",
  },
  reviewing: {
    subject: "SikaChain Genesis Producer — application under review",
    body: (app) =>
      `
Hello ${app.org},

Your Genesis Producer Program application (reference ${app.id}) is now under review by our team.

We may follow up with additional questions about infrastructure, ecosystem plans, or compliance.

Status: ${siteUrl()}/candidates
`.trim(),
  },
  qualified: {
    subject: "SikaChain Genesis Producer — application qualified",
    body: (app) =>
      `
Hello ${app.org},

Congratulations — your organization has been qualified for the next stage of the Genesis Producer Program.

Reference: ${app.id}

Next steps may include testnet participation and technical onboarding. Our team will contact you at ${app.email}.

Program details: ${siteUrl()}/producers
`.trim(),
  },
  promoted: {
    subject: "SikaChain Genesis Producer — featured on candidate showcase",
    body: (app) =>
      `
Hello ${app.org},

Your organization has been promoted to the public candidate showcase.

View your profile: ${siteUrl()}/candidates

Reference: ${app.id}
`.trim(),
  },
  rejected: {
    subject: "SikaChain Genesis Producer — application update",
    body: (app) =>
      `
Hello ${app.org},

Thank you for your interest in the SikaChain Genesis Producer Program.

After review, we are unable to proceed with your application (reference ${app.id}) at this time. We encourage you to stay connected as the network expands.

Program overview: ${siteUrl()}/genesis
`.trim(),
  },
};

export async function notifyApplicationStatusChange(
  application: NotifyPayload,
  previousStatus?: ProducerApplication["reviewStatus"],
): Promise<void> {
  const status = application.reviewStatus;
  if (!status || status === "new" || status === previousStatus) return;

  const template = STATUS_MESSAGES[status];
  if (!template.subject) return;

  const sent = await sendEmail({
    to: application.email,
    subject: template.subject,
    text: template.body(application),
  });

  if (!sent) {
    logDev(`Status email (${status}) not sent:`, application.email);
  }
}
