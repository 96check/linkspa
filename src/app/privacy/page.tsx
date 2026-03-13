import { Metadata } from "next";
import LegalPageLayout from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | SalonLink",
  description:
    "Learn how SalonLink collects, uses, and protects your personal data. GDPR and CCPA compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="March 11, 2026">
      <h2>1. Introduction</h2>
      <p>
        Welcome to SalonLink (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
        &ldquo;our&rdquo;). We are committed to protecting your personal data
        and respecting your privacy. This Privacy Policy explains how we
        collect, use, store, and share your information when you use our website
        and services at{" "}
        <a href="https://salonlink.com">salonlink.com</a> (the
        &ldquo;Service&rdquo;).
      </p>
      <p>
        If you have any questions about this policy, please contact us at{" "}
        <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>.
      </p>

      <h2>2. Information We Collect</h2>

      <h3>2.1 Information You Provide</h3>
      <ul>
        <li>
          <strong>Account information:</strong> When you register, we collect
          your email address and password (stored as a secure hash).
        </li>
        <li>
          <strong>Business profile data:</strong> Spa/salon name, description
          (bio), logo, address, phone number, and custom URL slug.
        </li>
        <li>
          <strong>Links and content:</strong> Social media URLs, booking links,
          and other links you add to your profile.
        </li>
        <li>
          <strong>Google Review URL:</strong> If you choose to connect your
          Google Business review page.
        </li>
      </ul>

      <h3>2.2 Information Collected Automatically</h3>
      <ul>
        <li>
          <strong>Usage data:</strong> Page visits, link clicks, timestamps, and
          interaction patterns with the Service.
        </li>
        <li>
          <strong>Device and browser information:</strong> Browser type,
          operating system, screen resolution, and language preferences
          (collected via standard HTTP headers).
        </li>
        <li>
          <strong>IP address:</strong> Collected for security purposes and
          general geographic analytics.
        </li>
        <li>
          <strong>Cookies:</strong> See our{" "}
          <a href="/cookies">Cookie Policy</a> for details on what cookies we
          use and why.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve the Service.</li>
        <li>Authenticate your account and manage your session.</li>
        <li>
          Display your public profile page and links to visitors who access your
          custom URL or scan your QR code.
        </li>
        <li>Generate analytics for your dashboard (page visits, link clicks).</li>
        <li>
          Send essential service communications (e.g., account verification,
          security alerts, important updates).
        </li>
        <li>Detect, prevent, and address fraud, abuse, or technical issues.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>4. Data Storage &amp; Processing</h2>
      <p>
        Your data is stored and processed using the following infrastructure:
      </p>
      <ul>
        <li>
          <strong>Supabase:</strong> Our primary database and authentication
          provider, hosted on AWS infrastructure. Data may be stored in the
          United States and/or European Union.
        </li>
        <li>
          <strong>Vercel:</strong> Our hosting provider for the web application,
          with edge servers distributed globally.
        </li>
      </ul>
      <p>
        We use industry-standard security measures including encryption in
        transit (TLS/SSL), encrypted password storage (hashing), and access
        controls to protect your data.
      </p>

      <h2>5. Data Sharing &amp; Third Parties</h2>
      <p>
        <strong>We do not sell your personal data.</strong> We only share your
        information in the following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers:</strong> We use Supabase (database &amp;
          authentication) and Vercel (hosting) to operate the Service. These
          providers process data on our behalf under strict data processing
          agreements.
        </li>
        <li>
          <strong>Public profile:</strong> Information you add to your public
          profile (spa name, bio, links, logo) is intentionally made publicly
          accessible via your custom URL.
        </li>
        <li>
          <strong>Legal requirements:</strong> We may disclose information if
          required by law, regulation, legal process, or governmental request.
        </li>
        <li>
          <strong>Business transfers:</strong> In the event of a merger,
          acquisition, or sale of assets, your data may be transferred as part
          of that transaction.
        </li>
      </ul>

      <h2>6. Your Rights Under GDPR (European Users)</h2>
      <p>
        If you are located in the European Economic Area (EEA), the United
        Kingdom, or Switzerland, you have the following rights under the General
        Data Protection Regulation (GDPR):
      </p>
      <ul>
        <li>
          <strong>Right of access (Art. 15):</strong> You can request a copy of
          the personal data we hold about you.
        </li>
        <li>
          <strong>Right to rectification (Art. 16):</strong> You can request
          that we correct any inaccurate or incomplete data.
        </li>
        <li>
          <strong>Right to erasure (Art. 17):</strong> You can request that we
          delete your personal data (&ldquo;right to be forgotten&rdquo;).
        </li>
        <li>
          <strong>Right to restriction of processing (Art. 18):</strong> You can
          request that we limit how we process your data.
        </li>
        <li>
          <strong>Right to data portability (Art. 20):</strong> You can request
          your data in a structured, machine-readable format.
        </li>
        <li>
          <strong>Right to object (Art. 21):</strong> You can object to the
          processing of your personal data for certain purposes.
        </li>
        <li>
          <strong>Right to withdraw consent:</strong> Where processing is based
          on consent, you may withdraw it at any time.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{" "}
        <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>. We
        will respond to your request within 30 days.
      </p>
      <p>
        You also have the right to lodge a complaint with your local data
        protection supervisory authority.
      </p>

      <h2>7. Your Rights Under CCPA (California Users)</h2>
      <p>
        If you are a California resident, the California Consumer Privacy Act
        (CCPA) provides you with the following rights:
      </p>
      <ul>
        <li>
          <strong>Right to know:</strong> You can request what personal
          information we have collected, the sources, the purposes, and the
          categories of third parties with whom we share it.
        </li>
        <li>
          <strong>Right to delete:</strong> You can request the deletion of your
          personal information.
        </li>
        <li>
          <strong>Right to opt-out of sale:</strong> We do not sell personal
          information. However, you may still exercise this right at any time.
        </li>
        <li>
          <strong>Right to non-discrimination:</strong> We will not discriminate
          against you for exercising any of your CCPA rights.
        </li>
      </ul>
      <p>
        To exercise these rights, email us at{" "}
        <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>. We
        will verify your identity before processing your request and respond
        within 45 days.
      </p>

      <h2>8. Data Retention</h2>
      <ul>
        <li>
          <strong>Active accounts:</strong> We retain your data for as long as
          your account is active and the Service is in use.
        </li>
        <li>
          <strong>Deleted accounts:</strong> When you delete your account, we
          will remove your personal data within 30 days. Some anonymized,
          aggregated data may be retained for analytical purposes.
        </li>
        <li>
          <strong>Legal obligations:</strong> We may retain certain data longer
          if required by law (e.g., tax records, fraud prevention).
        </li>
      </ul>

      <h2>9. International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in countries
        outside your country of residence, including the United States. When we
        transfer data internationally, we rely on appropriate safeguards such as
        Standard Contractual Clauses (SCCs) approved by the European Commission,
        or the data recipient&rsquo;s participation in recognized frameworks.
      </p>

      <h2>10. Children&rsquo;s Privacy</h2>
      <p>
        SalonLink is not intended for individuals under the age of 16. We do not
        knowingly collect personal data from children under 16. If we become
        aware that we have collected data from a child under 16, we will take
        steps to delete it promptly. If you believe a child has provided us with
        personal data, please contact us at{" "}
        <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>.
      </p>

      <h2>11. Security</h2>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal data, including:
      </p>
      <ul>
        <li>Encryption in transit (TLS/SSL) and at rest.</li>
        <li>Secure password hashing (never stored in plain text).</li>
        <li>Regular security assessments and monitoring.</li>
        <li>Access controls limiting who can access personal data.</li>
      </ul>
      <p>
        While we strive to protect your data, no method of transmission over the
        Internet or electronic storage is 100% secure. We cannot guarantee
        absolute security.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make
        material changes, we will notify you by updating the &ldquo;Last
        updated&rdquo; date at the top of this page and, where appropriate,
        sending a notice via email or through the Service.
      </p>
      <p>
        Your continued use of the Service after any changes constitutes your
        acceptance of the updated policy.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy or our data practices, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>
        </li>
        <li>
          <strong>Response time:</strong> We aim to respond within 30 days of
          receiving your request.
        </li>
      </ul>
    </LegalPageLayout>
  );
}
