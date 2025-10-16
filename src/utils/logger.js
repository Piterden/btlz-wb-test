import log4js from "log4js";

log4js.configure({
    appenders: {
        everything: { type: "stdout" },
        file_log: { type: "file", filename: "logs/all.log" },
        logLevelFilter: {
            type: "logLevelFilter",
            level: "debug",
            appender: "file_log",
        },
    },
    categories: {
        default: {
            appenders: ["logLevelFilter", "everything"],
            level: "all",
        },
    },
});

export const APP = log4js.getLogger("APP");
export const WB = log4js.getLogger("WB");
export const DB = log4js.getLogger("DB");
export const GOOGLE = log4js.getLogger("GOOGLE");
export const CLI = log4js.getLogger("CLI");
