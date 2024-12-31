import {useWalletStore} from '../../store/useWalletStore';

export function ChainSelector() {
    const {selectedChain, setSelectedChain} = useWalletStore();

    return (
        <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value as any)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800"
        >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
        </select>
    );
}