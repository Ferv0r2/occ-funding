import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Unplug, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/routing';
import { replaceAddress } from '@/lib/utils/replace-data';

interface UserProfileProps {
  isLoading: boolean;
  name: string;
  email: string;
  profileImage?: string;
}

export const UserProfile = ({
  isLoading,
  name,
  email,
  profileImage,
}: UserProfileProps) => {
  const t = useTranslations('Header');
  const { connected, publicKey, disconnect } = useWallet();

  // 지갑 주소를 짧게 표시 (예: Sxyz...abc)
  const walletAddress = publicKey?.toBase58() ?? '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isLoading && connected ? (
          <DropdownMenuItem>
            <span>
              {t('wallet_info', {
                address: replaceAddress(walletAddress),
              })}
            </span>

            <Unplug
              className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.preventDefault();
                disconnect();
              }}
            />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <WalletMultiButton />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">{t('profile')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
        <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
