export class WhereCondition {
  fieldPath: string;
  whereOperator: WHERE_OPERATOR;
  fieldValue: any;

  constructor(fieldPath: string, whereOperator: WHERE_OPERATOR, fieldValue: any) {
    this.fieldPath = fieldPath;
    this.whereOperator = whereOperator;
    this.fieldValue = fieldValue;
  }
}

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

export class OrderCondition {
  fieldPath: string;
  orderDirection: ORDER_DIRECTION;

  constructor(fieldPath: string, orderDirection: ORDER_DIRECTION) {
    this.fieldPath = fieldPath;
    this.orderDirection = orderDirection;
  }
}

export enum ORDER_DIRECTION {
  asc = "asc",
  desc = "desc",
}

export const MAX_DOCUMENTS_NUM = 1000;
