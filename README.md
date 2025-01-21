# HDWallet

Welcome to the HDWallet project! This web-based hierarchical deterministic (HD) wallet supports both Solana and Ethereum blockchains, enabling users to manage their cryptocurrency assets seamlessly through a unified interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multi-Blockchain Support**: Manage assets on both Solana and Ethereum networks.
- **HD Wallet Functionality**: Generate and manage multiple addresses from a single seed phrase.
- **Web-Based Interface**: Access your wallet securely from any modern web browser.

## Technologies Used

- **Frontend**: Developed using modern web technologies to ensure responsiveness and compatibility across various devices.
- **Backend**: Built with Node.js, leveraging http connection for efficient communication.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) (Node package manager)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IsThisHarsh/HDWallet.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd HDWallet
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure Environment Variables**:

   Rename the `.env.example` file to `.env` and update the variables as needed.

## Usage

To start the application:

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will initialize and be accessible at `http://localhost:3000`.

2. **Access the application**:

   Open your web browser and navigate to `http://localhost:3000` to begin using the HDWallet application.

## Screenshots

Here are some screenshots showcasing the HDWallet application:

1. **Dashboard**:

   ![Dashboard](screenshots/dashboard.png)

2. **Wallet Details**:

   ![Wallet Details](screenshots/wallet_details.png)

3. **Transaction History**:

   ![Transaction History](screenshots/transaction_history.png)

*Note: Replace the placeholder paths with the actual paths to your screenshot images.*

## Contributing

We welcome contributions to enhance the HDWallet application. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using HDWallet! If you encounter any issues or have suggestions, please open an issue in the repository. 
