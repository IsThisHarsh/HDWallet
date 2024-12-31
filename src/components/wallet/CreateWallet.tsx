import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as bip39 from 'bip39';
import {useWalletStore} from '../../store/useWalletStore';
import {Copy, RefreshCw} from 'lucide-react';
import {WalletService} from "../../services/wallet";

export function CreateWallet() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {setMnemonic, addAccount, resetStore} = useWalletStore();
    const [phrase, setPhrase] = useState(() => bip39.generateMnemonic());
    const [confirmed, setConfirmed] = useState(false);

    const regeneratePhrase = () => {
        setPhrase(bip39.generateMnemonic());
        setConfirmed(false);
    };

    const copyPhrase = async () => {
        await navigator.clipboard.writeText(phrase);
    };

    const handleConfirm = async () => {
        if (!confirmed) return;

        setLoading(true);
        try {
            resetStore();

            const walletService = WalletService.getInstance();
            setMnemonic(phrase);
            walletService.setMnemonic(phrase);

            const accounts = await walletService.initializeWallet();

            Object.entries(accounts).forEach(([chain, chainAccounts]) => {
                chainAccounts.forEach(account => {
                    addAccount(chain, {
                        address: account.address,
                        balance: account.balance,
                        index: account.index
                    });
                });
            });

            navigate('/wallet');
        } catch (error) {
            console.error('Failed to initialize wallet:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Wallet</h1>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Seed Phrase</h2>
                    <div className="space-x-2">
                        <button
                            onClick={copyPhrase}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            title="Copy to clipboard"
                        >
                            <Copy size={20}/>
                        </button>
                        <button
                            onClick={regeneratePhrase}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            title="Generate new phrase"
                        >
                            <RefreshCw size={20}/>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                    {phrase.split(' ').map((word, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600"
                        >
                            <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">
                                {index + 1}.
                            </span>
                            {word}
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={confirmed}
                            onChange={(e) => setConfirmed(e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <span className="text-sm">
                            I have safely stored my seed phrase
                        </span>
                    </label>

                    <button
                        onClick={handleConfirm}
                        disabled={!confirmed || loading}
                        className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                    >
                        {loading ? 'Initializing...' : 'Continue to Wallet'}
                    </button>
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
                    Important Security Notice
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Never share your seed phrase with anyone. Store it securely offline.
                    You'll need it to recover your wallet if you lose access.
                </p>
            </div>
        </div>
    );
}