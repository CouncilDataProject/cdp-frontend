import React, { FC, ReactNode } from "react";

interface LazyFetchDataContainerProps {
  data: string;
  isLoading: boolean;
  error: Error | null;
  notFound: boolean;
  children: ReactNode;
}

/** The non-blocking version of `FetchDataContainer` -- pair with a component that lazily fetches data. */
const LazyFetchDataContainer: FC<LazyFetchDataContainerProps> = ({
  data,
  isLoading,
  error,
  notFound,
  children,
}: LazyFetchDataContainerProps) => {
  if (isLoading) {
    return <p>{`Fetching ${data}...`}</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (notFound) {
    return <p>{`No ${data} found.`}</p>;
  }
  return <>{children}</>;
};

export default LazyFetchDataContainer;
