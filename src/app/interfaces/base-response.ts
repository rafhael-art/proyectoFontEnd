
export interface BaseResponse<T> {

  succes: false,
  data: T,
  mensaje: string,
  innerExeption: any
}
