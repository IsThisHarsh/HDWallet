export interface ChainAccount {
    address: string;
    balance: string;
    index: number;
    privateKey: string;
}

export interface ChainAccounts {
    [chain: string]: ChainAccount[];
}

export interface WalletState {
    darkMode: boolean;
    toggleDarkMode: () => void;
    mnemonic: string | null;
    setMnemonic: (mnemonic: string) => void;
    getMnemonic: () => string | null;
    selectedChain: 'ethereum' | 'polygon' | 'solana';
    setSelectedChain: (chain: 'ethereum' | 'polygon' | 'solana') => void;
    accounts: {
        [chain: string]: {
            address: string;
            balance: string;
            index: number;
        }[];
    };
    addAccount: (chain: string, account: { address: string; balance: string; index: number }) => void;
    removeAccount: (chain: string, address: string) => void;
    loading: boolean;
    setLoading: (status: boolean) => void;
    resetStore: () => void;
}