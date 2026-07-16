import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Root HTML document for every statically-rendered web page. Sets global,
 * SEO-relevant <head> tags and the page background. Per-route <title>,
 * description, canonical and JSON-LD are added by the <Seo> component.
 *
 * This file has no effect on native.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0000FF" />

        {/* PWA + Apple home-screen support */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NA Inventory" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Disables body scrolling on native ScrollView parity for web. */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const globalStyles = `
html, body, #root { height: 100%; }
/*
 * The react-native-web reset only sets the -webkit-/-ms- prefixes, so Firefox
 * (which reads the unprefixed property) falls back to "auto" and inflates text
 * on small screens — making fonts larger than Chrome and pushing the header
 * title under the nav arrows. Pin all variants to 100% so every browser renders
 * the designed pixel sizes.
 */
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
body {
  background-color: #f4f4f4;
  overscroll-behavior-y: none;
}
/* On wide screens, frame the reading column with a subtle gradient (legacy behavior). */
@media screen and (min-width: 850px) {
  body {
    background: linear-gradient(to right, #6e6e6e 0%, #f4f4f4 22%, #f4f4f4 78%, #6e6e6e 100%);
  }
}
`;
