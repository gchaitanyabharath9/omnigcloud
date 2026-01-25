/**
 * Centralized Email Configuration
 *
 * All email addresses used across the application are defined here.
 * This allows easy updates without modifying code in multiple places.
 *
 * To update emails in the future, simply modify the values in this file.
 */

export const EMAIL_CONFIG = {
  // Primary contact email
  primary: "omnigcloud@gmail.com",

  // Department-specific emails
  admin: "omnigcloud@gmail.com",
  architects: "omnigcloud@gmail.com",
  legal: "omnigcloud@gmail.com",
  press: "omnigcloud@gmail.com",
  security: "omnigcloud@gmail.com",
  support: "omnigcloud@gmail.com",
  sales: "omnigcloud@gmail.com",
  onboarding: "omnigcloud@gmail.com",
  ceo: "omnigcloud@gmail.com",
  research: "omnigcloud@gmail.com",
  privacy: "omnigcloud@gmail.com",
} as const;

/**
 * Helper function to get email address by department
 */
export function getEmail(department: keyof typeof EMAIL_CONFIG): string {
  return EMAIL_CONFIG[department];
}

/**
 * Helper function to create mailto link
 */
export function getMailtoLink(department: keyof typeof EMAIL_CONFIG, subject?: string): string {
  const email = EMAIL_CONFIG[department];
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

// Export individual emails for convenience
export const {
  primary: PRIMARY_EMAIL,
  admin: ADMIN_EMAIL,
  architects: ARCHITECTS_EMAIL,
  legal: LEGAL_EMAIL,
  press: PRESS_EMAIL,
  security: SECURITY_EMAIL,
  support: SUPPORT_EMAIL,
  sales: SALES_EMAIL,
  onboarding: ONBOARDING_EMAIL,
  ceo: CEO_EMAIL,
  research: RESEARCH_EMAIL,
  privacy: PRIVACY_EMAIL,
} = EMAIL_CONFIG;
