import Link from 'next/link';

import LogoIcon from 'components/icons/logo';
import { Menu, getMenu } from 'data/config';
import MobileMenu from './mobile-menu';

export default async function Navbar() {
  const menu = getMenu();

  return (
    <nav className="relative flex items-center justify-between bg-white p-4 dark:bg-black lg:px-6">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex justify-self-center md:w-1/3 md:justify-self-start">
        <div className="md:mr-4">
          <Link href="/" aria-label="Go back home">
            <LogoIcon className="h-8 transition-transform hover:scale-110" />
          </Link>
        </div>
        {menu.length ? (
          <ul className="hidden md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="rounded-lg px-2 py-1 text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hidden w-1/3 md:block">
        {/* <Search /> */}
      </div>

      <div className="flex w-1/3 justify-end" />
    </nav>
  );
}
