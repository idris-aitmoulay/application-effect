import { Request, Response } from "express";
import {ApplicationConfigContext, getApplication} from "./application-config";
import {Effect} from "effect";
export type Handler = (req: Request, res: Response) => void;
export type MiddlewareFunction = (req: Request, res: Response, next: Function) => void;
export type SingleOrArrayOf<T> = T | T[];

type MakeRestControllerRawContent = { key: string, handler: Function, middlewares: SingleOrArrayOf<MiddlewareFunction> }
export function makeRestController(key: string, handler: Function): Effect.Effect<Handler, never, ApplicationConfigContext>
export function makeRestController(key: string, handler: Function, middlewares: SingleOrArrayOf<MiddlewareFunction>): Effect.Effect<Handler, never, ApplicationConfigContext>
export function makeRestController(params: MakeRestControllerRawContent): Effect.Effect<Handler, never, ApplicationConfigContext>
export function makeRestController(
  keyOrParams: string | MakeRestControllerRawContent,
  handler?: Function,
  middlewares?: SingleOrArrayOf<MiddlewareFunction>
): Effect.Effect<Handler, never, ApplicationConfigContext> {
  let params: MakeRestControllerRawContent;

  if (typeof keyOrParams === 'string') {
    params = {
      key: keyOrParams,
      handler: handler!,
      middlewares: middlewares || []
    };
  } else {
    params = keyOrParams;
  }

  return Effect.gen(function* () {
    const application = yield* getApplication()

    if (!application) return;

    return application.post('/toto', params.middlewares, params.handler);
  })
}

