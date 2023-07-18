import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Spotlight } from 'lib/fetch-spotlight';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Spotlight[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="h-full w-full" href={`/discover/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              labels={{
                isSmall: true,
                title: product.title,
                badgeText: product.badgeText,
              }}
              src={(product.featuredImage?.url || product.images[0]?.url) as string}
              width={600}
              height={600}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
