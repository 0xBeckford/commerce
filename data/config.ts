export const threeFeaturedSpotlightHandles = ['oliver-cheshire', 'henley-beckford', 'paige-lilley'];

export type Menu = {
  title: string;
  path: string;
};

export function getMenu(): Menu[] {
  const menu = [
    { title: 'Home', path: '/' },
    { title: 'Discover', path: '/discover' }
  ];

  return menu;
}
