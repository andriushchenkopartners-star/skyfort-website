// app/[locale]/portal/(dashboard)/documents/page.js
import { cookies } from 'next/headers';
import { requireOnboardedClient } from '../../../../_lib/portal/auth';
import { serverClient } from '../../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import DocumentsList from './DocumentsList';

export const dynamic = 'force-dynamic';

export default async function DocumentsPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);
  const supabase = serverClient(cookies);

  const { data: documents } = await supabase
    .from('portal_documents')
    .select('*')
    .eq('user_id', user.id)
    .eq('visible', true)
    .order('uploaded_at', { ascending: false });

  return (
    <DocumentsList
      initialDocuments={documents || []}
      userId={user.id}
      locale={safeLocale}
      t={t}
    />
  );
}
