import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.flyinglyte.com";
const SITE_NAME = "FlyingLyte";

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  keywords,
  jsonLd,
}) => {
  const FinalTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Best Travel Packages`;

  const finaldescription =
    description |
    "Book best travel packages, flights, hotels and holiday deals with FlyingLyte.";

  const finalCanonical = canonical || SITE_URL;

  //   const finalImage = image || `${SITE_URL}/og-image.jpg`

  return (
    <Helmet>
      <title>{FinalTitle}</title>

      <meta name="description" content={finaldescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={finalCanonical}></link>

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={FinalTitle} />
      <meta property="og:description" content={finaldescription} />
      <meta property="og:url" content={finalCanonical} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
