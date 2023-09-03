import {
  Page,
  LegacyCard,
  IndexTable,
  Banner,
  SkeletonBodyText,
  Button,
  IndexFilters,
  IndexFiltersMode,
  useSetIndexFiltersMode,
} from "@shopify/polaris";

function DashboardLoadingCom() {
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Default);
  const rowMarkup = [
    <IndexTable.Row position={0} id="" key="1">
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
    <Page title="Dashboard">
      <div style={{ maxWidth: "100%", marginBottom: "2rem" }}>
        <LegacyCard>
          <IndexFilters
            filters={[]}
            cancelAction={{
              onAction: () => {},
              disabled: true,
              loading: false,
            }}
            mode={mode}
            setMode={setMode}
            tabs={[]}
            selected={1}
            onQueryChange={() => {}}
            onQueryClear={() => {}}
            onClearAll={() => {}}
          />
          <IndexTable
            headings={[
              { title: "Invoice" },
              { title: "Order" },
              { title: "Date" },
              { title: "Name" },
              { title: "Total", alignment: "end" },
              { title: "Payment" },
              { title: "Fulfillment" },
              { title: "Status" },
              { title: "" },
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
        </LegacyCard>
      </div>
      <Banner status="info">
        Now you can view/download your invoices from your orders page itself.
        Select particular orders (50 max) or open a particular order and choose
        Invoice Hero features from More actions drop down.
      </Banner>
    </Page>
  );
}

export default DashboardLoadingCom;
