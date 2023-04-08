import { getArguments } from '@lib/args';
import { loadEnv } from '@lib/env';
import { findTextInPage } from '@lib/find';

const { url, text, caseInsensitive, message, phone, email, subject } =
    getArguments();

loadEnv({
    twilioRequired: Boolean(phone),
    emailRequired: Boolean(email),
});

const result = await findTextInPage({
    url,
    text,
    caseInsensitive,
});

if (result) {
    if (phone) {
        const { sendSms } = await import('./lib/sms');

        sendSms({
            to: phone,
            body: message,
        });
    }

    if (email) {
        const { sendMail } = await import('./lib/mail');

        sendMail({
            fromEmail: 'hello@adamhammer.xyz',
            fromName: 'Adam',
            subject: subject ?? message,
            to: email,
            html: `<h1>${message}</h1>`,
        });
    }
}
