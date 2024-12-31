import {useCallback} from 'react';
import {useWalletStore} from '../store/useWalletStore';
import {WalletService} from '../services/wallet';

export function useWalletAccounts() {
    const {selectedChain, accounts, addAccount, removeAccount, getMnemonic, setLoading, loading} = useWalletStore();

    const handleAddAccount = useCallback(async () => {
        setLoading(true);
        try {
            const mnemonic = getMnemonic();
            if (!mnemonic) {
                throw new Error('No mnemonic found');
            }

            const walletService = WalletService.getInstance();
            walletService.setMnemonic(mnemonic);

            const index = accounts[selectedChain]?.length || 0;
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
    }, [selectedChain, accounts, addAccount, getMnemonic, setLoading]);

    const handleRemoveAccount = useCallback((address: string) => {
        removeAccount(selectedChain, address);
    }, [selectedChain, removeAccount]);

    return {
        loading,
        accounts: accounts[selectedChain],
        addAccount: handleAddAccount,
        removeAccount: handleRemoveAccount,
    };
}