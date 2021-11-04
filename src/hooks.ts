import RequestContext from "./requestContext"
import Express, { Router } from "express"
import { ExpressoError, RequestError } from "./errors"

export function useRequestObject(): Express.Request {
    return RequestContext.get().request
}

export function useResponseObject(): Express.Response {
    return RequestContext.get().response
}

export function useParam(key: string): any {
    const { route, request } = RequestContext.get()
    const param = request.params[key]
    return param !== undefined ? param : (() => {
        if (!route.includes(":" + key)) throw new ExpressoError("USING_UNDECLARED_PARAMETER", `You tried to acess the key '${key}', even though it is not part of the route '${route}`)
        throw new RequestError("MISSING_PAREMETER", `Expected parameter '${key}' to be set`)
    })()
}

export function useBody(): any {
    const request = useRequestObject()
    return request.body
}