import { useEffect } from "react";

function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title == null || title === "") {
      // If there's nothing meaningful to put in the title, do nothing.
      return;
    }

    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
