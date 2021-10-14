import { useEffect } from "react";

function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title == null || title === "") {
      return () => {};
    }

    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
