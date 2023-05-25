import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/logo.png';
import ShowToast from '../components/toast';
import DropdownMenu from './dropdown';

export default function Header() {
    const { data: session } = useSession();

    const router = useRouter();
    const heading = 'text-base font-medium text-gray-500 hover:text-gray-900';
    const activeHeading = `${heading} text-gray-900`;
    return (
        <header>
            <ShowToast />
            <title>Grandstand</title>
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <div className="relative bg-white">
                <div className="mx-auto w-full px-4 sm:px-6">
                    <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <div className="justify-start lg:w-0 lg:flex-1 order-2 hidden md:flex md:order-first">
                            <a href="/">
                                <span className="sr-only">Grandstand</span>
                                <Image className="h-12 w-auto" src={logo} alt="Logo" />
                            </a>
                        </div>

                        {session && (
                            <div className="block items-center justify-end md:flex order-first">
                                <div className="flex md:hidden text-center items-center">
                                    <DropdownMenu
                                        placeholder=""
                                        options={['About Me', 'Projects', 'Blog']}
                                        onOptionClick={(option) => {
                                            router.push(`/${option.replace(/ /, '-').toLowerCase()}`);
                                        }}
                                        value={''}
                                    />
                                </div>
                                <nav className="space-x-10 hidden md:flex">
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
                                </nav>
                            </div>
                        )}
                        {!session && (
                            <div className="items-center justify-center md:justify-end flex flex-1 lg:w-0 order-last">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn();
                                    }}
                                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
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
                                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
