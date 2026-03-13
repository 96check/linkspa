import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | SalonLink",
  description:
    "Simple, transparent pricing for every spa and salon. Start free, upgrade when you're ready.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
