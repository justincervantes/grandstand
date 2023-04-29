import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/logo.png';
import ShowToast from '../components/toast';

export default function Header() {
    const { data: session } = useSession();

    const router = useRouter();
    const heading = 'text-base font-medium text-gray-500 hover:text-gray-900';
    const activeHeading = `${heading} text-gray-900`;
    return (
        <header>
            <ShowToast />
            <title>Spotlight</title>
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <div className="relative bg-white">
                <div className="mx-auto w-full px-4 sm:px-6">
                    <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="/">
                                <span className="sr-only">Spotlight</span>
                                <Image className="h-12 w-auto" src={logo} alt="Logo" />
                            </a>
                        </div>

                        {session && (
                            <div className="block items-center justify-end md:flex">
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
                            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn();
                                    }}
                                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Access with Github
                                    <svg
                                        className="ml-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {session && (
                            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                                Welcome, {session.user.name}!
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
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
