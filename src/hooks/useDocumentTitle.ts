import { useEffect } from "react";

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Council Data Project";
    };
  }, [title]);
}

export default useDocumentTitle;
