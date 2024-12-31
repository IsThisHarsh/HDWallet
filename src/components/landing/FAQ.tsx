const faqs = [
  {
    question: 'What is a HD Wallet?',
    answer: 'A Hierarchical Deterministic (HD) Wallet generates multiple crypto addresses from a single seed phrase, allowing you to manage multiple accounts securely.',
  },
  {
    question: 'How secure is HDWallet?',
    answer: 'CineWallet uses industry-standard encryption and never stores your private keys on servers. All sensitive data is encrypted and stored locally.',
  },
  {
    question: 'Which networks are supported?',
    answer: 'Currently, HDWallet supports Ethereum, Polygon, and Solana networks, with more chains planned for the future.',
  },
  {
    question: 'Can I recover my wallet?',
    answer: 'Yes, you can recover your wallet using your seed phrase. Make sure to store it securely offline.',
  },
];

export function FAQ() {
  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}