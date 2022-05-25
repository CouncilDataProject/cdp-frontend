import React, { FC } from "react";
import { useHistory } from "react-router-dom";

interface ErrorPageProps {
  error?: any;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }: ErrorPageProps) => {
  let history = useHistory();
  let errorText = error ? error.toString() : "Sorry, we can’t find that page.";

  return (
    <div>
      <h1>{errorText}</h1>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

export default ErrorPage;
