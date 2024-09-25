export namespace Api {
  export type PathParameters = {
    [key: string | number]: string | number
  }
  export type QueryParameters = {
    [key: string | number]: any
  }
  export interface RequestParameters {
    pathParams?: PathParameters
    queryParams?: QueryParameters
    body?: any
  }
  export type Request<P extends RequestParameters = {}> = P
}
