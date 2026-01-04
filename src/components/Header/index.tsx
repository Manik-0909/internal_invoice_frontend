import { Icon } from '@iconify/react';
import Logo from '../../../public/static/img/full-logo.png';

export const Header = () => {
  return (
    <header className="sticky top-0 z-99 border-b border-neutral-200 bg-white px-4 py-5 md:px-10">
      <div className="container-max-w mx-auto flex items-center justify-between gap-10">
        <a href="#" className="block w-fit">
          <img
            src={Logo}
            alt="Numois Logo"
            className="max-h-10"
            loading="lazy"
          />
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1">
            <Icon
              icon="mynaui:credit-card"
              width="20"
              height="20"
              className="text-neutral-800"
            />
            <p className="text-sm font-semibold tracking-wide text-nowrap">
              Credits: <span>49</span>
            </p>
          </div>

          <div className="relative" data-twe-dropdown-ref>
            <button
              className="bg-secondary-300 font-sora min-h-10 min-w-10 cursor-pointer rounded-full text-sm font-bold"
              type="button"
              id="profileDropdownButton"
              data-twe-dropdown-toggle-ref
              aria-expanded="false"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              DS
            </button>
            <ul
              className="absolute z-1000 float-left m-0 hidden w-40 list-none overflow-hidden rounded-lg border border-neutral-200 bg-white bg-clip-padding py-1 text-base shadow-lg data-[twe-dropdown-show]:block"
              aria-labelledby="profileDropdownButton"
              data-twe-dropdown-menu-ref
            >
              <li>
                <a
                  className="hover:bg-secondary-200 flex w-full items-center gap-1 border-t border-transparent px-4 py-2 text-xs font-semibold no-underline duration-150 hover:border-neutral-200"
                  href="#"
                  data-twe-dropdown-item-ref
                >
                  <Icon icon="solar:user-linear" width="16" height="16" />
                  Profile
                </a>
              </li>

              <li>
                <a
                  className="hover:bg-secondary-200 flex w-full items-center gap-1 border-t border-transparent px-4 py-2 text-xs font-semibold no-underline duration-150 hover:border-neutral-200"
                  href="#"
                  data-twe-dropdown-item-ref
                >
                  <Icon icon="hugeicons:setting-07" width="16" height="16" />
                  Settings
                </a>
              </li>

              <hr className="border-neutral-200" />

              <li>
                <a
                  className="hover:bg-secondary-200 flex w-full items-center gap-1 px-4 py-2 text-xs font-semibold no-underline duration-150"
                  href="#"
                  data-twe-dropdown-item-ref
                >
                  <Icon icon="humbleicons:logout" width="16" height="16" />
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
