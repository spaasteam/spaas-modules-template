import { tuple } from '../utils/type'

interface Methods {
  [key: string]: (...args: any) => any
}

let client: any

export function setClient<T>(newClient: T): void {
  client = newClient
}

// Request helpers
const reqMethods = tuple(
  'request',
  'delete',
  'get',
  'head',
  'options', // url, config
  'post',
  'put',
  'patch', // url, data, config
  '$get',
  '$put',
  '$delete',
  '$post'
)
const service: Methods = {}

reqMethods.forEach((method: string) => {
  service[method] = (...rest) => {
    if (!client) throw new Error('apiClient not installed')
    return client[method].apply(null, rest)
  }
})
export const GET = service.get
export const POST = service.post
export const DELETE = service.delete
export const PUT = service.put

export default service
