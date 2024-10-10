/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";


export function handleUnexistentRoutes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(404).json({
        error: "Not found",
        message: `The route ${req.method} ${req.originalUrl} does not exist on this server`,
    });
}