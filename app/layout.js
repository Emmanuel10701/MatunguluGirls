import localFont from "next/font/local";
import "./globals.css";
import ClientLayoutWrapper from "./-app";
import { SessionProvider } from "./session/sessiowrapper";

/* -------------------------------------------------------------------------- */
/* FONTS                                    */
/* -------------------------------------------------------------------------- */
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/* -------------------------------------------------------------------------- */
/* VIEWPORT                                  */
/* -------------------------------------------------------------------------- */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c", // Matches your orange-600 brand color
};

/* -------------------------------------------------------------------------- */
/* METADATA                                  */
/* -------------------------------------------------------------------------- */
export const metadata = {
  metadataBase: new URL("https://katwanyaa.vercel.app"),

  title: {
    default: "Matungulu Girls High School",
    template: "%s | Matungulu Girls Senior High School",
  },

  description:
    "The official website of Matungulu Girls Senior High School in Matungulu, Machakos County. Dedicated to academic excellence, Christian values, and holistic student development in Kenya.",
  
  keywords: [
    "Matungulu Girls Senior High School",
    "Matungulu Girls Secondary School",
    "Matungulu g",
    "Matungulu Girls school",
    "Matungulu Girls High School",
    "MatG school",
    "MatG",
    "Matungulu Girls Senior High",
    "MatG senior high school",
    "Matungulu Girls High School Matungulu",
    "Machakos County Schools",
    "Best secondary schools in Machakos",
    "Public schools in Kenya",
    "Matungulu Girls school results",
    "Matungulu Girls school admissions",
    "Matungulu Girls school events",
    "Matungulu Girls school news",
    "Matungulu Girls school contact",
    "Matungulu Girls school location",
    "Matungulu Girls school map",
    "Matungulu Girls school history",
    "Matungulu Girls school achievements",
    "Matungulu Girls school curriculum",
    "Matungulu Girls school fees",
    "Matungulu Girls school uniform",
    "Matungulu Girls school alumni",    
    
  ],

  authors: [{ name: "Matungulu Girls Senior High School" }],
  
  alternates: {
    canonical: "/",
  },

  /* Open Graph (Social Media Sharing) */
  openGraph: {
    title: "Matungulu Girls High School",
    description: "Official school website.",
    url: "https://matungulu-girls.vercel.app",
    siteName: "Matungulu Girls High School",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/MatG.jpg",
        width: 1200,
        height: 630,
        alt: "Matungulu Girls Senior High School",
      },
    ],
  },

  /* Twitter Card */
  twitter: {
    card: "summary_large_image",
    title: "Matungulu Girls Senior High School",
    description: "Empowering students through education and faith in Machakos County.",
    images: ["/MatG.jpg"],
  },

  /* Search Engine Bot Instructions */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/MatG.jpg",
    apple: "/MatG.jpg",
  },

  verification: {
    google: "googlef8123d1ff1ecb88f",
  },
};

/* -------------------------------------------------------------------------- */
/* ROOT LAYOUT                                 */
/* -------------------------------------------------------------------------- */
export default function RootLayout({ children }) {
  // Structured Data (JSON-LD) for Local Business/School SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Matungulu Girls Senior High School",
    "alternateName": "Matungulu Girls High School",
    "url": "https://matungulu-girls.vercel.app",
    "logo": "https://matungulu-girls.vercel.app/MatG.jpg",
    "image": "https://matungulu-girls.vercel.app/MatG.jpg",
    "description": "A premier public secondary school in Matungulu, Machakos County, Kenya.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Matungulu",
      "addressRegion": "Machakos County",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2825", // Optional: replace with your actual GPS coordinates
      "longitude": "37.2618"
    },
    "hasMap": "https://www.google.com/maps?q=matungulu+girls+School", 
    "telephone": "+254-000-000000", // Update with official school phone
    "priceRange": "N/A"
  };

  return (
    <html lang="en">
      <head>
        {/* Injecting Structured Data into the Head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-orange-50 via-white to-amber-50 text-gray-900`}
      >
        <SessionProvider>
          <ClientLayoutWrapper>
            {/* Semantic <main> tag should wrap content in page.jsx files for SEO */}
            {children}
          </ClientLayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}