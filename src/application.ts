import { Effect } from "effect";
import {Application} from "express";
import { layerFromApplicationConfigContext } from "./application-config";
import {makeRestController, MiddlewareFunction, SingleOrArrayOf} from "./controllers";

type Controller = {
  handler: Function
  middlewares?: SingleOrArrayOf<MiddlewareFunction>
}
export const makeRestControllers = (application: Application, controllers: Record<string, Controller>) => {
  const applicationConfigLayer = layerFromApplicationConfigContext({ application });
  return Effect.gen(function* () {
    // @ts-ignore avoid symbol iterator
    for (const controllerName of controllers) {
      const controller = controllers[controllerName];
      if (controller) {
        makeRestController(controllerName, controller.handler, controller?.middlewares ?? []);
      }
    }

    return;
  }).pipe(Effect.provide(applicationConfigLayer))
}
