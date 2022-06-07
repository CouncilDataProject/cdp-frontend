import React, { FC, ReactNode } from "react";

import { Loader } from "semantic-ui-react";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

interface FetchDataContainerProps {
  isLoading: boolean;
  children?: ReactNode;
  error?: any;
}

const FetchDataContainer: FC<FetchDataContainerProps> = ({
  isLoading,
  children,
  error,
}: FetchDataContainerProps) => {
  if (isLoading) {
    return <Loader active size="massive" />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  return <>{children}</>;
};

export default FetchDataContainer;
