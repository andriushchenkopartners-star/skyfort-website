// app/_lib/portal/advisor.js
// Static advisor profile data. Safe to import from both server + client.
// Separated from auth.js (which imports next/headers — server-only).

export const ADVISOR = {
  email: 'andrii@sky-fort.ca',
  name: 'Andrii Andriushchenko',
  initials: 'AA',
  nrd: '4575551',
  firm: 'Axcess Capital Advisors Inc.',
  title: {
    en: 'Licensed Dealing Representative',
    ru: 'Лицензированный консультант',
    uk: 'Ліцензований консультант',
  },
  jurisdictions: ['Alberta', 'British Columbia', 'Ontario'],
  languages: ['EN', 'UK', 'RU'],
  phone: '+1-403-397-2553',
  calendly: 'https://calendly.com/andriushchenko-partners/new-meeting',
};
