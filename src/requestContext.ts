
import { create } from "@soundboks/async-local-context"
import Express from "express"

interface TRequestContext {
    route: string,
    request: Express.Request,
    response: Express.Response,
}

const context = create<TRequestContext>()

export default new (class {
    init(initialValue: TRequestContext) {
        context.asyncStorage.enterWith(initialValue)
    }
    get(): TRequestContext {
        return context.use()
    }
})()
