import { isAdmin } from '@/lib/auth';
import { getPortfolioContent } from '@/lib/portfolio';
import AdminLogin from './AdminLogin';
import AdminEditor from './AdminEditor';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authenticated = await isAdmin();
  return authenticated ? <AdminEditor initialContent={await getPortfolioContent()} /> : <AdminLogin />;
}
