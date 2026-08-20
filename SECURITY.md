# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in Serendipity Maps, please report it responsibly.

**Do not** open a public issue.

Instead, contact the maintainer directly through [GitHub Security Advisories](https://github.com/modarresi1913/serendipity-maps/security/advisories/new).

## Our Security Commitments

Serendipity Maps is a privacy-first platform. Security is not a feature — it is the architecture.

### Data Handling

- All behavioral fingerprinting happens **on-device**
- No raw location data is transmitted to any server
- Only differentially-private, noisy signals leave the device
- No persistent user profiles are stored server-side

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| Location tracking | On-device processing, no raw data transmission |
| Profile scraping | No public profiles exist |
| Man-in-the-middle | All API communication over HTTPS |
| De-anonymization | Differential privacy with controlled epsilon |
| Unauthorized proximity detection | Ghost mode, invisible zones |
| Server breach | No sensitive data stored server-side |

### Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x | Yes |

## Acknowledgments

We welcome responsible disclosure and will credit researchers who help improve Serendipity Maps' security.
