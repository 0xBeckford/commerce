import { GridTileImage } from 'components/grid/tile';
import { threeFeaturedSpotlightHandles } from 'data/config';
import { fetchSpotlight } from 'lib/fetch-spotlight';
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
          src={item.featuredImage ? item.featuredImage.url : item.images[0].url}
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

  const items = await Promise.all(threeFeaturedSpotlightHandles.map(async (handle) =>
    await fetchSpotlight(handle)
  ));
  return (
    <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2" data-testid="homepage-products">
      <ThreeItemGridItem size="full" item={items[0]} background="black" />
      <ThreeItemGridItem size="half" item={items[1]} background="black" />
      <ThreeItemGridItem size="half" item={items[2]} background="black" />
    </section>
  );
}
