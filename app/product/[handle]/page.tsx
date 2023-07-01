import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import Prose from 'components/prose';
import { Image } from 'lib/shopify/types';

export const runtime = 'edge';

const testProduct = {
  title: 'Test Product',
  badgeText: 'Test Badge',
  handle: 'test-product',
  seo: {
    title: 'Test Product',
    description: 'Test Description'
  },
  description: 'This is a test product',
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

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = testProduct;

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const hide = false;

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: hide,
      follow: hide,
      googleBot: {
        index: hide,
        follow: hide
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = testProduct;

  if (!product) return notFound();

  return (
    <div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <Gallery
            title={product.title}
            badgeText={product.badgeText}
            images={product.images.map((image: Image) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </div>

        <div className="p-6 lg:col-span-2">
          {product.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
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
