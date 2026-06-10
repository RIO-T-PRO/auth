import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { z } from "zod";

type RequestField = "body" | "query" | "params";

export const validate =
  <T>(schema: ZodType<T>, field: RequestField = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[field]);

    if (!parsed.success) {
      res.status(400).json({ error: z.flattenError(parsed.error).fieldErrors });
      return;
    }

    if ((field = "query")) {
      res.locals.query = parsed.data;
    } else if ((field = "body")) {
      req.body = parsed.data;
    } else {
      req.params = parsed.data as Request["params"];
    }

    next();
  };
