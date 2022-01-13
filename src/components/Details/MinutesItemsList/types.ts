import MinutesItem from "../../../models/MinutesItem";

export interface Document {
  /*Document item label */
  label: string;
  /*Document item url */
  url: string;
}

export interface Item extends Pick<MinutesItem, "name" | "description" | "matter_ref"> {
  /*Array of attachments for a given minutes item*/
  documents?: Document[];
}
