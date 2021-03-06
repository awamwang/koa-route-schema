import * as Koa from 'koa'
import ajv from 'ajv'

// plugin to Koa.Context
declare module 'koa' {
  interface Context {
    routeSchemaErrors?: Error[]
  }
}

declare namespace KoaRouteSchema {
  export interface parseFunc {
    (o: Record<string, unknown>)
  }
  export interface AjvErrorsOptions {
    keepErrors?: boolean,
    singleError?: boolean
  }
}
export interface KoaRouteSchemaOptions {
  ajv?: ajv.Options
  ajvErrors?: KoaRouteSchema.AjvErrorsOptions | boolean
  ajvKeywords?: string | ReadonlyArray<string> | boolean
  parseSchemaOptions?: Record<string, unknown>
  getRoute?: KoaRouteSchema.parseFunc
  getMethod?: KoaRouteSchema.parseFunc
  getSchema?: KoaRouteSchema.parseFunc
  getBodySchema?: KoaRouteSchema.parseFunc
  getQuerySchema?: KoaRouteSchema.parseFunc
  getData?(ctx: Koa.Context, type: 'body' | 'query'): Record<string, unknown>

  attachRoute?(router, route): void

  bodyErrorPrefix?: string
  queryErrorPrefix?: string

  onError?: (err: Error, ctx: Koa.Context) => any | boolean
}


// class declare
declare class KoaRouteSchema {
  constructor(options: KoaRouteSchemaOptions)
  private genMiddlewareFromSchema()
  loadSchemaOptions(schemaOptions: Record<string, unknown>): void
  middleware: Koa.Middleware
  legacyMiddleware: Koa.Middleware
  attachToRouter(router: Record<string, unknown>): void

  routeMiddleware(bodySchema: Record<string, unknown>, querySchema: Record<string, unknown>): Koa.Middleware
  routeBodyMiddleware(schema: Record<string, unknown>): Koa.Middleware
  routeQueryMiddleware(schema: Record<string, unknown>): Koa.Middleware
}
declare function KoaRouteSchema(options?: KoaRouteSchemaOptions): KoaRouteSchema

export default KoaRouteSchema
