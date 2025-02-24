import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 py-10 px-4 mt-8">
            <div className="max-w-5xl mx-auto text-center">
                {/* Logo */}
                <div className="mb-4">
                    <img src="/logo.png" alt="Logo" className="mx-auto h-10" />
                </div>

                {/* Newsletter Subscription */}
                <h3 className="font-semibold text-gray-800">Subscribe to our newsletter</h3>
                <div className="flex justify-center mt-3">
                    <input
                        type="email"
                        placeholder="Input your email"
                        className="border px-4 py-2 rounded-l-md w-64 text-sm outline-none"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm">Subscribe</button>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-left text-gray-600">
                    <div>
                        <h4 className="font-semibold text-gray-800">Product</h4>
                        <ul className="mt-2 space-y-1">
                            <li>Features</li>
                            <li>Pricing</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800">Resources</h4>
                        <ul className="mt-2 space-y-1">
                            <li>Blog</li>
                            <li>User guides</li>
                            <li>Webinars</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800">Company</h4>
                        <ul className="mt-2 space-y-1">
                            <li>About us</li>
                            <li>Contact us</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800">Plans & Pricing</h4>
                        <ul className="mt-2 space-y-1">
                            <li>Personal</li>
                            <li>Start up</li>
                            <li>Organization</li>
                        </ul>
                    </div>
                </div>

                {/* Language Selector */}
                {/* <div className="mt-6">
                    <select className="border px-3 py-1 rounded-md text-sm">
                        <option>English</option>
                        <option>Spanish</option>
                    </select>
                </div> */}

                {/* Footer Bottom */}
                <div className="mt-8 text-sm text-gray-500">
                    <p>© 2024 Brand, Inc. • Privacy • Terms • Sitemap</p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                    <FaTwitter className="hover:text-blue-500 cursor-pointer" />
                    <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
                    <FaLinkedinIn className="hover:text-blue-600 cursor-pointer" />
                    <FaYoutube className="hover:text-red-600 cursor-pointer" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
