//TODO estudar todo esse arquivo
import type { Request } from "express"
import type { ParamsDictionary } from "express-serve-static-core"

/** Request tipado apenas pela Query String (req.query) */
export type QueryRequest<Q extends Record<string, unknown>> = Request<
    ParamsDictionary,
    unknown,
    unknown,
    Q
>

/** Request tipado apenas pelo Body (req.body) */
export type BodyRequest<B> = Request<ParamsDictionary, unknown, B>

/** Request tipado pelo Body e pela Query String */
export type FullRequest<B, Q extends Record<string, unknown>> = Request<
    ParamsDictionary,
    unknown,
    B,
    Q
>
