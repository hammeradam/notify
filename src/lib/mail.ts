import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

interface SendMailBaseOptions {
    fromName: string;
    fromEmail: string;
    to: string[] | string;
    subject: string;
}

interface SendMailTextOptions extends SendMailBaseOptions {
    text: string;
    html?: never;
}

interface SendMailHtmlOptions extends SendMailBaseOptions {
    html: string;
    text?: never;
}

export async function sendMail({
    fromName,
    fromEmail,
    to,
    subject,
    text,
    html,
}: SendMailTextOptions | SendMailHtmlOptions) {
    return transport.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: typeof to === 'string' ? to : to.join(', '),
        subject,
        text,
        html,
    });
}
