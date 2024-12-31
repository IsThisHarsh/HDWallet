import {Plus} from 'lucide-react';
import {Button} from '../components/shared/Button';
import {ChainSelector} from '../components/wallet/ChainSelector';
import {AccountList} from '../components/wallet/AccountList';
import {useWalletAccounts} from '../hooks/useWalletAccounts';
import {useWalletStore} from '../store/useWalletStore';

export function WalletDashboard() {
    const {selectedChain} = useWalletStore();
    const {loading, accounts, addAccount, removeAccount} = useWalletAccounts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
                <div className="flex space-x-4">
                    <ChainSelector/>
                    <Button
                        onClick={addAccount}
                        disabled={loading}
                        className="flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2"/>
                        Add Account
                    </Button>
                </div>
            </div>

            <AccountList
                chain={selectedChain}
                accounts={accounts}
                onRemove={removeAccount}
            />
        </div>
    );
}