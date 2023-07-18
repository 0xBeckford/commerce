import { readFileSync, readdirSync } from 'fs';
import { Image } from 'lib/shopify/types';
import path from 'path';

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

export type Spotlight = {
  title: string;
  description: string;
  badgeText: string;
  handle: string;
  descriptionHtml: string;
  featuredImage: Image;
  images: Array<Image>;
};

export const fetchSpotlight = async (fileName: string): Promise<Spotlight> => {
  return new Promise((resolve) => {
    try {
      const json = readFileSync(
        path.join(process.cwd(), `./data/spotlights/${fileName}.json`)
      ).toString();
      const data = JSON.parse(json);
      const html = readFileSync(
        path.join(process.cwd(), `./data/spotlights/${fileName}.html`)
      ).toString();
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
};

export const fetchAllSpotlights = async (): Promise<Array<Spotlight>> => {
  return new Promise(async (resolve) => {
    try {
      const names = readdirSync(path.join(process.cwd(), `./public/images/spotlights`)).sort();
      const promises = names.map((name) => fetchSpotlight(name));
      const results = await Promise.all(promises);
      resolve(results);
    } catch {
      resolve([testProduct]);
    }
  });
};
