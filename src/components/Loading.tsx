import React from "react";
import {Loader} from 'lucide-react';
import {useWalletStore} from '../store/useWalletStore';

const Loading = ({children}: { children: React.ReactNode }) => {
    const {loading} = useWalletStore();

    return (
        <>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <Loader className="animate-spin" size={50} strokeWidth={2} color="white"/>
                </div>
            )}
            {children}
        </>
    );
};

export default Loading;
