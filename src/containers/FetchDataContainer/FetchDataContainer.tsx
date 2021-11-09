import React, { FC, ReactNode } from "react";

import { Loader } from "semantic-ui-react";

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
    return <Loader active size="massive" style={{ top: "40%" }} />;
  }
  if (error) {
    // Display the error for now.
    // TODO: throw the error and catch it with a general error boundary that displays the error page.
    return <span>{error.toString()}</span>;
  }
  return <>{children}</>;
};

export default FetchDataContainer;
