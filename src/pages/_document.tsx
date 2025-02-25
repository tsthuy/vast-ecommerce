// import Document, {
//   Html,
//   Head,
//   Main,
//   NextScript,
//   DocumentContext,
// } from "next/document";

// class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       // Get locale from context
//       locale: ctx.locale || "en",
//     };
//   }

//   render() {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const { locale } = this.props as any;

//     return (
//       <Html lang={locale}>
//         <Head />
//         <body className="antialiased">
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    return (
      <Html lang={locale}>
        <Head>
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
