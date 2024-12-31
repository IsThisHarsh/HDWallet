import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export class CryptoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CryptoError';
    }
}

export const encryptData = (data: string, password: string): string => {
    if (!data || !password) {
        throw new CryptoError('Data and password are required for encryption');
    }
    return CryptoJS.AES.encrypt(data, password).toString();
};

export const decryptData = (encryptedData: string, password: string): string => {
    if (!encryptedData || !password) {
        throw new CryptoError('Encrypted data and password are required for decryption');
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new CryptoError('Decryption failed');
        }
        return decrypted;
    } catch (error) {
        throw new CryptoError('Failed to decrypt data');
    }
};

type StorageValue = string | number | boolean | object | null;

export const secureStorage = {
    set: <T extends StorageValue>(key: string, value: T, password: string): void => {
        if (!key || !password) {
            throw new CryptoError('Key and password are required');
        }
        const encrypted = encryptData(JSON.stringify(value), password);
        localStorage.setItem(key, encrypted);
    },

    get: <T extends StorageValue>(key: string, password: string): T | null => {
        if (!key || !password) {
            throw new CryptoError('Key and password are required');
        }
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return null;
            const decrypted = decryptData(encrypted, password);
            return JSON.parse(decrypted) as T;
        } catch (error) {
            console.error('Error retrieving from secure storage:', error);
            return null;
        }
    },

    remove: (key: string): void => {
        if (!key) {
            throw new Error('Key is required');
        }
        localStorage.removeItem(key);
    },

    clear: (): void => {
        localStorage.clear();
    }
};