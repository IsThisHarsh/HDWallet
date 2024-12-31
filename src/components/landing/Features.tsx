import {Shield, Coins, Layers, RefreshCw} from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Bank-Grade Security',
        description: 'Your keys are encrypted and never leave your device',
    },
    {
        icon: Coins,
        title: 'Multi-Chain Support',
        description: 'Manage ETH, Polygon, and Solana from one secure location',
    },
    {
        icon: Layers,
        title: 'HD Wallet Technology',
        description: 'Generate unlimited addresses from a single seed phrase',
    },
    {
        icon: RefreshCw,
        title: 'Real-Time Updates',
        description: 'Live balance and transaction tracking across all chains',
    },
];

export function Features() {
    return (
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why Choose HDWallet</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Built with security and simplicity in mind
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                        >
                            <feature.icon className="w-12 h-12 text-primary-600 mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}