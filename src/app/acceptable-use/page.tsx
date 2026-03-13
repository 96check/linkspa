import { Metadata } from "next";
import LegalPageLayout from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | SalonLink",
  description:
    "Understand the rules and guidelines for using SalonLink responsibly.",
};

export default function AcceptableUsePolicyPage() {
  return (
    <LegalPageLayout
      title="Acceptable Use Policy"
      lastUpdated="March 11, 2026"
    >
      <h2>1. Overview</h2>
      <p>
        This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs your use of the
        SalonLink platform and services. It is designed to protect our users,
        our Service, and the broader internet community. This policy applies to
        all users of SalonLink and is incorporated into our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>
      <p>
        By using SalonLink, you agree to comply with this policy. Violations may
        result in the suspension or termination of your account.
      </p>

      <h2>2. Permitted Use</h2>
      <p>SalonLink is designed for spa, salon, and beauty businesses to:</p>
      <ul>
        <li>
          Create a legitimate link page representing your real business.
        </li>
        <li>
          Share links to your social media profiles, booking platforms, website,
          and other professional online resources.
        </li>
        <li>
          Generate and distribute QR codes for business promotion (e.g., on
          business cards, signage, brochures, or digital channels).
        </li>
        <li>Customize the visual appearance of your public profile page.</li>
        <li>
          Share your business contact information (phone, email, address) with
          potential customers.
        </li>
      </ul>

      <h2>3. Prohibited Content</h2>
      <p>
        You must not use SalonLink to host, link to, promote, or distribute any
        of the following:
      </p>
      <ul>
        <li>
          <strong>Illegal content:</strong> Any material that violates local,
          national, or international laws, including content related to illegal
          substances, unlicensed services, or unlawful activities.
        </li>
        <li>
          <strong>Malware and harmful links:</strong> Links to websites
          containing viruses, malware, spyware, phishing pages, or any software
          designed to damage or gain unauthorized access to systems.
        </li>
        <li>
          <strong>Deceptive URLs:</strong> Links that mislead users about their
          destination, including disguised redirect chains designed to obscure
          harmful or unrelated endpoints.
        </li>
        <li>
          <strong>Hateful or violent content:</strong> Content that promotes
          violence, discrimination, hatred, or harassment based on race,
          ethnicity, religion, gender, sexual orientation, disability, or any
          other protected characteristic.
        </li>
        <li>
          <strong>Pornographic or sexually explicit material.</strong>
        </li>
        <li>
          <strong>Intellectual property infringement:</strong> Content that
          infringes copyrights, trademarks, patents, or other proprietary rights
          of any party.
        </li>
        <li>
          <strong>Misleading business information:</strong> Fake business names,
          fraudulent reviews, or deceptive claims about services you do not
          actually offer.
        </li>
      </ul>

      <h2>4. Prohibited Behavior</h2>
      <p>You must not engage in any of the following activities:</p>
      <ul>
        <li>
          <strong>Impersonation:</strong> Creating an account or profile that
          impersonates another person, business, or organization.
        </li>
        <li>
          <strong>Multiple accounts:</strong> Creating multiple accounts to
          circumvent restrictions, bans, or usage limits.
        </li>
        <li>
          <strong>Automated access:</strong> Using bots, scrapers, crawlers, or
          any automated tools to access, collect data from, or interact with the
          Service without our express written permission.
        </li>
        <li>
          <strong>Service interference:</strong> Attempting to disrupt, overload,
          or interfere with the Service&rsquo;s infrastructure, servers,
          networks, or security mechanisms.
        </li>
        <li>
          <strong>Spam:</strong> Using the Service to send or facilitate
          unsolicited messages, bulk communications, or promotional material to
          third parties.
        </li>
        <li>
          <strong>Credential sharing:</strong> Sharing, selling, or
          transferring your account credentials to another party.
        </li>
        <li>
          <strong>Reverse engineering:</strong> Attempting to decompile,
          disassemble, reverse-engineer, or otherwise derive the source code of
          the Service.
        </li>
      </ul>

      <h2>5. Link Requirements</h2>
      <p>All links added to your SalonLink profile must:</p>
      <ul>
        <li>
          Lead to legitimate, safe, and functional destinations.
        </li>
        <li>
          Accurately represent their destination in the link title and
          description.
        </li>
        <li>
          Not use link shorteners or redirect chains designed to obscure the
          final destination for harmful purposes.
        </li>
        <li>
          Comply with the terms of service of the linked platforms (e.g.,
          Instagram, Facebook, TikTok).
        </li>
      </ul>

      <h2>6. Enforcement</h2>
      <p>
        We actively monitor the Service and may review content to ensure
        compliance with this policy. Our enforcement actions are proportional to
        the severity of the violation:
      </p>
      <ul>
        <li>
          <strong>First violation (minor):</strong> We will send a warning
          notice to the email address associated with your account. You will be
          given a reasonable timeframe to resolve the issue.
        </li>
        <li>
          <strong>Repeated violations:</strong> Your account may be temporarily
          suspended. During suspension, your public profile page will be
          disabled.
        </li>
        <li>
          <strong>Severe violations:</strong> For serious offenses (e.g.,
          malware distribution, illegal activity, impersonation), your account
          will be terminated immediately without prior warning.
        </li>
        <li>
          <strong>Legal referral:</strong> We will report illegal activity to
          the appropriate law enforcement authorities when required by law or
          when we deem it necessary to protect our users.
        </li>
      </ul>

      <h2>7. Reporting Violations</h2>
      <p>
        If you believe a SalonLink user is violating this Acceptable Use Policy,
        please report it to us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:abuse@salonlink.com">abuse@salonlink.com</a>
        </li>
      </ul>
      <p>When reporting, please include:</p>
      <ul>
        <li>
          The URL of the profile or link page in question.
        </li>
        <li>A description of the violation.</li>
        <li>
          Any supporting evidence (e.g., screenshots, URLs of harmful content).
        </li>
      </ul>
      <p>
        We take all reports seriously and will investigate promptly. We may not
        be able to share specific actions taken due to privacy considerations,
        but we will acknowledge receipt of your report.
      </p>

      <h2>8. Appeals</h2>
      <p>
        If your account has been suspended or terminated and you believe this
        was done in error, you may submit an appeal:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:appeals@salonlink.com">appeals@salonlink.com</a>
        </li>
      </ul>
      <p>
        Include your account email, a description of the situation, and any
        relevant context. We will review your appeal and respond within 14
        business days.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Acceptable Use Policy from time to time. When we make
        material changes, we will update the &ldquo;Last updated&rdquo; date at
        the top of this page and notify affected users through the Service or
        via email.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about this Acceptable Use Policy, please
        contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:legal@salonlink.com">legal@salonlink.com</a>
        </li>
      </ul>
    </LegalPageLayout>
  );
}
