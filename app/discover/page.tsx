import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { fetchAllSpotlights } from 'lib/fetch-spotlight';

export default async function SearchPage() {

  const products = await fetchAllSpotlights();

  return (
    <>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}