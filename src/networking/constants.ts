export enum WHERE_OPERATOR {
  lt = "<",
  lteq = "<=",
  eq = "==",
  gt = ">",
  gteq = ">=",
  not_eq = "!=",
  array_contains = "array-contains",
  array_contains_any = "array-contains-any",
  in = "in",
  not_in = "not-in",
}

export enum ORDER_DIRECTION {
  asc = "asc",
  desc = "desc",
}

// https://firebase.google.com/docs/firestore/query-data/queries#query_limitations
export const OR_QUERY_LIMIT_NUM = 10;
