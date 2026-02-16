import { useEffect } from "react";

const DEFAULT_TITLE = "Loyalty Thameem | Thameem Ansari Portfolio";
const DEFAULT_DESCRIPTION =
  "Loyalty Thameem (Thameem Ansari) portfolio: Senior Frontend Engineer and Senior React.js Developer building scalable, high-performance web applications.";

const upsertMetaTag = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLinkTag = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertScriptTag = (id: string, jsonValue: object) => {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }

  element.text = JSON.stringify(jsonValue);
};

const SeoHead = () => {
  useEffect(() => {
    const siteUrl =
      import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || window.location.origin;
    const canonicalPath = window.location.pathname || "/";
    const canonicalUrl = `${siteUrl}${canonicalPath}`;

    document.title = DEFAULT_TITLE;

    upsertMetaTag("meta[name='description']", {
      name: "description",
      content: DEFAULT_DESCRIPTION
    });

    upsertMetaTag("meta[property='og:title']", {
      property: "og:title",
      content: DEFAULT_TITLE
    });

    upsertMetaTag("meta[property='og:description']", {
      property: "og:description",
      content: DEFAULT_DESCRIPTION
    });

    upsertMetaTag("meta[property='og:url']", {
      property: "og:url",
      content: canonicalUrl
    });

    upsertMetaTag("meta[name='twitter:title']", {
      name: "twitter:title",
      content: DEFAULT_TITLE
    });

    upsertMetaTag("meta[name='twitter:description']", {
      name: "twitter:description",
      content: DEFAULT_DESCRIPTION
    });

    upsertMetaTag("meta[property='og:image']", {
      property: "og:image",
      content: `${siteUrl}/images/personal/profile.jpg`
    });

    upsertMetaTag("meta[name='twitter:image']", {
      name: "twitter:image",
      content: `${siteUrl}/images/personal/profile.jpg`
    });

    upsertLinkTag("link[rel='canonical']", {
      rel: "canonical",
      href: canonicalUrl
    });

    upsertScriptTag("person-schema", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Thameem Ansari",
      alternateName: "Loyalty Thameem",
      jobTitle: "Senior Frontend Engineer",
      description:
        "Senior Frontend Engineer focused on React.js, TypeScript, performance, and scalable frontend architecture.",
      url: canonicalUrl,
      image: `${siteUrl}/images/personal/profile.jpg`,
      sameAs: [
        "https://github.com/loyalty-thameem",
        "https://www.linkedin.com/in/loyalty-thameem-88489222a",
        "https://x.com/Loyalty_Thameem",
        "https://www.instagram.com/loyalty_thameem/",
        "https://www.youtube.com/@Loyalty_Thameem"
      ]
    });
  }, []);

  return null;
};

export default SeoHead;

