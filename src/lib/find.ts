interface FindTextInPageOptions {
    url: string;
    text: string;
    caseInsensitive?: boolean;
}

export async function findTextInPage({
    url,
    text,
    caseInsensitive,
}: FindTextInPageOptions) {
    const response = await fetch(url);
    const page = await response.text();
    const regex = new RegExp(text, caseInsensitive ? 'i' : undefined);

    return page.match(regex);
}
