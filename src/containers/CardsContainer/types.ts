import { ReactNode } from "react";

export interface Card {
  //**The link pathname of the card */
  link: string;
  /**The jsx element of the card */
  jsx: ReactNode;
  /**The search query used to find the card */
  searchQuery?: string;
}
