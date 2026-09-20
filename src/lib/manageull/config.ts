// These are public installation identifiers, never API/admin credentials.
export const manageullConfig = {
  origin: process.env.MANAGEULL_API_ORIGIN || 'https://manageull-backend.onrender.com',
  siteKey: process.env.MANAGEULL_SITE_KEY || 'mng_site_47srnWgOTiqkyi3Vkir_RGjiwrbgtQKmqLWVBFDJTjw',
  verification: process.env.MANAGEULL_SITE_VERIFICATION || 'mng_verify_SyiecGH5QQCc0061Cve-OLplC1NySuUOmGMPc2n8Rrg',
};

export const MANAGEULL_CACHE_TAG = 'manageull:published';
