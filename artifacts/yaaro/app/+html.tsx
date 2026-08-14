import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta
          name="google-site-verification"
          content="GGRoSJA3Z6FwyWpxDwR5mZjA0jC9dAh2yrHQlkJQo94"
        />

        <title>Yaaro Social</title>
        <meta
          name="description"
          content="Yaaro Social - Connect, share and stay connected."
        />

        <ScrollViewStyleReset />
      </head>

      <body>{children}</body>
    </html>
  );
} 
