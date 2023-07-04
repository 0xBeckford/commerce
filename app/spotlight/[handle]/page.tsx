import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import Prose from 'components/prose';
import { Image } from 'lib/shopify/types';

import { readFileSync, readdirSync } from 'fs';
import path from 'path';

// export const runtime = 'edge';

const testProduct = {
  title: 'Test Product',
  badgeText: 'Test Badge',
  handle: 'test-product',
  seo: {
    title: 'Test Product',
    description: 'Test Description'
  },
  description: 'This is a test product',
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=500',
    width: 500,
    height: 500,
    altText: 'Test Product'
  },
  images: [
    {
      url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=500',
      width: 500,
      height: 500,
      altText: 'Test Product'
    },
    {
      url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=500',
      width: 500,
      height: 500,
      altText: 'Test Product'
    },
    {
      url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=500',
      width: 500,
      height: 500,
      altText: 'Test Product'
    },
    {
      url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=500',
      width: 500,
      height: 500,
      altText: 'Test Product'
    }
  ],
  descriptionHtml: `
  <div>
  <h1>Meet XXXXXX</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sequi dolorem iusto aut. Quibusdam, assumenda vel! Dignissimos dolor aspernatur esse, sint dicta voluptatum perferendis? Dolorum dicta hic voluptas a architecto?</p>
  <p>read more</p>
  <h2>Auter</h2>
  <p>OUT NOW</p>
  <div>
    <a href="http://www.youtube.com">YouTube</a>
    <a href="http://www.spotify.com">spotify</a>
    <a href="https://music.apple.com/gb/browse">applemusic</a>
    <a href="http://www.soundcloud.com">soundcloud</a>
    <a href="http://www.tidal.com">tidal</a>
  </div>
</div>`
};

// export async function generateMetadata({
//   params
// }: {
//   params: { handle: string };
// }): Promise<Metadata> {
//   const product = testProduct;

//   if (!product) return notFound();

//   const { url, width, height, altText: alt } = product.featuredImage || {};
//   const hide = false;

//   return {
//     title: product.seo.title || product.title,
//     description: product.seo.description || product.description,
//     robots: {
//       index: hide,
//       follow: hide,
//       googleBot: {
//         index: hide,
//         follow: hide
//       }
//     },
//     openGraph: url
//       ? {
//         images: [
//           {
//             url,
//             width,
//             height,
//             alt
//           }
//         ]
//       }
//       : null
//   };
// }

const fetchSpolight = async (fileName: string): Promise<{
  title: string,
  description: string,
  badgeText: string,
  handle: string,
  descriptionHtml: string,
  featuredImage: Image,
  images: Array<Image>
}> => {
  return new Promise((resolve) => {
    try {
      const json = readFileSync(path.join(process.cwd(), `./data/spotlights/${fileName}.json`)).toString();
      const data = JSON.parse(json);
      const html = readFileSync(path.join(process.cwd(), `./data/spotlights/${fileName}.html`)).toString();
      const files = readdirSync(path.join(process.cwd(), `./public/images/spotlights/${fileName}`));
      const images = files.map((file) => {
        return {
          url: `/images/spotlights/${fileName}/${file}`,
          width: 500,
          height: 500,
          altText: 'Test Product'
        };
      });
      resolve({ ...data, images, descriptionHtml: html });
    } catch {
      resolve(testProduct);
    }
  });

}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  console.log('$$', params.handle);
  const spotlight = await fetchSpolight(params.handle);
  if (!spotlight) return notFound();

  return (
    <div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <Gallery
            title={spotlight.title}
            badgeText={spotlight.badgeText}
            images={spotlight.images.map((image: Image) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </div>

        <div className="p-6 lg:col-span-2">
          {spotlight.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={spotlight.descriptionHtml} />
          ) : null}
        </div>
      </div>
      <Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </div>
  );
}
