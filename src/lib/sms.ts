import twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_ID,
    process.env.TWILIO_AUTH_TOKEN
);

interface SendSmsOptions {
    to: string;
    body: string;
}

export async function sendSms({ to, body }: SendSmsOptions) {
    return client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
    });
}
