"use client";
// import categories from "@/app/category/categories";
// import { Button } from "@chakra-ui/react";

import Link from "next/link";
import React, { useState } from "react";

function NavbarComponent({ data, userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="assets/img/logo/Studio-Project.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FlexiEra
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <NavbarActions /> */}
          <Link href={data?.user ? "/account" : "/login"}>
            <img
              className="w-8 h-8 rounded-xl"
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            //   src={
            //     userData[0]?.profile_image
            //       ? userData[0]?.profile_image
            //       : "assets/img/logo/man.png"
            //   }
              alt="line"
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/authors"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Authors
              </a>
            </li>
            <li>
              <button onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                <a
                  // href="/category"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Categories
                </a>
              </button>
            </li>
            <li>
              <a
                href="/blog"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Blogs
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="mega-menu-full-dropdown"
        className={
          isCategoryOpen
            ? "mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
            : "hidden"
        }
      >
        {/* <div className="grid grid-cols-3 max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
          <ul>
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.value}`}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{category.name}</div>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {categories.slice(6, 12).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.value}`}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">{category.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </nav>
  );
}

export default NavbarComponent;
