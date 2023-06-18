import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/logo.png';
import ShowToast from '../components/toast';
import DropdownMenu from './dropdown';
import Loading from './loading';

export default function Header({ loading = false }) {
    const { data: session } = useSession();
    const router = useRouter();
    const heading = 'text-base font-medium text-gray-500 hover:text-gray-900';
    const activeHeading = 'text-base font-medium font-bold';

    return (
        <header className="mb-5">
            <ShowToast />
            <title>Grandstand</title>
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <div className="relative bg-white">
                <div className="w-full px-4 mx-auto sm:px-6">
                    <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
                        <div className="justify-start order-2 hidden lg:w-0 lg:flex-1 md:flex md:order-first">
                            <a href="/">
                                <span className="sr-only">Grandstand</span>
                                <Image className="w-auto h-12" src={logo} alt="Logo" />
                            </a>
                        </div>

                        {session && (
                            <div className="items-center justify-end order-first block md:flex">
                                <div className="flex items-center text-center md:hidden">
                                    <DropdownMenu
                                        placeholder=""
                                        options={['About Me', 'Projects', 'Blog', 'Preview']}
                                        onOptionClick={(option) => {
                                            router.push(`/${option.replace(/ /, '-').toLowerCase()}`);
                                        }}
                                        value={''}
                                    />
                                </div>
                                <nav className="hidden space-x-10 md:flex">
                                    <Link
                                        href="/about-me"
                                        className={router.pathname === '/about-me' ? activeHeading : heading}
                                    >
                                        About Me
                                    </Link>
                                    <Link
                                        href="/projects"
                                        className={router.pathname === '/projects' ? activeHeading : heading}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className={router.pathname === '/blog' ? activeHeading : heading}
                                    >
                                        Blog
                                    </Link>
                                    <Link
                                        href="/preview"
                                        className={router.pathname === '/preview' ? activeHeading : heading}
                                    >
                                        Preview
                                    </Link>
                                </nav>
                            </div>
                        )}
                        {!session && (
                            <div className="flex items-center justify-center flex-1 order-last md:justify-end lg:w-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn();
                                    }}
                                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm ml whitespace-nowrap hover:bg-indigo-700"
                                >
                                    Access with Github
                                    <img
                                        className="w-8 h-8 ml-2"
                                        src="https://cdn-icons-png.flaticon.com/512/919/919847.png"
                                        alt="github"
                                    />
                                </button>
                            </div>
                        )}
                        {session && (
                            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                    className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="w-full h-1 rounded-full">{loading && <Loading />}</div>
                </div>
            </div>
        </header>
    );
}
