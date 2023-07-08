import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import Prose from 'components/prose';
import { Image } from 'lib/shopify/types';

import { fetchSpotlight } from '../../../lib/fetch-spotlight';

// export const runtime = 'edge';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const spotlight = await fetchSpotlight(params.handle);
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
