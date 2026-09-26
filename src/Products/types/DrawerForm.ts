export type Payload =
  | { route: string; name: string | undefined }
  | { route: string; description: string | undefined }
  | { route: string; ruc: string | undefined; name: string | undefined }


export interface Form {
  route: string
  name: string
  ruc?: string
  description?: string
}
