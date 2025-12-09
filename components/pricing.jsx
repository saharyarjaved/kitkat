import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";

const PricingCard = ({
  id,
  plan,
  price,
  features,
  featured = false,
  planId,
  buttonText,
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);
  const { has } = useAuth();

  // Check if user has this specific plan
  const isCurrentPlan = id ? has?.({ plan: id }) : false;

  const handlePopup = async () => {
    if (isCurrentPlan) return;

    try {
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId: planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative backdrop-blur-lg border rounded-3xl p-8 cursor-pointer
      transition-all duration-700
      ${
        featured
          ? "bg-gradient-to-b from-red-600/30 to-red-800/20 border-red-400/50 scale-105"
          : "bg-white/5 border-red-500/20"
      }
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      ${
        isHovered
          ? "transform scale-115 rotate-1 z-10 shadow-[0_30px_60px_-15px_rgba(220,38,38,0.7)]"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          {plan}
        </h3>

        <div className="text-4xl font-bold bg-gradient-to-r from-red-500 via-rose-500 to-red-700 bg-clip-text text-transparent mb-6">
          ${price}
          {price > 0 && (
            <span className="text-lg text-red-100/60">/month</span>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-red-100/80">
              <span className="text-red-400 mr-3 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          variant={featured ? "primary" : "glass"}
          size="xl"
          className="w-full"
          onClick={handlePopup}
          disabled={isCurrentPlan || !planId}
        >
          {isCurrentPlan ? "Current Plan" : buttonText}
        </Button>
      </div>
    </div>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    {
      id: "free_user",
      plan: "Free",
      price: 0,
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize",
        "Color adjustments",
        "Text Tool",
      ],
      buttonText: "Get Started Free",
    },
    {
      id: "pro",
      plan: "Pro",
      price: 12,
      features: [
        "Unlimited projects",
        "Unlimited exports",
        "All Editing Tools",
        "AI Background Remover",
        "AI Image Extender",
        "AI Retouch, Upscaler and more",
      ],
      featured: true,
      planId: "cplan_2ywZwXjYQQipWYxjCmFZCgCgsTZ",
      buttonText: "Upgrade to Pro",
    },
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Simple{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-700 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>

          <p className="text-xl text-red-100/70">
            Start free and upgrade when you need more power. No hidden fees,
            cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
