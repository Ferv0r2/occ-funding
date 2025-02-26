'use client';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { ReactNode, useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import '@/styles/wallet-button.css';

export const SolanaWalletProvider = ({ children }: { children: ReactNode }) => {
  // Solana 네트워크 연결 (devnet 사용)
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  // 지원할 지갑 설정
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
