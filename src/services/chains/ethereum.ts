import {ethers, Mnemonic} from 'ethers';

export class EthereumService {
    private provider: ethers.JsonRpcProvider;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(
            import.meta.env.VITE_ETHEREUM_RPC_URL
        );
    }

    async getBalance(address: string): Promise<string> {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    async deriveAccount(seedPhrase: string, index: number) {
        const hdNode = ethers.HDNodeWallet.fromPhrase(seedPhrase);
        const mnemonic = hdNode.mnemonic as Mnemonic;
        const path = `m/44'/60'/0'/0/${index}`;
        const derivedNode = ethers.HDNodeWallet.fromMnemonic(mnemonic, path)

        return {
            address: derivedNode.address,
            privateKey: derivedNode.privateKey
        };
    }
}