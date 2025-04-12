declare type ApiResponse<T> = {
  message: string;
  metadata: metadata;
} & T;

declare type ErrorMessage = {
  code: number;
};
declare type SuccessMessage = {
  token: string;
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

declare type ApiResponse = SuccessMessage | ErrorMessage;
