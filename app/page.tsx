import { ThreeItemGrid } from 'components/grid/three-items';

// export const runtime = 'edge';

export const metadata = {
  description: 'Myra Culture Spot, the home for emerging talent.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      {/* <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense> */}
    </>
  );
}
