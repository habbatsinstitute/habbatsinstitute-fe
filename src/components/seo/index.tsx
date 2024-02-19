import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  siteName?: string;
  url?: string;
}

export function SEO({
  title,
  description,
  image,
  type,
  siteName,
  url,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta name="twitter:image" content={image} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
