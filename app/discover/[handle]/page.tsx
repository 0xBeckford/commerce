import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { Image } from 'lib/shopify/types';

import ReadMore from 'components/read-more';
import { fetchSpotlight } from '../../../lib/fetch-spotlight';

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {spotlight.title}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {spotlight.badgeText}
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {spotlight.description}
          </p>
          <ReadMore title={spotlight.title} innerHtml={spotlight.descriptionHtml} />
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
