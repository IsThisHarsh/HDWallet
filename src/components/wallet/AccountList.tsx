import {Wallet, Trash2} from 'lucide-react';
import {Card} from '../shared/Card';
import {Button} from '../shared/Button';

interface AccountListProps {
    chain: string;
    accounts: Array<{
        address: string;
        balance: string;
        index: number;
    }>;
    onRemove: (address: string) => void;
}

export function AccountList({chain, accounts, onRemove}: AccountListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accounts?.map((account, index) => (
                <Card key={account.address}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                            <Wallet className="w-6 h-6 text-primary-600 mr-2"/>
                            <span className="font-semibold">Account {account.index + 1}</span>
                        </div>
                        {accounts.length > 1 && index === accounts.length - 1 && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onRemove(account.address)}
                                className="p-1"
                            >
                                <Trash2 className="w-5 h-5"/>
                            </Button>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Address:</span>
                            <p className="font-mono text-xs break-all">{account.address}</p>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Balance:</span>
                            <p className="font-semibold">
                                {account.balance} {chain.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}