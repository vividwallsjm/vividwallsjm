import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Legal — Vivid Walls Jamaica',
  description: 'Terms of Service and Privacy Policy for Vivid Walls Jm.',
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-jet-black dark:text-white mb-2 uppercase tracking-wide">
      {title}
    </h2>
    <p className="text-xs text-charcoal dark:text-warm-gray font-dmsans mb-8">Effective Date: January 1, 2026</p>
    {children}
  </section>
);

const Article = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="font-poppins font-bold text-base text-jet-black dark:text-white mb-3">
      {num}. {title}
    </h3>
    <div className="font-dmsans text-sm text-charcoal dark:text-warm-gray leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const Sub = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-4">
    <p className="font-semibold text-jet-black dark:text-white mb-1">{title}</p>
    {children}
  </div>
);

const Disclaimer = () => (
  <p className="mt-6 text-xs italic text-warm-gray border-l-2 border-vivid-red pl-4">
    <strong>Legal Disclaimer:</strong> This document is provided as a starting template for general informational purposes. It has not been reviewed or approved by a qualified legal professional. Vivid Walls Jm should have this document reviewed by a licensed attorney in Jamaica before publishing it on the website to ensure full compliance with all applicable Jamaican laws and regulations.
  </p>
);

export default function LegalPage() {
  return (
    <div className="min-h-screen min-h-[100svh] bg-white dark:bg-[#000000]">
      {/* Header */}
      <header className="border-b-2 border-vivid-red bg-white dark:bg-[#000000] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-transparent.jpg"
              alt="Vivid Walls"
              width={240}
              height={80}
              className="h-14 w-auto object-contain dark:invert dark:hue-rotate-180"
            />
          </Link>
          <nav className="flex gap-6 text-sm font-dmsans">
            <a href="#terms" className="text-charcoal dark:text-warm-gray hover:text-vivid-red transition-colors">Terms of Service</a>
            <a href="#privacy" className="text-charcoal dark:text-warm-gray hover:text-vivid-red transition-colors">Privacy Policy</a>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* ── TERMS OF SERVICE ── */}
        <Section id="terms" title="Terms of Service">

          <Article num={1} title="Acceptance of Terms">
            <p>
              By accessing or using the website located at www.vividwallsjm.com (the &ldquo;Site&rdquo;) or placing an order for any services offered by Vivid Walls Jm (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our Site or services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you (&ldquo;Customer&rdquo; or &ldquo;you&rdquo;) and Vivid Walls Jm, a wall printing company operating under the laws of Jamaica.
            </p>
          </Article>

          <Article num={2} title="Description of Services">
            <p>
              Vivid Walls Jm provides professional wall printing services, including but not limited to custom graphic printing, mural printing, decorative wall designs, and related services for residential, commercial, and institutional spaces. Details regarding specific services, pricing, and availability are provided on our Site or upon direct inquiry.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any service or feature at any time without prior notice.
            </p>
          </Article>

          <Article num={3} title="Eligibility">
            <p>To use our services or place an order, you must:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Be at least 18 years of age, or have the consent of a parent or legal guardian;</li>
              <li>Provide accurate and complete information when submitting orders or inquiries;</li>
              <li>Have the legal authority to enter into a binding contract under Jamaican law.</li>
            </ul>
            <p>
              By using our Site or services, you represent and warrant that you meet all of the above requirements.
            </p>
          </Article>

          <Article num={4} title="User Responsibilities and Acceptable Use">
            <p>You agree to use www.vividwallsjm.com and our services only for lawful purposes and in accordance with these Terms. You agree that you will NOT:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Submit, upload, or request printing of any content that is illegal, defamatory, obscene, hateful, or infringes upon the rights of any third party;</li>
              <li>Provide false, misleading, or fraudulent information in connection with any order or inquiry;</li>
              <li>Attempt to gain unauthorised access to any part of our Site or systems;</li>
              <li>Use our Site in any manner that could damage, disable, or impair its operation;</li>
              <li>Copy, scrape, or harvest any content from our Site without our written permission;</li>
              <li>Use our services to reproduce copyrighted material without appropriate authorisation.</li>
            </ul>
            <p>
              You are solely responsible for ensuring that any designs, images, or content you submit for printing do not violate any applicable laws or third-party intellectual property rights.
            </p>
          </Article>

          <Article num={5} title="Intellectual Property">
            <Sub title="5.1 Our Content">
              <p>
                All content on www.vividwallsjm.com — including text, graphics, logos, images, and service descriptions — is the property of Vivid Walls Jm or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written consent.
              </p>
            </Sub>
            <Sub title="5.2 Your Content">
              <p>When you submit designs, images, or other materials to Vivid Walls Jm for printing purposes, you represent and warrant that:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>You own or have the necessary rights, licences, and permissions to use and reproduce such content;</li>
                <li>The content does not infringe any copyright, trademark, or other intellectual property right of any third party.</li>
              </ul>
              <p className="mt-2">
                You grant Vivid Walls Jm a limited, non-exclusive licence to use your submitted content solely for the purpose of fulfilling your order. We will not use your submitted designs for any other purpose without your consent.
              </p>
            </Sub>
          </Article>

          <Article num={6} title="Orders, Payments, and Refunds">
            <Sub title="6.1 Order Confirmation">
              <p>All orders placed through our Site or other channels are subject to acceptance by Vivid Walls Jm. We reserve the right to refuse or cancel any order at our discretion.</p>
            </Sub>
            <Sub title="6.2 Pricing">
              <p>Prices for our services are stated in Jamaican Dollars (JMD) unless otherwise indicated, and are subject to change without notice. Any applicable taxes or fees will be communicated to you prior to finalising your order.</p>
            </Sub>
            <Sub title="6.3 Payment">
              <p>Payment information, including card details, is collected securely for the purpose of processing your transactions. By providing payment information, you represent that you are authorised to use the payment method provided.</p>
            </Sub>
            <Sub title="6.4 Cancellations and Refunds">
              <p>
                Orders may be cancelled before work has commenced. Please contact us at <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a> as soon as possible to request a cancellation.
              </p>
              <p className="mt-2">
                Once work has commenced on a custom order, cancellations may not be possible, and refunds will be assessed on a case-by-case basis. Where a service is not delivered as agreed due to our error, we will work with you to provide a remedy, which may include a re-do of the work or a partial or full refund at our discretion.
              </p>
              <p className="mt-2">
                Custom-printed work is non-refundable once completed and accepted, unless there is a defect in workmanship attributable to Vivid Walls Jm.
              </p>
            </Sub>
          </Article>

          <Article num={7} title="Service Delivery and Site Access Requirements">
            <p>For on-site wall printing services, the Customer agrees to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Provide safe and reasonable access to the relevant premises at the agreed time;</li>
              <li>Ensure that walls and surfaces are adequately prepared unless otherwise agreed in writing;</li>
              <li>Comply with any site preparation instructions provided by Vivid Walls Jm.</li>
            </ul>
            <p>
              We are not liable for delays or inability to complete services arising from conditions outside our control, including restricted access, unsuitable wall surfaces, or hazardous conditions on the premises.
            </p>
          </Article>

          <Article num={8} title="Termination">
            <p>
              We reserve the right to terminate or suspend your access to our Site or refuse service to any person at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other customers, our business, or third parties.
            </p>
            <p>
              Upon termination, all provisions of these Terms that by their nature should survive shall continue to apply, including intellectual property provisions, disclaimers, and limitations of liability.
            </p>
          </Article>

          <Article num={9} title="Disclaimers">
            <p>Our Site and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, Vivid Walls Jm makes no warranties, express or implied, regarding:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>The accuracy, completeness, or fitness for a particular purpose of any information on our Site;</li>
              <li>The uninterrupted or error-free operation of our Site;</li>
              <li>The results that may be obtained from using our services.</li>
            </ul>
            <p>
              Colours displayed on digital screens may vary from the final printed result due to differences in screen calibration and printing materials. We will make reasonable efforts to match your design, but exact colour reproduction cannot be guaranteed.
            </p>
          </Article>

          <Article num={10} title="Limitation of Liability">
            <p>To the fullest extent permitted under the laws of Jamaica, Vivid Walls Jm, its directors, employees, and agents shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or in connection with:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Your use of, or inability to use, our Site or services;</li>
              <li>Any errors or omissions in content on our Site;</li>
              <li>Any property damage arising from the provision of on-site services, except where caused by our proven negligence.</li>
            </ul>
            <p>
              Our total liability to you for any claim arising from the use of our services shall not exceed the amount you paid to us for the specific order giving rise to the claim.
            </p>
            <p>
              Nothing in these Terms limits our liability for death or personal injury caused by our negligence, or for fraud or fraudulent misrepresentation, as required by applicable Jamaican law.
            </p>
          </Article>

          <Article num={11} title="Governing Law and Dispute Resolution">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Jamaica. Any disputes arising out of or in connection with these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Jamaica.
            </p>
            <p>
              We encourage you to contact us first at <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a> to resolve any concerns informally before pursuing formal legal action.
            </p>
          </Article>

          <Article num={12} title="Changes to These Terms">
            <p>
              We may update these Terms from time to time to reflect changes in our services, legal requirements, or business practices. When we make changes, we will update the &ldquo;Effective Date&rdquo; at the top of this page. Your continued use of our Site or services after any changes constitutes your acceptance of the updated Terms.
            </p>
            <p>We encourage you to review these Terms periodically.</p>
          </Article>

          <Article num={13} title="Contact Information">
            <p>If you have any questions or concerns about these Terms of Service, please contact us:</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-jet-black dark:text-white">Vivid Walls Jm</strong></li>
              <li>Website: <a href="https://www.vividwallsjm.com" className="text-vivid-red hover:underline">www.vividwallsjm.com</a></li>
              <li>Email: <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a></li>
            </ul>
            <Disclaimer />
          </Article>
        </Section>

        {/* Divider */}
        <div className="border-t-2 border-vivid-red" />

        {/* ── PRIVACY POLICY ── */}
        <Section id="privacy" title="Privacy Policy">

          <Article num={1} title="Introduction">
            <p>
              Vivid Walls Jm (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of our customers and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit www.vividwallsjm.com or engage our wall printing services.
            </p>
            <p>
              By using our Site or services, you agree to the collection and use of your information as described in this Privacy Policy. If you do not agree with any part of this policy, please do not use our Site.
            </p>
            <p>
              This policy applies to all personal information collected through our website and in connection with our services, and is governed by the laws of Jamaica, including the Data Protection Act, 2020.
            </p>
          </Article>

          <Article num={2} title="Information We Collect">
            <Sub title="2.1 Information You Provide Directly">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong className="text-jet-black dark:text-white">Email address</strong> — collected when you make an inquiry, place an order, or contact us;</li>
                <li><strong className="text-jet-black dark:text-white">Payment information</strong> — including card details or other financial information needed to process transactions for our services;</li>
                <li><strong className="text-jet-black dark:text-white">Location information</strong> — including your address or property address, collected for the purpose of providing on-site wall printing services.</li>
              </ul>
            </Sub>
            <Sub title="2.2 Information Collected Automatically">
              <p>When you visit www.vividwallsjm.com, we may automatically collect certain technical information, such as:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Your IP address and browser type;</li>
                <li>Pages you visit and time spent on our Site;</li>
                <li>Referring URLs.</li>
              </ul>
              <p className="mt-2">
                This information is collected to help us maintain and improve our Site and is not used to identify you personally unless combined with other data you provide.
              </p>
            </Sub>
          </Article>

          <Article num={3} title="How We Use Your Information">
            <p>We use the personal information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>To process and fulfil your orders — including using your location to schedule and carry out on-site printing services;</li>
              <li>To process payments — your payment information is used solely to complete transactions for services rendered;</li>
              <li>To communicate with you — we may use your email address to confirm orders, respond to inquiries, provide service updates, or send important notices related to your orders;</li>
              <li>To improve our services — anonymised or aggregated data may be used to understand how our Site is used and to enhance the customer experience;</li>
              <li>To comply with legal obligations — we may use or retain your information as required by applicable Jamaican law.</li>
            </ul>
            <p>
              We will not use your personal information for purposes that are incompatible with those listed above without first obtaining your consent.
            </p>
          </Article>

          <Article num={4} title="Legal Basis for Processing">
            <p>Where required by applicable law, we process your personal information on the following legal bases:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-jet-black dark:text-white">Performance of a contract</strong> — processing is necessary to fulfil orders and deliver our services to you;</li>
              <li><strong className="text-jet-black dark:text-white">Legitimate interests</strong> — we process certain data to operate and improve our Site and business, where such interests are not overridden by your rights;</li>
              <li><strong className="text-jet-black dark:text-white">Legal compliance</strong> — we process data as required to meet our obligations under Jamaican law;</li>
              <li><strong className="text-jet-black dark:text-white">Consent</strong> — where we rely on your consent (for example, for marketing communications), you may withdraw your consent at any time by contacting us at <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a>.</li>
            </ul>
          </Article>

          <Article num={5} title="Cookies and Tracking Technologies">
            <p>
              Our website may use cookies or similar technologies to improve your browsing experience. Cookies are small text files stored on your device. We may use:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-jet-black dark:text-white">Essential cookies</strong> — necessary for the Site to function properly;</li>
              <li><strong className="text-jet-black dark:text-white">Analytics cookies</strong> — to help us understand how visitors use the Site (this data is anonymised where possible).</li>
            </ul>
            <p>
              You may adjust your browser settings to refuse cookies. Please note that disabling certain cookies may affect the functionality of our Site. We do not currently use cookies for advertising or tracking purposes beyond basic Site analytics.
            </p>
          </Article>

          <Article num={6} title="Third-Party Services">
            <p>
              At this time, Vivid Walls Jm does not use any third-party services that independently collect or process your personal data through our Site. All personal information you share with us is handled directly by Vivid Walls Jm.
            </p>
            <p>
              Should we introduce third-party services in the future (such as payment processors, analytics providers, or delivery platforms), this Privacy Policy will be updated accordingly to disclose those arrangements.
            </p>
          </Article>

          <Article num={7} title="Data Sharing and Disclosure">
            <p>We do not sell, trade, rent, or otherwise share your personal information with outside parties, except in the following limited circumstances:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-jet-black dark:text-white">Legal requirements</strong> — we may disclose your information if required to do so by law, regulation, or valid legal process (such as a court order or government request under Jamaican law);</li>
              <li><strong className="text-jet-black dark:text-white">Protection of rights</strong> — we may disclose information where necessary to protect the rights, property, or safety of Vivid Walls Jm, our customers, or the public;</li>
              <li><strong className="text-jet-black dark:text-white">Business transfers</strong> — in the event of a merger, acquisition, or sale of our business assets, your personal information may be transferred as part of that transaction. We will notify you before your information becomes subject to a different privacy policy.</li>
            </ul>
          </Article>

          <Article num={8} title="Data Security">
            <p>We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, misuse, or disclosure. These measures include:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Secure handling of payment information during transactions;</li>
              <li>Limiting access to your personal data to those employees or representatives who need it to perform their duties;</li>
              <li>Storing data on secure systems with appropriate access controls.</li>
            </ul>
            <p>
              However, no method of electronic transmission or storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security. In the event of a data breach that affects your rights, we will notify you as required by applicable Jamaican law.
            </p>
          </Article>

          <Article num={9} title="Data Retention">
            <p>We retain your personal information only for as long as is necessary to fulfil the purposes outlined in this Privacy Policy, or as required by law. Specifically:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Order-related information (including email, payment records, and location) is retained for as long as required to complete your order and for a reasonable period thereafter for record-keeping and legal compliance purposes;</li>
              <li>Inquiry records are retained for a period sufficient to respond to your inquiry and for any follow-up that may be required;</li>
              <li>When your information is no longer needed, we will securely delete or anonymise it.</li>
            </ul>
          </Article>

          <Article num={10} title="Your Rights">
            <p>Under the Data Protection Act, 2020 of Jamaica, you have the following rights with respect to your personal information:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-jet-black dark:text-white">Right of Access</strong> — you have the right to request a copy of the personal information we hold about you;</li>
              <li><strong className="text-jet-black dark:text-white">Right to Rectification</strong> — you may request that we correct any inaccurate or incomplete information we hold;</li>
              <li><strong className="text-jet-black dark:text-white">Right to Erasure</strong> — you may request that we delete your personal information where there is no legitimate reason for us to continue processing it;</li>
              <li><strong className="text-jet-black dark:text-white">Right to Restrict Processing</strong> — you may ask us to suspend processing of your data in certain circumstances;</li>
              <li><strong className="text-jet-black dark:text-white">Right to Object</strong> — you may object to our processing of your personal information where we rely on legitimate interests as the legal basis;</li>
              <li><strong className="text-jet-black dark:text-white">Right to Withdraw Consent</strong> — where processing is based on your consent, you have the right to withdraw that consent at any time.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a>. We will respond to your request within a reasonable timeframe and in accordance with applicable law. We may need to verify your identity before processing your request.
            </p>
          </Article>

          <Article num={11} title="Children's Privacy">
            <p>
              Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe that a child has provided us with personal information without parental consent, please contact us at <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a> and we will take steps to delete such information promptly.
            </p>
          </Article>

          <Article num={12} title="Links to External Websites">
            <p>
              Our Site may occasionally contain links to external websites for reference purposes. This Privacy Policy applies only to www.vividwallsjm.com. We are not responsible for the privacy practices of any third-party websites and encourage you to review their policies before providing any personal information.
            </p>
          </Article>

          <Article num={13} title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal obligations. When we make material changes, we will update the &ldquo;Effective Date&rdquo; at the top of this page. Your continued use of our Site after any changes are posted constitutes your acceptance of the revised policy.
            </p>
            <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
          </Article>

          <Article num={14} title="Contact Information">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-jet-black dark:text-white">Vivid Walls Jm</strong></li>
              <li>Website: <a href="https://www.vividwallsjm.com" className="text-vivid-red hover:underline">www.vividwallsjm.com</a></li>
              <li>Email: <a href="mailto:vividwallsjm@gmail.com" className="text-vivid-red hover:underline">vividwallsjm@gmail.com</a></li>
            </ul>
            <p className="mt-3 text-sm">We are committed to addressing your concerns promptly and transparently.</p>
            <Disclaimer />
          </Article>
        </Section>
      </main>

      {/* Footer strip */}
      <div className="border-t border-warm-gray dark:border-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-charcoal dark:text-warm-gray text-sm font-dmsans">
            © {new Date().getFullYear()} Vivid Walls Jamaica. All rights reserved.
          </p>
          <Link href="/" className="text-sm font-dmsans text-charcoal dark:text-warm-gray hover:text-vivid-red transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
