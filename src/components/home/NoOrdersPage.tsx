import { LegacyCard, Page } from '@shopify/polaris';

const NoOrdersPage = () => (
  <Page title='Dashboard'>
    <LegacyCard
      sectioned
      title={
        <span className='mediumFontSized semiBoldFonts'>
          Manage your invoices
        </span>
      }
    >
      <span className='smallFontSized'>
        Once your store has orders, this is where you&apos;ll see the
        corresponding invoices.
      </span>
    </LegacyCard>
  </Page>
);

export default NoOrdersPage;
