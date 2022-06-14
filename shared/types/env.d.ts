// Type definitions for the .env file
namespace NodeJS {
    interface ProcessEnv {
        // General
        ENVIRONMENT: 'DEV' | 'PROD';
        // SERVER_PORT: number;
        // SITE_URL: string

        // Database
        DB_HOST: string
        DB_PORT: string
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_NAME: string

        // Secrets
        ACCESS_TOKEN_SECRET: string
        REFRESH_TOKEN_SECRET: string
        REFRESH_TOKEN_NAME: string
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.