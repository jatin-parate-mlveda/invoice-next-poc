import {
  SkeletonDisplayText,
  Text,
  Layout,
  LegacyCard,
  Page,
  Banner,
} from '@shopify/polaris';
import { useNavigate } from '@shopify/app-bridge-react';
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAnalyticsQuery } from '@/services/queries.service';
import { GetServerSideProps } from 'next';
import { AnalyticsRes } from '@/services/api.service';

type Props = {
  body: AnalyticsRes;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}api/order/analytics`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wIjoiY2hlY2tvdXQtZXh0ZW5zaW9uLWphdGluLTIubXlzaG9waWZ5LmNvbSJ9.VAJLiRPhNtDACOa46xlr1nYAn82MameY_jNYQOupkwo`,
    },
  });
  const body = (await res.json()) as AnalyticsRes;

  return {
    props: {
      body,
    },
  };
};

export default function AnalyticsPage({ body }: Props) {
  const { data, isLoading } = useAnalyticsQuery(body);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const firstTimeLoadedRef = useRef(false);

  useEffect(() => {
    if (!firstTimeLoadedRef.current) {
      firstTimeLoadedRef.current = true;
      return;
    }

    queryClient.refetchQueries(['analytics']);
  }, [queryClient]);

  return (
    <Page
      title='Analytics'
      primaryAction={{
        content: 'View report',
        // url: '/invoices',
        onAction: () => {
          navigate('/invoices');
        },
      }}
    >
      <Layout>
        <Layout.Section oneThird>
          <LegacyCard sectioned title='Total Orders Received Last Month'>
            {isLoading ? (
              <SkeletonDisplayText size='medium' />
            ) : (
              <Text variant='heading2xl' as='p'>
                {data!.totalOrdersLastMonth}
              </Text>
            )}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard
            sectioned
            title='Total Invoice Emails Sent For Orders In Last Month'
          >
            {isLoading ? (
              <SkeletonDisplayText size='medium' />
            ) : (
              <Text variant='heading2xl' as='p'>
                {data!.totalInvoicesSentLastMonth}
              </Text>
            )}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard
            sectioned
            title='Total Invoice Emails Sent For Orders In This Month'
          >
            {isLoading ? (
              <SkeletonDisplayText size='medium' />
            ) : (
              <Text variant='heading2xl' as='p'>
                {data!.totalInvoicesSentThisMonth}
              </Text>
            )}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Banner status='info'>
            Now you can view/download your invoices from your orders page
            itself. Select particular orders (50 max) or open a particular order
            and choose Invoice Hero features from More actions drop down.
          </Banner>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
