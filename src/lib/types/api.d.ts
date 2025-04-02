import { metadata } from "./../../app/layout";
declare type ErrorMessage = {
  message: string;
  code: number;
};
declare type SuccessMessage = {
  message: string;
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
