const CONTACT_ENDPOINT = 'https://hook.eu2.make.com/621j5jmsirf9uvp310cqqsqukmwqbn5h';

export async function sendContactMessage(form, fetchRequest = fetch) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetchRequest(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
            signal: controller.signal,
        });
        if (!response.ok) {
            throw new Error('The contact service could not accept the message.');
        }
    } finally {
        clearTimeout(timeout);
    }
}
