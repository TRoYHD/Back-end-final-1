export interface Params {
  id: number;
}

export interface PaginationQuery {
  page: string;
  perPage: string;
}

export interface Payload {
  id: number;
  name: string;
  email: string;
}
export interface ParamsDictionary {
  [key: string]: string;
}

export interface QueryString {
  [key: string]: string | string[] | undefined;
}

export interface ParsedQs {
  [key: string]: string | string[] | undefined;
}