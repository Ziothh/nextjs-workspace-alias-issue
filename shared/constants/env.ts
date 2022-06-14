export const ENVIRONMENT = process.env.ENVIRONMENT
export const isDev = ENVIRONMENT === "DEV"
export const isProd = ENVIRONMENT === "PROD"
// export const isTest = ENVIRONMENT === "TEST" // not yet implemented