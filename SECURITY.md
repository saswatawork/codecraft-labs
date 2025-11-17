# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CodeCraft Labs seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue
- Disclose the vulnerability publicly before it has been addressed

### Please Do:

1. **Email us directly** at: security@yourdomain.com (or saswata.career@gmail.com)
2. **Include the following information**:
   - Type of issue (e.g., XSS, CSRF, SQL injection, etc.)
   - Full paths of source file(s) related to the issue
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

### What to Expect:

- **Acknowledgment**: We'll acknowledge your email within 48 hours
- **Assessment**: We'll investigate and assess the issue within 7 days
- **Updates**: We'll keep you informed of our progress
- **Fix**: We'll work on a fix and release a patch as soon as possible
- **Credit**: We'll credit you in our security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using CodeCraft Labs, we recommend:

### For Application Developers:

1. **Keep dependencies updated**: Regularly update to the latest versions
2. **Environment variables**: Never commit `.env` files or expose secrets
3. **Authentication**: Use secure authentication methods (OAuth 2.0, NextAuth.js)
4. **Input validation**: Always validate and sanitize user input
5. **HTTPS**: Use HTTPS in production environments
6. **Security headers**: Configure proper security headers (see `security-headers.config.js`)
7. **Rate limiting**: Implement rate limiting for APIs
8. **CORS**: Configure CORS policies appropriately

### For Contributors:

1. **Code review**: All PRs require security review
2. **Dependencies**: Audit new dependencies with `pnpm audit`
3. **No secrets**: Never commit API keys, passwords, or tokens
4. **Sanitization**: Sanitize all user inputs
5. **XSS protection**: Use proper escaping in templates
6. **SQL injection**: Use parameterized queries (Prisma handles this)

## Security Features

CodeCraft Labs includes several security features:

### Built-in Protections:

- **Security Headers**: Pre-configured security headers in Next.js config
- **CSRF Protection**: Built into Next.js API routes
- **XSS Protection**: React's automatic escaping
- **Content Security Policy**: Configurable CSP headers
- **Rate Limiting**: Can be enabled via middleware

### Recommended Integrations:

- **NextAuth.js**: Secure authentication
- **Prisma**: SQL injection prevention
- **Helmet.js**: Additional security headers
- **Rate Limiter**: API rate limiting
- **CAPTCHA**: Bot protection for forms

## Known Issues

We maintain a list of known security issues and their status:

### Currently None

Please check our [Security Advisories](https://github.com/saswatawork/codecraft-labs/security/advisories) for updates.

## Security Updates

- Security patches are released as soon as possible
- We follow semantic versioning for security updates
- Critical vulnerabilities receive immediate attention
- Security advisories are published on GitHub

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [React Security Best Practices](https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Contact

For security concerns, contact:
- Email: security@yourdomain.com
- GitHub Security Advisories: [Report a vulnerability](https://github.com/saswatawork/codecraft-labs/security/advisories/new)

Thank you for helping keep CodeCraft Labs and our users safe!
