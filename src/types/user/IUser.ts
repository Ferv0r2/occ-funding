export type IUser = {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  profileImage?: string;
  message?: string;
  projectsCreated: number;
  projectsBackedCount: number;
  totalAmountBacked: number;
};
