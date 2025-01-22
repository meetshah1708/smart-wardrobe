import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                            Smart Wardrobe
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <Link href="/wardrobe" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            My Wardrobe
                        </Link>
                        <Link href="/planner" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Outfit Planner
                        </Link>
                        <Link href="/suggestions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Get Suggestions
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;