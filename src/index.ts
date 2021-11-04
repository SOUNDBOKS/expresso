import Express from "express"
import { RequestError, ExpressoError } from "./errors"
import { useRequestObject } from "./hooks"
import RequestContext from "./requestContext"


export * from "./hooks"


type Handler<T> = () => Promise<T>




function reject_non_json_post() {
    const req = useRequestObject()
    if (req.method === "POST" && req.header("Content-Type") !== "application/json") {
        throw new RequestError("MISSING_CONTENT_TYPE", "POST requests on this endpoint must include the 'Content-Type: application/json' header")
    }
}

export function endpoint<T>(route: string, handler: Handler<T>, middlewares: (() => void)[] = []) {
    return async (request: Express.Request, response: Express.Response) => {
        RequestContext.init({ route, request, response })
        try {
            middlewares.forEach(Function.call)
            const ret = await handler()
            response.send({ ok: true, data: ret })
        } catch(e: any) {
            if (e instanceof ExpressoError) {
                throw e
            }
            response.send({
                error: e.error || true,
                cause: e.cause || e.toString(),
                ...e.extra,
            })
        }
    }
}


export class ApiRouter {
    router = Express.Router()
    get<T>(route: string, handler: Handler<T>) {
        this.router.get(route, endpoint(route, handler))
    }
    post<T>(route: string, handler: Handler<T>) {
        this.router.post(route, endpoint(route, handler, [reject_non_json_post]))
    }
}