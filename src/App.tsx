import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useWalletStore} from './store/useWalletStore';
import {ThemeToggle} from './components/ThemeToggle';
import {Wallet} from 'lucide-react';
import {Landing} from './pages/Landing';
import {CreateWallet} from './components/wallet/CreateWallet';
import {DeriveWallet} from './components/wallet/DeriveWallet';
import {WalletDashboard} from './pages/WalletDashboard';
import Loading from './components/Loading';

export function App() {
    const {darkMode} = useWalletStore();

    return (
        <Router>
            <div
                className={`min-h-screen transition-colors ${
                    darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
                }`}
            >
                <Loading>
                    <nav
                        className="fixed w-full bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <Link to="/">
                                    <div className="flex items-center space-x-2">
                                        <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400"/>
                                        <span className="text-xl font-bold">HDWallet</span>
                                    </div>
                                </Link>
                                <ThemeToggle/>
                            </div>
                        </div>
                    </nav>

                    <main className="pt-16">
                        <Routes>
                            <Route path="/" element={<Landing/>}/>
                            <Route path="/create" element={<CreateWallet/>}/>
                            <Route path="/derive" element={<DeriveWallet/>}/>
                            <Route path="/wallet" element={<WalletDashboard/>}/>
                        </Routes>
                    </main>
                </Loading>
            </div>
        </Router>
    );
}
