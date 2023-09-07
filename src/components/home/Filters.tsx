import {
  IndexFilters,
  IndexFiltersMode,
  IndexFiltersProps,
} from '@shopify/polaris';


export default function Filters({
  mode,
  setMode,
  filters = [],
  onQueryChange,
  onQueryClear,
  onClearAll,
  selected = 1,
  sortSelected = [],
  ...props
}: Partial<
  Omit<
    IndexFiltersProps,
    'canCreateNewView' | 'tabs' | 'queryPlaceholder'
  >
>) {
  const emptyFn = () => {};
  return (
    <IndexFilters
      selected={selected}
      onClearAll={onClearAll ?? emptyFn}
      onQueryClear={onQueryClear ?? emptyFn}
      onQueryChange={onQueryChange ?? emptyFn}
      sortSelected={sortSelected}
      canCreateNewView={false}
      queryPlaceholder='Search by order number or customer name'
      tabs={[]}
      mode={mode || IndexFiltersMode.Default}
      setMode={setMode ?? emptyFn}
      cancelAction={{
        onAction: props.cancelAction?.onAction ?? emptyFn,
        disabled: false,
        loading: false,
      }}
      filters={filters}
      {...props}
    />
  );
}
