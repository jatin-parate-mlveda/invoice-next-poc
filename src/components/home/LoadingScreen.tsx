import { IndexTable, SkeletonBodyText, Button } from '@shopify/polaris';
import HomeLayout from './HomeLayout';

function DashboardLoadingCom() {
  const rowMarkup = [
    <IndexTable.Row position={0} id='' key='1'>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText lines={1} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Button disabled>Actions</Button>
      </IndexTable.Cell>
    </IndexTable.Row>,
  ];
  return (
    <HomeLayout filterProps={{}}>
      <IndexTable
        headings={[
          { title: 'Invoice' },
          { title: 'Order' },
          { title: 'Date' },
          { title: 'Name' },
          { title: 'Total', alignment: 'end' },
          { title: 'Payment' },
          { title: 'Fulfillment' },
          { title: 'Status' },
          { title: '' },
        ]}
        itemCount={25}
      >
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
        {rowMarkup}
      </IndexTable>
    </HomeLayout>
  );
}

export default DashboardLoadingCom;
