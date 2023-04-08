import * as dotenv from 'dotenv';

interface LoadEnvOptions {
    twilioRequired: boolean;
    emailRequired: boolean;
}

function validateEnv({ twilioRequired, emailRequired }: LoadEnvOptions) {
    if (
        twilioRequired &&
        (!process.env.TWILIO_AUTH_TOKEN ||
            !process.env.TWILIO_ACCOUNT_ID ||
            !process.env.TWILIO_PHONE_NUMBER)
    ) {
        throw new Error('Missing environment variable for twilio!');
    }

    if (
        emailRequired &&
        (!process.env.EMAIL_USERNAME ||
            !process.env.EMAIL_PASSWORD ||
            !process.env.EMAIL_HOST ||
            !process.env.EMAIL_PORT)
    ) {
        throw new Error('Missing environment variable for email sending!');
    }
}

export function loadEnv(options: LoadEnvOptions) {
    dotenv.config();

    validateEnv(options);
}
