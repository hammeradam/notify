import { getArguments } from './lib/args.js';
import { loadEnv } from './lib/env.js';
import { findTextInPage } from './lib/find.js';

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
        const { sendSms } = await import('./lib/sms.js');

        sendSms({
            to: phone,
            body: message,
        });
    }

    if (email) {
        const { sendMail } = await import('./lib/mail.js');

        sendMail({
            fromEmail: 'hello@adamhammer.xyz',
            fromName: 'Adam',
            subject: subject ?? message,
            to: email,
            html: `<h1>${message}</h1>`,
        });
    }
}
