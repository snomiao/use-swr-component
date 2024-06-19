import stringify from "json-stable-stringify";
import md5 from "md5";
import type { PropsWithChildren } from "react";
import useSWR from "swr";
import type { BareFetcher, SWRConfiguration } from "swr/_internal";

export default function UseSWRComponent<
  P extends any = any,
  Props extends PropsWithChildren<P> = PropsWithChildren<P>,
  ReactNode extends React.ReactNode = React.ReactNode,
  Component extends (props: Props) => Promise<ReactNode> | ReactNode = (
    props: Props
  ) => Promise<ReactNode> | ReactNode,
  Error = any
>({
  props,
  Component,
  children,
  Loading,
  Validating,
  Error,
  ...conf
}: {
  props: Props ;
  /** could be ServerComponent or ClientComponent */
  Component: Component;
  Loading?: (props: { children?: ReactNode }) => ReactNode;
  Validating?: (props: { children?: ReactNode }) => ReactNode;
  Error?: (props: { children?: ReactNode; error: any }) => ReactNode;
  children: SWRConfiguration<
    ReactNode,
    Error,
    BareFetcher<ReactNode>
  >["fallbackData"];
} & SWRConfiguration<ReactNode, Error, BareFetcher<ReactNode>>) {
  const key = "SWRCOMP:" + md5(stringify(props));
  conf.fallbackData ??= children;
  const { data, isLoading, isValidating, error } = useSWR(
    key,
    () => Component(props),
    conf
  );
  if (error && Error) return <Error error={error}>{data}</Error>;
  if (isLoading && Loading) return <Loading>{data}</Loading>;
  if (isValidating && Validating) return <Validating>{data}</Validating>;
  return data;
}
