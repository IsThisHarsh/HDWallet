import React, {useState, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useWalletStore} from '../../store/useWalletStore';
import {WalletService} from '../../services/wallet';
import {Eye, EyeOff} from 'lucide-react';

export function DeriveWallet() {
    const navigate = useNavigate();
    const [mnemonic, setMnemonic] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMnemonic, setShowMnemonic] = useState(false);
    const [error, setError] = useState('');
    const setStoreMnemonic = useWalletStore((state) => state.setMnemonic);
    const {resetStore, addAccount} = useWalletStore();
    const {darkMode} = useWalletStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            resetStore();
            const walletService = WalletService.getInstance();
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
            walletService.setMnemonic(mnemonic);
            setStoreMnemonic(mnemonic);
            navigate('/wallet');
        } catch (err) {
            setError('Invalid mnemonic phrase. Please check and try again.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Import Existing Wallet</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="mnemonic" className="block text-sm font-medium mb-2">
                        Enter your seed phrase
                    </label>
                    <div className="relative">
                       <textarea
                           id="mnemonic"
                           value={mnemonic}
                           onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMnemonic(e.target.value)}
                           className={`w-full p-3 border rounded-lg ${
                               error ? 'border-red-500' : 'border-gray-300'
                           } ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                           rows={3}
                           placeholder="Enter your 12 or 24-word seed phrase"
                       />

                        <button
                            type="button"
                            onClick={() => setShowMnemonic(!showMnemonic)}
                            className="absolute right-3 top-3"
                            aria-label={showMnemonic ? 'Hide seed phrase' : 'Show seed phrase'}
                        >
                            {showMnemonic ? (
                                <EyeOff className="w-5 h-5 text-gray-500"/>
                            ) : (
                                <Eye className="w-5 h-5 text-gray-500"/>
                            )}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                >
                    {loading ? 'Deriving...' : 'Import Wallet'}
                </button>
            </form>

            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg" role="alert">
                <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
                    Security Warning
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Never share your seed phrase with anyone. Make sure you're on the correct website
                    before entering your seed phrase.
                </p>
            </div>
        </div>
    );
}