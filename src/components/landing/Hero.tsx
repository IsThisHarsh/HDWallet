import {Link} from 'react-router-dom';
import {Wallet} from 'lucide-react';

export function Hero() {
    return (
        <div className="relative overflow-hidden h-[90vh] flex justify-center items-center">
            <div className="bg-hero-pattern bg-cover bg-center absolute inset-0 opacity-20 dark:opacity-10"/>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
                        Your Secure HD Wallet
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                        Secure, intuitive, and beautifully designed HD wallet for the modern crypto enthusiast
                    </p>
                    <Link
                        to="/create"
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors mr-2"
                    >
                        <Wallet className="mr-2" size={20}/>
                        Create Wallet
                    </Link>
                    <Link
                        to="/derive"
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-800  text-white hover:bg-primary-900 transition-colors"
                    >
                        <Wallet className="mr-2" size={20}/>
                        Derive Wallet
                    </Link>
                </div>
            </div>
        </div>
    );
}