import React, { FC } from "react";
import { useHistory } from "react-router-dom";

interface ErrorPageProps {
  error?: any;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }: ErrorPageProps) => {
  const history = useHistory();
  const errorText = error ? error.toString() : "";

  return (
    <div>
      <h1 className="mzp-u-title-sm">Sorry, we can’t find that page.</h1>
      <p>{errorText}</p>
      <button className="mzp-c-button mzp-t-secondary mzp-t-md" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default ErrorPage;
