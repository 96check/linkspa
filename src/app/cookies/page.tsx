import { Metadata } from "next";
import LegalPageLayout from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Cookie Policy | SalonLink",
  description:
    "Learn about the cookies SalonLink uses and how to manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="March 11, 2026">
      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files that are placed on your device (computer,
        tablet, or mobile phone) when you visit a website. They are widely used
        to make websites work more efficiently, provide a better browsing
        experience, and give website owners useful information.
      </p>
      <p>Cookies can be classified in several ways:</p>
      <ul>
        <li>
          <strong>Session cookies:</strong> Temporary cookies that expire when
          you close your browser.
        </li>
        <li>
          <strong>Persistent cookies:</strong> Cookies that remain on your
          device for a set period or until you delete them.
        </li>
        <li>
          <strong>First-party cookies:</strong> Set by the website you are
          visiting.
        </li>
        <li>
          <strong>Third-party cookies:</strong> Set by a domain other than the
          one you are visiting.
        </li>
      </ul>

      <h2>2. How We Use Cookies</h2>
      <p>
        SalonLink uses cookies and similar technologies for the following
        purposes:
      </p>
      <ul>
        <li>
          <strong>Authentication:</strong> To keep you signed in and maintain
          your session securely.
        </li>
        <li>
          <strong>Preferences:</strong> To remember your cookie consent choice
          and other settings.
        </li>
        <li>
          <strong>Security:</strong> To help protect your account and detect
          potentially harmful activity.
        </li>
      </ul>

      <h2>3. Cookies We Use</h2>
      <p>
        Below is a detailed list of the cookies used on SalonLink:
      </p>

      <h3>3.1 Essential Cookies (Required)</h3>
      <p>
        These cookies are strictly necessary for the Service to function. They
        cannot be disabled without breaking core functionality.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>Duration</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-orange-400">
                sb-*-auth-token
              </code>
            </td>
            <td>
              Supabase authentication session. Keeps you securely signed in.
            </td>
            <td>Session / 1 hour</td>
            <td>First-party</td>
          </tr>
          <tr>
            <td>
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-orange-400">
                sb-*-auth-token-code-verifier
              </code>
            </td>
            <td>
              Security token used during authentication flow (PKCE).
            </td>
            <td>Session</td>
            <td>First-party</td>
          </tr>
          <tr>
            <td>
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-orange-400">
                salonlink-consent
              </code>
            </td>
            <td>
              Stores your cookie consent preference (accepted or rejected).
            </td>
            <td>1 year</td>
            <td>First-party</td>
          </tr>
        </tbody>
      </table>

      <h3>3.2 Functional Cookies (Optional)</h3>
      <p>
        These cookies enable enhanced functionality and personalization. We
        currently do not use functional cookies, but may introduce them in the
        future to remember your preferences (e.g., language, theme). If added,
        they will only be set with your consent.
      </p>

      <h3>3.3 Analytics Cookies (Optional)</h3>
      <p>
        Analytics cookies help us understand how visitors interact with our
        website. We currently do not use analytics cookies. If we introduce them
        in the future (e.g., Plausible Analytics or similar privacy-focused
        tools), they will only be set with your explicit consent.
      </p>

      <h2>4. Managing Your Cookie Preferences</h2>

      <h3>4.1 Using Our Cookie Banner</h3>
      <p>
        When you first visit SalonLink, a cookie consent banner will appear at
        the bottom of the page. You can choose to:
      </p>
      <ul>
        <li>
          <strong>Accept All:</strong> Allow all cookies, including any optional
          cookies we may use in the future.
        </li>
        <li>
          <strong>Reject:</strong> Only essential cookies (required for the
          Service to function) will be used.
        </li>
      </ul>
      <p>
        Your choice is stored and will be remembered on subsequent visits. To
        change your preference, you can clear your browser&rsquo;s cookies and
        local storage for our website, and the consent banner will appear again.
      </p>

      <h3>4.2 Browser-Level Controls</h3>
      <p>
        Most web browsers allow you to control cookies through their settings.
        You can typically:
      </p>
      <ul>
        <li>View what cookies are stored on your device.</li>
        <li>Delete some or all cookies.</li>
        <li>Block cookies from specific or all websites.</li>
        <li>Set your browser to notify you when a cookie is being set.</li>
      </ul>
      <p>
        For instructions specific to your browser, please visit:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        <strong>Please note:</strong> Disabling essential cookies may prevent
        you from signing in or using core features of SalonLink.
      </p>

      <h2>5. Third-Party Cookies</h2>
      <p>
        We currently do not set third-party cookies on SalonLink. Our
        authentication provider (Supabase) uses first-party cookies set under
        our domain. If we introduce third-party services in the future that
        require cookies, we will update this policy and request your consent
        before setting them.
      </p>

      <h2>6. Do Not Track</h2>
      <p>
        Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) setting. As
        there is currently no industry standard for how companies should respond
        to DNT signals, we do not currently respond to DNT browser signals.
        However, we are committed to minimizing data collection and respecting
        your privacy choices through the mechanisms described in this policy.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for legal, operational, or regulatory reasons. When we
        make changes, we will update the &ldquo;Last updated&rdquo; date at the
        top of this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@salonlink.com">privacy@salonlink.com</a>
        </li>
      </ul>
    </LegalPageLayout>
  );
}
