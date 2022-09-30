import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
const { json, simple, colorize } = format;
const logger = createLogger({
	level: "debug",
	format: format.combine(
		format.colorize(),
		format.simple(),
	),

	transports: [
		//
		// - Write all logs with level `error` and below to `error.log`
		// - Write all logs with level `info` and below to `combined.log`
		//
		new transports.Console({}),
		// new transports.DailyRotateFile({
		// 	filename: "log-%DATE%.log",
		// 	datePattern: "YYYY-MM-DD-HH",
		// 	zippedArchive: true,
		// 	maxSize: "20m",
		// 	maxFiles: "14d",
		// } as DailyRotateFileTransportOptions),
		// new transports.File({ filename: "combined.log" }),
	],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
// 	logger.add(
// 		new transports.Console({
// 			format: simple(),
// 		})
// 	);
// }

export default logger;
