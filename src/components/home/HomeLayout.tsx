import { ComponentProps, PropsWithChildren } from 'react';
import styles from './Dashboard.module.scss';
import {
  Banner,
  Divider,
  Layout,
  LegacyCard,
  LegacyStack,
  Page,
  Pagination,
  Select,
  SelectProps,
} from '@shopify/polaris';
import Filters from './Filters';
import { HintMajor } from '@shopify/polaris-icons';

const limitOptions = ['25', '50', '75', '100'].map(option => ({
  label: option,
  value: option,
}));

export default function HomeLayout({
  children,
  filterProps,
  hasPreviousPage = false,
  hasNext = false,
  onPageChange,
  currentPage = 1,
  totalEntryOnPage = 25,
  onSelectChange = () => {},
}: PropsWithChildren<{
  onSelectChange?: SelectProps['onChange'];
  totalEntryOnPage?: number;
  onPageChange?: (newPage?: number) => void;
  currentPage?: number;
  hasPreviousPage?: boolean;
  hasNext?: boolean;
  filterProps: ComponentProps<typeof Filters>;
}>) {
  return (
    <div className={styles.container}>
      <Page title='Dashboard'>
        <Layout>
          <Layout.Section fullWidth>
            <div style={{ maxWidth: '100%', marginBottom: '2rem' }}>
              <LegacyCard>
                <Filters {...filterProps} />
                <div className={styles.polarisIndexTableContainer}>
                  {children}
                </div>
                <Divider />
                <LegacyCard.Section>
                  <LegacyStack distribution='center' alignment='center'>
                    <Pagination
                      hasPrevious={hasPreviousPage}
                      previousKeys={[74]}
                      previousTooltip='Previous (J)'
                      onPrevious={onPageChange}
                      hasNext={hasNext}
                      nextKeys={[75]}
                      nextTooltip='Next (K)'
                      onNext={() => {
                        onPageChange?.(currentPage + 1);
                      }}
                    />
                    <div className='dashboardPage__totalEntryInputContainer'>
                      <Select
                        value={String(totalEntryOnPage)}
                        onChange={onSelectChange}
                        options={limitOptions}
                        label={null}
                      />
                    </div>
                  </LegacyStack>
                </LegacyCard.Section>
              </LegacyCard>
            </div>
            <Banner icon={HintMajor} status='info'>
              Now you can view/download your invoices from your orders page
              itself. Select particular orders (50 max) or open a particular
              order and choose Invoice Hero features from More actions drop
              down.
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
