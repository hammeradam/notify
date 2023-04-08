declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TWILIO_AUTH_TOKEN: string;
            TWILIO_ACCOUNT_ID: string;
            TWILIO_PHONE_NUMBER: string;
            EMAIL_USERNAME: string;
            EMAIL_PASSWORD: string;
            EMAIL_HOST: string;
            EMAIL_PORT: string;
        }
    }
}

export {};
