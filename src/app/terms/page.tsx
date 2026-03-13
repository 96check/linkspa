import { Metadata } from "next";
import LegalPageLayout from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service | SalonLink",
  description:
    "Read the Terms of Service governing your use of SalonLink.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 11, 2026">
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using SalonLink (&ldquo;the Service&rdquo;), you agree
        to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you
        disagree with any part of these Terms, you must not use the Service.
      </p>
      <p>
        You must be at least 16 years of age to use the Service. By using
        SalonLink, you represent and warrant that you meet this age requirement.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        SalonLink provides a social link aggregation and QR code generation
        platform designed for spa, salon, and beauty businesses. The Service
        allows you to:
      </p>
      <ul>
        <li>
          Create a customizable public page with links to your social media
          profiles, booking pages, and other online resources.
        </li>
        <li>Generate a unique, scannable QR code for your business.</li>
        <li>
          Choose from multiple visual themes to match your brand identity.
        </li>
        <li>View analytics on page visits and link clicks.</li>
      </ul>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the
        Service at any time, with or without notice. We shall not be liable to
        you or any third party for any modification, suspension, or
        discontinuance of the Service.
      </p>

      <h2>3. User Accounts</h2>
      <ul>
        <li>
          <strong>Registration:</strong> You must provide a valid email address
          and create a password to register for an account.
        </li>
        <li>
          <strong>Accuracy:</strong> You agree to provide accurate, current, and
          complete information during registration and to keep your account
          information updated.
        </li>
        <li>
          <strong>Security:</strong> You are responsible for safeguarding your
          password and for all activities that occur under your account. You
          agree to notify us immediately of any unauthorized use.
        </li>
        <li>
          <strong>One account per business:</strong> Each business should
          maintain a single account. Creating multiple accounts to circumvent
          restrictions or for deceptive purposes is prohibited.
        </li>
      </ul>

      <h2>4. User Content</h2>
      <h3>4.1 Ownership</h3>
      <p>
        You retain ownership of all content you submit, post, or display through
        the Service, including but not limited to your business name,
        description, logo, links, and other profile information
        (&ldquo;User Content&rdquo;).
      </p>

      <h3>4.2 License Grant</h3>
      <p>
        By submitting User Content, you grant SalonLink a worldwide,
        non-exclusive, royalty-free license to use, display, reproduce, and
        distribute your User Content solely for the purpose of operating and
        providing the Service. This license terminates when you delete your
        content or account.
      </p>

      <h3>4.3 Content Responsibilities</h3>
      <p>You are solely responsible for your User Content. You agree not to submit content that:</p>
      <ul>
        <li>Is illegal, harmful, threatening, abusive, or harassing.</li>
        <li>Infringes any intellectual property or proprietary rights.</li>
        <li>Contains malware, viruses, or harmful code.</li>
        <li>Is misleading, deceptive, or fraudulent.</li>
        <li>Violates any applicable law or regulation.</li>
      </ul>
      <p>
        We reserve the right to remove any User Content that violates these
        Terms, without prior notice.
      </p>

      <h2>5. Acceptable Use</h2>
      <p>
        Your use of the Service is subject to our{" "}
        <a href="/acceptable-use">Acceptable Use Policy</a>, which is
        incorporated into these Terms by reference. Please review it carefully.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The Service, including its original content (excluding User Content),
        features, functionality, design, code, and branding — including the
        SalonLink name, logo, and visual identity — are and will remain the
        exclusive property of SalonLink and its licensors.
      </p>
      <p>
        You may not copy, modify, distribute, sell, or lease any part of our
        Service or its intellectual property, nor may you reverse-engineer or
        attempt to extract the source code, unless applicable laws expressly
        permit it.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        <strong>
          The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis, without warranties of any kind, either express
          or implied.
        </strong>
      </p>
      <p>We do not warrant that:</p>
      <ul>
        <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
        <li>
          The results obtained from the Service will be accurate or reliable.
        </li>
        <li>
          Any errors in the Service will be corrected.
        </li>
      </ul>
      <p>
        To the maximum extent permitted by applicable law, SalonLink shall not
        be liable for any indirect, incidental, special, consequential, or
        punitive damages, including but not limited to loss of profits, data,
        use, goodwill, or other intangible losses, resulting from:
      </p>
      <ul>
        <li>Your use of or inability to use the Service.</li>
        <li>Any unauthorized access to or alteration of your data.</li>
        <li>Any third-party conduct on the Service.</li>
        <li>Any other matter relating to the Service.</li>
      </ul>
      <p>
        Our total aggregate liability for all claims arising from or related to
        the Service shall not exceed the amount you paid us (if any) in the 12
        months preceding the claim.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion or limitation of certain
        damages. In such jurisdictions, our liability is limited to the maximum
        extent permitted by law.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless SalonLink, its
        officers, directors, employees, and agents from and against any claims,
        damages, obligations, losses, liabilities, costs, or expenses arising
        from:
      </p>
      <ul>
        <li>Your use of the Service.</li>
        <li>Your violation of these Terms.</li>
        <li>Your violation of any third-party right, including intellectual property rights.</li>
        <li>Any User Content you submit through the Service.</li>
      </ul>

      <h2>9. Termination</h2>
      <ul>
        <li>
          <strong>By you:</strong> You may delete your account at any time
          through the Service or by contacting us. Upon deletion, your data will
          be removed in accordance with our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </li>
        <li>
          <strong>By us:</strong> We may suspend or terminate your account
          immediately, without prior notice or liability, if you breach these
          Terms or engage in activity that we determine is harmful to the
          Service, other users, or third parties.
        </li>
        <li>
          <strong>Effect of termination:</strong> Upon termination, your right
          to use the Service ceases immediately. All provisions of these Terms
          that by their nature should survive termination shall survive,
          including ownership provisions, warranty disclaimers, indemnity, and
          limitations of liability.
        </li>
      </ul>

      <h2>10. Governing Law &amp; Disputes</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of the jurisdiction in which SalonLink is established, without
        regard to its conflict of law provisions.
      </p>
      <p>
        Any disputes arising from or related to these Terms or the Service shall
        be resolved through good-faith negotiation. If a resolution cannot be
        reached, disputes shall be submitted to the competent courts of the
        applicable jurisdiction.
      </p>

      <h2>11. Severability</h2>
      <p>
        If any provision of these Terms is found to be unenforceable or invalid,
        that provision shall be limited or eliminated to the minimum extent
        necessary, and the remaining provisions shall continue in full force and
        effect.
      </p>

      <h2>12. Entire Agreement</h2>
      <p>
        These Terms, together with our{" "}
        <a href="/privacy">Privacy Policy</a>,{" "}
        <a href="/cookies">Cookie Policy</a>, and{" "}
        <a href="/acceptable-use">Acceptable Use Policy</a>, constitute the
        entire agreement between you and SalonLink regarding the Service and
        supersede all prior agreements and understandings.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. When we make
        material changes, we will update the &ldquo;Last updated&rdquo; date at
        the top of this page and notify you through the Service or via email.
      </p>
      <p>
        Your continued use of the Service after any changes constitutes
        acceptance of the new Terms.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact
        us:
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
