import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {encryptData, decryptData} from '../lib/utils';
import {WalletState} from "../types.ts";

const STORAGE_PASSWORD = 'm6#A$cNBe!fcZ9jy!Rmk';

export const useWalletStore = create<WalletState>()(
    persist(
        (set, get) => ({
            darkMode: false,
            toggleDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
            mnemonic: null,
            setMnemonic: (mnemonic) => {
                const encrypted = encryptData(mnemonic, STORAGE_PASSWORD);
                set({mnemonic: encrypted});
            },
            getMnemonic: () => {
                const state = get();
                if (!state.mnemonic) return null;
                return decryptData(state.mnemonic, STORAGE_PASSWORD);
            },
            selectedChain: 'ethereum',
            setSelectedChain: (chain) => set({selectedChain: chain}),
            accounts: {
                ethereum: [],
                polygon: [],
                solana: [],
            },
            addAccount: (chain, account) =>
                set((state) => ({
                    accounts: {
                        ...state.accounts,
                        [chain]: [...(state.accounts[chain] || []), account],
                    },
                })),
            removeAccount: (chain, address) =>
                set((state) => ({
                    accounts: {
                        ...state.accounts,
                        [chain]: state.accounts[chain].filter((acc) => acc.address !== address),
                    },
                })),
            loading: true,
            setLoading: (status: boolean) => set({loading: status}),
            resetStore: () =>
                set(() => ({
                    mnemonic: null,
                    selectedChain: 'ethereum',
                    accounts: {
                        ethereum: [],
                        polygon: [],
                        solana: [],
                    },
                    loading: false,
                })),
        }),
        {
            name: 'wallet-storage',
            partialize: (state) => ({
                darkMode: state.darkMode,
                mnemonic: state.mnemonic,
                accounts: state.accounts,
                loading: state.loading
            }),
        }
    )
);