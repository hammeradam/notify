import { parseArgs } from 'node:util';

interface Option {
    type: 'string' | 'boolean';
    short: string;
    description: string;
    default?: string | boolean | string[] | boolean[];
}

const options: Record<string, Option> = {
    message: {
        type: 'string',
        short: 'm',
        description: 'message to be sent',
    },
    phone: {
        type: 'string',
        short: 'p',
        description: 'phone number to notify',
    },
    email: {
        type: 'string',
        short: 'e',
        description: 'email address to notify',
    },
    subject: {
        type: 'string',
        short: 's',
        description: 'subject of the email being sent',
    },
    url: {
        type: 'string',
        short: 'u',
        description: 'url to check',
    },
    text: {
        type: 'string',
        short: 't',
        description: 'text to look for',
    },
    caseInsensitive: {
        type: 'boolean',
        short: 'i',
        default: true,
        description:
            'whether the search for the given text should be case sensitive',
    },
};

function getArgumentHelp() {
    return Object.entries(options)
        .map(
            ([key, value]) =>
                `--${key}, -${value.short}: ${value.description}${
                    value.default !== undefined
                        ? `, default: ${value.default}`
                        : ''
                }`
        )
        .join('\n');
}

export function getArguments() {
    const {
        values: { message, phone, email, url, text, subject, caseInsensitive },
    } = parseArgs({
        options,
    });

    if (!url || !text || !message || (!email && !phone)) {
        throw new Error(
            `
Invalid arguments!

${getArgumentHelp()}
`
        );
    }

    return {
        message,
        phone,
        email,
        url,
        text,
        subject,
        caseInsensitive,
    };
}
