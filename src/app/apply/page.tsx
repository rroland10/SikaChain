import type { Metadata } from "next";
import { ProducerApplicationForm } from "@/components/apply/ProducerApplicationForm";
import { PageHero, SectionBlock } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Apply — Genesis Producer",
  description: "Apply to become one of SikaChain's 21 founding node producers.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Application"
        title="Apply to the Genesis Producer Program"
        lead="Submit your organization for consideration as one of SikaChain's 21 founding node producers. Applications will be reviewed for technical readiness, institutional credibility, and alignment with mobile money settlement."
        imageSrc="/images/ambient-glass-bg.png"
        primaryCta={{ href: "/producers", label: "Review requirements" }}
        secondaryCta={{ href: "/genesis", label: "Program overview" }}
      />

      <SectionBlock tag="Application form" title="Tell us about your organization">
        <ProducerApplicationForm />
      </SectionBlock>

      <section className="px-6 pb-20">
        <p className="mx-auto max-w-2xl text-center text-sm text-sika-cream/55">
          Questions before applying? Use the{" "}
          <span className="text-sika-gold">✦ SikaChain Guide</span> in the corner or email your
          partnership team when ready.
        </p>
      </section>
    </>
  );
}
