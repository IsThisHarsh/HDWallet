import * as bip39 from 'bip39';
import {EthereumService} from './chains/ethereum';
import {PolygonService} from './chains/polygon';
import {SolanaService} from './chains/solana';
import {ChainAccounts} from "../types.ts";

export class WalletService {
    private static instance: WalletService;
    private mnemonic: string | null = null;
    private ethereumService: EthereumService;
    private polygonService: PolygonService;
    private solanaService: SolanaService;

    private constructor() {
        this.ethereumService = new EthereumService();
        this.polygonService = new PolygonService();
        this.solanaService = new SolanaService();
    }

    static getInstance(): WalletService {
        if (!WalletService.instance) {
            WalletService.instance = new WalletService();
        }
        return WalletService.instance;
    }

    setMnemonic(mnemonic: string) {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic');
        }
        this.mnemonic = mnemonic;
    }

    async initializeWallet(): Promise<ChainAccounts> {
        const chains = ['ethereum', 'polygon', 'solana'];
        const accounts: ChainAccounts = {};

        for (const chain of chains) {
            if (!accounts[chain]) {
                accounts[chain] = [];
            }

            const account = await this.deriveAccount(chain, 0);
            const balance = await this.getBalance(chain, account.address);

            accounts[chain].push({
                address: account.address,
                balance,
                index: 0,
                privateKey: account.privateKey
            });
        }

        return accounts;
    }

    async deriveAccount(chain: string, index: number) {
        if (!this.mnemonic) throw new Error('Mnemonic not set');

        switch (chain) {
            case 'ethereum':
                return this.ethereumService.deriveAccount(this.mnemonic, index);
            case 'polygon':
                return this.polygonService.deriveAccount(this.mnemonic, index);
            case 'solana':
                return this.solanaService.deriveAccount(this.mnemonic, index);
            default:
                throw new Error('Unsupported chain');
        }
    }

    async getBalance(chain: string, address: string): Promise<string> {
        switch (chain) {
            case 'ethereum':
                return this.ethereumService.getBalance(address);
            case 'polygon':
                return this.polygonService.getBalance(address);
            case 'solana':
                return this.solanaService.getBalance(address);
            default:
                throw new Error('Unsupported chain');
        }
    }
}