'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setMobileOpen(!mobileOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary text-white font-sans' : 'bg-white text-gray-900'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 font-medium">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-lg cursor-pointer transition-colors ${scrolled ? 'text-white' : 'text-primary'
                            }`}
                    >
                        <span
                            className={`p-1 rounded font-semibold ${scrolled ? 'bg-white text-primary' : 'bg-primary text-white'
                                }`}
                        >
                            🔗
                        </span>
                        PharmStock Pro
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 items-center text-base font-medium">
                        <Link
                            href="#features"
                            className="cursor-pointer transition-colors hover:text-blue-700"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="cursor-pointer transition-colors hover:text-blue-700"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#demo"
                            className="cursor-pointer transition-colors hover:text-blue-700"
                        >
                            Demo
                        </Link>
                        <button
                            onClick={() => window.location.href = "/auth/signup"}
                            className={`ml-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-300 shadow-sm cursor-pointer ${scrolled
                                ? 'bg-white text-primary hover:bg-gray-100'
                                : 'bg-primary text-white hover:bg-blue-700'
                                }`}
                        >
                            Start Free Trial
                        </button>
                        {/* <Link
                            href="/auth/signup"
                            className={`ml-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-300 shadow-sm cursor-pointer ${scrolled
                                    ? 'bg-white text-primary hover:bg-gray-100'
                                    : 'bg-primary text-white hover:bg-blue-700'
                                }`}
                        >
                            Start Free Trial
                        </Link> */}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden transition-colors cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div
                    className={`md:hidden px-4 pb-4 pt-2 border-t transition-colors ${scrolled ? 'bg-primary text-white' : 'bg-white text-gray-900'
                        }`}
                >
                    <nav className="flex flex-col gap-3 text-sm font-medium">
                        <Link href="#features" className="hover:underline cursor-pointer">
                            Features
                        </Link>
                        <Link href="#pricing" className="hover:underline cursor-pointer">
                            Pricing
                        </Link>
                        <Link href="#demo" className="hover:underline cursor-pointer">
                            Demo
                        </Link>
                        <Link
                            href="/auth/signup"
                            className={`mt-2 py-2 text-center rounded-md font-semibold text-sm transition cursor-pointer ${scrolled
                                ? 'bg-white text-primary hover:bg-gray-100'
                                : 'bg-primary text-white hover:bg-blue-700'
                                }`}
                        >
                            Start Free Trial
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
