import { makeRestController } from './controllers'
import { Request, Response } from "express";

describe("makeRestControllers", () => {
  it("should return a controller object", () => {
    const handler = (req: Request, res: Response) => { res.json({}) };
    const restHandler = makeRestController('totoCtrl', handler)
  })
})
