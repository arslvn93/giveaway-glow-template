
// This file centralizes all editable content for the giveaway page

// Prize section
export const prizeImages = [
  "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=1000", // Main cheese board
  "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=500", // Cheese assortment
  "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=500", // Olives and cheese
];

export const prizeContent = {
  title: "Gourmet Cheese Board Gift Basket",
  description: "This curated gift basket is perfect for an at-home charcuterie night. Featuring a handcrafted wooden cheese board, assortment of fine cheeses, olives, sea salt pretzels, chocolate bark, and a premium knife set—everything you need for a delicious evening with your loved ones.",
  features: [
    "Assorted gourmet cheeses & olives - expertly selected and paired for rich, balanced flavor",
    "Sea salt pretzels & chocolate bark - the perfect mix of crunchy, salty, and sweet indulgence",
    "Handcrafted wooden cheese tray with premium knife set for effortless serving",
    "Free delivery directly to your door in Vaughan",
    "Perfect for a cozy night in with family and friends",
  ],
  value: "$175",
};

// Header section
export const headerContent = {
  title: "Win a Curated Cheese Board Gift Basket!",
  description: "Perfect for Vaughan families looking for a cozy night in! Enter for a chance to win our exclusive cheese board package valued at $175. No purchase necessary.",
  ctaText: "Enter Now",
  heroImage: prizeImages[0],
};

// How to Enter section
export const howToEnterContent = {
  title: "How to Enter",
  description: "Getting started is easy! Follow these simple steps to enter our giveaway.",
  steps: [
    {
      icon: "Mail",
      title: "Fill Out the Form",
      description: "Enter your email address and name in the form and submit it."
    },
    {
      icon: "Share2",
      title: "Share with Friends",
      description: "Share this giveaway on social media for extra entries."
    },
    {
      icon: "Users",
      title: "Confirm Entry",
      description: "Check your email to confirm your entry and you're all set!"
    }
  ],
  benefits: [
    { 
      icon: "Clock", 
      title: "Quick & Easy", 
      desc: "Takes less than a minute" 
    },
    { 
      icon: "Trophy", 
      title: "Multiple Entries", 
      desc: "Share for more chances" 
    },
    { 
      icon: "Gift", 
      title: "Premium Prize", 
      desc: "Valued at $175" 
    }
  ],
  formLabels: {
    nameLabel: "Your Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "you@example.com",
    submitButton: "Enter Giveaway",
    processingText: "Processing...",
    sharingPlatforms: ["Facebook", "Twitter", "Instagram"],
    sharingText: "Share for Extra Entries:",
    termsText: "By entering, you agree to our Terms & Conditions and Privacy Policy."
  },
  successMessage: {
    title: "Entry Submitted!",
    description: "Check your email to confirm your entry."
  },
  currentEntries: 482
};

// Rules section
export const rulesContent = {
  title: "Rules & Eligibility",
  description: "Please review the following rules and eligibility requirements before entering the giveaway.",
  rules: [
    {
      question: "Who is eligible to enter?",
      answer: "Anyone 18 years or older residing in the Vaughan area can enter this giveaway.",
    },
    {
      question: "How long does the giveaway run?",
      answer: "This giveaway runs until February 2nd, 2025, as indicated by the countdown timer.",
    },
    {
      question: "How will the winner be selected?",
      answer: "The winner will be selected randomly from all valid entries. We use a certified random selection tool to ensure fairness.",
    },
    {
      question: "When and how will the winner be notified?",
      answer: "The winner will be notified via email within 48 hours after the giveaway ends. They must respond within 72 hours to claim their prize.",
    },
    {
      question: "How many times can I enter?",
      answer: "Each person may enter once. Additional entries can be earned through sharing on social media (up to 3 additional entries).",
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take privacy seriously. Your information will only be used for this giveaway and will not be shared with third parties.",
    },
  ],
  imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800",
  tipsForEntering: [
    "Double-check your email address before submitting your entry",
    "Share on social media for additional entry opportunities",
    "Set a calendar reminder for the drawing date"
  ],
  importantNotice: "All winners will be contacted via the email provided during entry. Make sure to check your inbox (and spam folder) regularly after the giveaway ends.",
  supportEmail: "support@giveaway.com",
  termsText: "By entering, you agree to all rules and terms.",
  downloadRulesText: "Download Full Rules PDF"
};

// Contact section
export const contactContent = {
  title: "Get In Touch",
  email: "info@theskygroup.ca",
  phone: "289-210-5250",
  brokerage: {
    name: "The Real Brokerage, Inc.",
    address: "133 Richmond Street West Suite 302"
  },
  disclaimer: "This site is not intended to solicit buyers or sellers who are currently under contract.",
  copyright: "Copyright 2025. All rights reserved",
  privacyPolicyText: "Privacy Policy"
};

// Countdown
export const countdownContent = {
  endDate: new Date("February 2, 2025") 
};
