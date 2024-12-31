import {Connection, PublicKey, LAMPORTS_PER_SOL, Keypair} from '@solana/web3.js';
import * as bip39 from 'bip39';
import bs58 from 'bs58';

export class SolanaService {
    private connection: Connection;

    constructor() {
        this.connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL);
    }

    async getBalance(address: string): Promise<string> {
        try {
            const publicKey = new PublicKey(address);
            const balance = await this.connection.getBalance(publicKey);
            return (balance / LAMPORTS_PER_SOL).toString();
        } catch (error: any) {
            if (error.message && error.message.includes("invalid address")) {
                throw new Error(`Invalid address provided: ${address}`);
            } else if (error.message && error.message.includes("StructError")) {
                throw new Error(`Failed to fetch balance for address ${address}: StructError encountered. 
                    Please check the address and network connection.`);
            } else {
                throw new Error(`Failed to fetch balance for address ${address}: ${error.message}`);
            }
        }
    }

    async deriveAccount(mnemonic: string, index: number) {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const seedBuffer = Buffer.from(seed).slice(0, 31);
        const seedWithIndex = Buffer.concat([seedBuffer, Buffer.from([index])]);
        const keypair = Keypair.fromSeed(seedWithIndex);

        return {
            address: keypair.publicKey.toString(),
            privateKey: bs58.encode(keypair.secretKey)
        };
    }
}