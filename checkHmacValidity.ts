import logger from "../app-logger";
import { isString, isObject } from 'lodash'
import { createHmac } from "crypto";

const removeHmac = (key, { [key]: _, ...rest }) => rest

export const checkHmacValidity = (secret: string, qs: any) => {

    try {
        // should we add a message
        if (!secret || !qs) { return false }
        // const qs: any = req.query;
        logger.debug('query', { qs })
        // QS object
        let obj: any = {};

        // if qs is a string
        if (isString(qs)) {
            // generate object
            obj = new URLSearchParams(qs)
        }
        if (isObject(qs)) {
            // set object
            obj = qs
        }

        logger.debug('obj', { obj })


        // no hmac what are we doing here ?
        if (!obj?.hmac) { return false }

        const hmac = obj?.hmac;

        obj = removeHmac("hmac", obj);

        let searchParams: URLSearchParams = new URLSearchParams(obj);

        let input = searchParams.toString();

        logger.debug('input', input);

        logger.debug('input', { input })
        let hash = createHmac('SHA256', secret).update(input).digest('hex');

        // validate and return
        return hash === hmac;
    } catch (error) {
        logger.error(`checkHmacValidity ${error}`);
        return false;
    }
}
