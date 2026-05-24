// app/resources/layout.js
// Окремий layout для /resources лише щоб виставити noindex.
// Сторінка з конфіденційними матеріалами не повинна індексуватись пошуком.

export const metadata = {
  title: "Бібліотека документів — SkyFort Wealth",
  robots: { index: false, follow: false },
};

export default function ResourcesLayout({ children }) {
  return children;
}
