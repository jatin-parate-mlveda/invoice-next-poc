import { Layout, LegacyCard, Page, Text } from '@shopify/polaris';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  return (
    <Page title='Invoice Hero'>
      <Layout>
        <Layout.Section oneHalf>
          <LegacyCard
            title='Total Orders'
            actions={[
              {
                content: 'view report',
                onAction: () => {
                  router.push('/dashboard');
                },
              },
            ]}
          >
            <LegacyCard.Section>
              <Text as='p' variant='heading2xl'>
                {(3_000).toLocaleString()}
              </Text>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
