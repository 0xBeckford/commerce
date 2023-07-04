import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  background
}: {
  item: any;
  size: 'full' | 'half';
  background: 'white' | 'pink' | 'purple' | 'black';
}) {
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className="block h-full" href={`/spotlight/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          background={background}
          alt={item.title}
          labels={{
            title: item.title as string,
            badgeText: item.badgeText as string,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.

  const item = {
    handle: 'hidden-homepage-featured-items',
    title: 'Hidden Homepage Featured Items',
    badgeText: 'anything',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1681412332858-ec477cb1bb1f?w=987'
    }
  };

  return (
    <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2" data-testid="homepage-products">
      <ThreeItemGridItem size="full" item={item} background="purple" />
      <ThreeItemGridItem size="half" item={item} background="black" />
      <ThreeItemGridItem size="half" item={item} background="pink" />
    </section>
  );
}
