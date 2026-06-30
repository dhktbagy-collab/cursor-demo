const { test } = require('node:test');
const assert = require('node:assert/strict');
const { extractEmails, isValidEmail, getValidEmails, getUniqueValidEmails } = require('./email');

test('extractEmails returns emails from members', () => {
    const members = [{ email: 'a@b.com' }, { email: 'c@d.com' }];
    assert.deepEqual(extractEmails(members), ['a@b.com', 'c@d.com']);
});

test('extractEmails returns empty array for non-array input', () => {
    assert.deepEqual(extractEmails(null), []);
    assert.deepEqual(extractEmails('not-array'), []);
});

test('isValidEmail validates email format', () => {
    assert.equal(isValidEmail('user@example.com'), true);
    assert.equal(isValidEmail('user+tag@example.com'), true);
    assert.equal(isValidEmail('"user..name"@example.com'), true);
    assert.equal(isValidEmail('invalid'), false);
    assert.equal(isValidEmail(''), false);
    assert.equal(isValidEmail(null), false);
});

test('getValidEmails returns only valid emails', () => {
    const members = [
        { email: 'good@example.com' },
        { email: 'bad-email' },
        { email: 'also@valid.org' },
    ];
    assert.deepEqual(getValidEmails(members), ['good@example.com', 'also@valid.org']);
});

test('getValidEmails returns empty array for non-array input', () => {
    assert.deepEqual(getValidEmails(undefined), []);
});

test('getUniqueValidEmails removes duplicate valid emails', () => {
    const members = [
        { email: 'user@example.com' },
        { email: 'USER@example.com' },
        { email: 'other@valid.org' },
        { email: 'user@example.com' },
        { email: 'invalid' },
    ];
    assert.deepEqual(getUniqueValidEmails(members), [
        'user@example.com',
        'other@valid.org',
    ]);
});

test('getUniqueValidEmails returns empty array for non-array input', () => {
    assert.deepEqual(getUniqueValidEmails(null), []);
});
