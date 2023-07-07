import Link from 'next/link';

import GitHubIcon from 'components/icons/github';
import LogoIcon from 'components/icons/logo';
import VercelIcon from 'components/icons/vercel';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  return (
    <footer className="border-t border-gray-700 bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-gray-700 py-12 transition-colors duration-150 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-3">
            <a className="flex flex-initial items-center font-bold md:mr-24" href="/">
              <span className="mr-2">
                <LogoIcon className="h-8" />
              </span>
              <span>{copyrightDate}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
