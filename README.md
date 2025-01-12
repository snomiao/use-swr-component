# use-swr-component

Use SWR to fetch Component in dynamic, that component could be server component or client component.

## Usage

```tsx
<UseSWRComponent
  props={{ prop1, prop2 }}
  Component={YourServerComponent}
  fallbackData={<YourServerComponent {...{ prop1, prop2 }} />}
  refreshInterval={1000}
/>
```
