import { RequestHandler } from "express";
import { allowAccessWithoutSid } from "../config";
import CONSTS from '../consts.json';

function verifySessionId(sessions: string[]): RequestHandler {
    return (req, res, next) => {
        if (allowAccessWithoutSid) return next()

        const session = req.query.sid;

        const publicPaths = [CONSTS.paths.login, CONSTS.paths.new];


        if (publicPaths.some(path => path === req.path))
            return next();

        if (session) {
            if (sessions.some(s => s === session)) {
                req.body.session = session;
                return next();
            } else if (allowAccessWithoutSid) {
                return next();
            } else {
                res.status(401).send('Session not found');
            }
        } else if (allowAccessWithoutSid) {
            return next();
        } else {
            res.status(401).send('This endpoint must have an SID included with it');
        }
    }
}

export default verifySessionId;