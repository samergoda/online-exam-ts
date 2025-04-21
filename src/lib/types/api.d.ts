declare type ErrorResponse = {
  message: string;
  code: number;
};
declare type SuccessfulResponse = {
  message: string;
  metadata: metadata;
};

declare type DatabaseFields = {
  _id: string;
  createdAt: string;
};

declare type metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
