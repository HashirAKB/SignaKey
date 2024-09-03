# SignaKey
## Public/Private Keypair Generator & Transaction Simulator

Welcome to the **SignaKey**! This project demonstrates the creation of public/private keypairs and simulates transactions using both ED25519 (for Solana) and secp256k1 (for Ethereum) algorithms. This application is built with a focus on providing a clean, interactive, and visually appealing user experience, complete with a light/dark theme toggle.

## Features

- **Generate Public/Private Keypairs**: Users can generate secure random keypairs for both Solana (ED25519) and Ethereum (secp256k1).
- **Simulate Transactions**: Users can simulate signing a message and verifying the signature, mimicking Ethereum and Solana transactions.
- **Algorithm Support**:
  - **ED25519**: Used for Solana transactions.
  - **secp256k1**: Used for Ethereum transactions.
- **Dark/Light Theme Toggle**: A theme switcher that allows users to toggle between dark and light modes, enhancing user experience based on preference.
- **Modern and Minimal Design**: The application features a modern UI with a teal and purple color scheme, gradient backgrounds, and a slight transparency and blur effect for cards, creating a beautiful and minimalistic appearance.

## How It Works

1. **Generate Keypair**: 
   - Click the "Generate Keypair" button to create a new public/private key pair.
   - The keys are displayed immediately on the interface.

2. **Sign & Verify**:
   - After generating a keypair, a "Sign & Verify" button appears.
   - Click this button to sign a predefined message and verify the signature.
   - The interface shows the generated keys, signatures, and the result of the verification process.

## Technical Details

### Dependencies

To run this project, ensure you have the following dependencies installed:

```shell
npm install @noble/ed25519 @noble/secp256k1 lucide-react
```

## UI Components

To build the frontend, used the following shadcn components:

- `Button`: Used for actions like generating keys and signing messages.
- `Card`, `CardContent`, `CardHeader`, `CardTitle`: Used to display key information and results in a structured manner.
- `Switch`: Used for toggling between light and dark themes.

## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install all required dependencies.
3. **Run the Application**: Use `npm run dev` to run the application in development mode.
4. **Explore**: Open your browser and explore the keypair generation and transaction simulation functionalities.

## Conclusion

This project serves as an excellent starting point for anyone looking to understand the basics of public/private key cryptography and digital signatures, especially in the context of blockchain transactions. Enjoy exploring the secure world of cryptography with a sleek and modern interface!