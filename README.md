# use-swr-component

## Usage

```tsx
<UseSWRComponent
    props={{ prop1, prop2 }}
    Component={YourServerComponent}
    fallbackData={<YourServerComponent {...{ prop1, prop2 }} />}
    refreshInterval={1000}
/>
```