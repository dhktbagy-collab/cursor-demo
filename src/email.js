function extractEmails(members) {
    if (!Array.isArray(members)) {
        return [];
    }
    return members.map(member => member?.email);
}

// RFC 5322 canonical-form email regex (comments/folding whitespace excluded).
// Sources:
// - https://emailregex.com/ (General Email Regex — RFC 5322 Official Standard)
// - https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
// - https://stackoverflow.com/questions/13992403/regex-validation-of-email-addresses-according-to-rfc5321-rfc5322
const RFC5322_EMAIL_REGEX =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (!trimmed) return false;
    return RFC5322_EMAIL_REGEX.test(trimmed);
}

function getValidEmails(members) {
    return extractEmails(members)
        .filter(isValidEmail)
        .map(email => email.trim());
}

/**
 * 멤버 목록에서 유효한 이메일만 추출하고 중복을 제거한다.
 * @param {Array<{ email?: string }>} members - 이메일을 포함한 멤버 객체 배열
 * @returns {string[]} 중복이 제거된 유효 이메일 배열 (최초 등장 순서 유지)
 */
function getUniqueValidEmails(members) {
    const seen = new Set();

    return getValidEmails(members).filter((email) => {
        const key = email.toLowerCase();
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

module.exports = { extractEmails, isValidEmail, getValidEmails, getUniqueValidEmails };
