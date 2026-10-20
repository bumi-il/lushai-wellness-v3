import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContactMessage } from '../src/utils/contactSubmission.js';

const message = { firstName: 'Test', lastName: 'Guest', email: 'guest@example.com', subject: '', message: 'A treatment question.' };

test('posts the five existing fields as JSON to the existing Make integration', async () => {
    await sendContactMessage(message, async (url, options) => {
        assert.equal(url, 'https://hook.eu2.make.com/621j5jmsirf9uvp310cqqsqukmwqbn5h');
        assert.equal(options.method, 'POST');
        assert.equal(options.headers['Content-Type'], 'application/json');
        assert.deepEqual(JSON.parse(options.body), message);
        assert.equal(options.signal.aborted, false);
        return { ok: true, status: 200 };
    });
});

test('accepts a successful 202 response from the asynchronous webhook', async () => {
    await assert.doesNotReject(sendContactMessage(message, async () => ({ ok: true, status: 202 })));
});

test('rejects unsuccessful responses and allows a subsequent retry', async () => {
    await assert.rejects(sendContactMessage(message, async () => ({ ok: false, status: 500 })), /could not accept/);
    await assert.doesNotReject(sendContactMessage(message, async () => ({ ok: true, status: 200 })));
});

test('propagates network failures', async () => {
    const failure = new TypeError('Failed to fetch');
    await assert.rejects(sendContactMessage(message, async () => { throw failure; }), failure);
});

test('aborts a stalled request after 15 seconds', async (context) => {
    context.mock.timers.enable({ apis: ['setTimeout'] });
    let signal;
    const pending = sendContactMessage(message, async (_url, options) => {
        signal = options.signal;
        return new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => reject(new DOMException('Timed out', 'AbortError')), { once: true });
        });
    });
    const rejected = assert.rejects(pending, { name: 'AbortError' });
    context.mock.timers.tick(14999);
    assert.equal(signal.aborted, false);
    context.mock.timers.tick(1);
    await rejected;
    assert.equal(signal.aborted, true);
});
