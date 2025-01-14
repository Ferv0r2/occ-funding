'use client';

import { useQuery } from '@tanstack/react-query';
import { User, Wallet, Mail } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// TODO: get projects and add shortcuts
export const fetchUser = async () => {
  const res = await fetch('/api/user');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function ProfilePage() {
  const t = useTranslations('Profile');
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  const params = useParams();

  const totalBacked = new Intl.NumberFormat(params.locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(user?.totalAmountBacked);

  if (isLoading) {
    return <div className="mx-auto max-w-2xl py-8">{t('loading')}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImage} alt={user.name} />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.message}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" value={user.email} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">{t('wallet_address')}</Label>
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <Input id="wallet" value={user.walletAddress} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('projects_created')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{user.projectsCreated}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('projects_backed')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {user.projectsBackedCount}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('total_backed')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{totalBacked}</p>
                </CardContent>
              </Card>
            </div>
            <Button className="w-full">{t('edit_profile')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
