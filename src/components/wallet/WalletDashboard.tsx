import {useState} from 'react';
import {useWalletStore} from '../../store/useWalletStore';
import {WalletService} from '../../services/wallet';
import {Wallet, Plus, Trash2} from 'lucide-react';

type ChainType = 'ethereum' | 'polygon' | 'solana';

export function WalletDashboard() {
    const {
        selectedChain,
        setSelectedChain,
        accounts,
        addAccount,
        removeAccount,
    } = useWalletStore();

    const [loading, setLoading] = useState(false);

    const handleAddAccount = async () => {
        setLoading(true);
        try {
            const walletService = WalletService.getInstance();
            const index = accounts[selectedChain].length;

            const newAccount = await walletService.deriveAccount(selectedChain, index);
            const balance = await walletService.getBalance(selectedChain, newAccount.address);

            addAccount(selectedChain, {
                address: newAccount.address,
                balance,
                index,
            });
        } catch (error) {
            console.error('Error adding account:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
                <div className="flex space-x-4">
                    <select
                        value={selectedChain}
                        onChange={(e) => setSelectedChain(e.target.value as ChainType)}
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="ethereum">Ethereum</option>
                        <option value="polygon">Polygon</option>
                        <option value="solana">Solana</option>
                    </select>
                    <button
                        onClick={handleAddAccount}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-5 h-5 mr-2"/>
                        Add Account
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {accounts[selectedChain].map((account) => (
                    <div
                        key={account.address}
                        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <Wallet className="w-6 h-6 text-primary-600 mr-2"/>
                                <span className="font-semibold">Account {account.index + 1}</span>
                            </div>
                            <button
                                onClick={() => removeAccount(selectedChain, account.address)}
                                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                                aria-label="Remove account"
                            >
                                <Trash2 className="w-5 h-5"/>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Address:</span>
                                <p className="font-mono text-xs break-all">{account.address}</p>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Balance:</span>
                                <p className="font-semibold">{account.balance} {selectedChain.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}