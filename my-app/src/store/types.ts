export interface IServiceResponse {
  message: string;
  payload: any;
  isSuccess: boolean;
  errors: Array<string>;
}
