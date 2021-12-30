const jwt = require('jsonwebtoken')

const serviceAccount = {
    "type": "service_account",
    "project_id": "your-project-id",
    "private_key_id": "your-private-key-id",
    "private_key": "your-private-key",
    "client_email": "your-client-email",
    "client_id": "your-client-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "your-cert-url"
}

const createExpire = (days = 365) => {
    return parseInt(Date.now() / 1000) + 60 * 60 * 24 * days
}

const createJwt = () => {
    return jwt.sign(
        {
            'iss': 'https://accounts.google.com',
            'sub': serviceAccount.client_id,
            'aud': serviceAccount.client_email,
            'azp': serviceAccount.client_email,
            'iat': parseInt(Date.now() / 1000),
            'exp': createExpire()
        },
        serviceAccount.private_key,
        {
            algorithm: 'RS256',
            header: {
                'kid': serviceAccount.private_key_id,
                'typ': 'JWT',
                'alg': 'RS256',
            }
        }
    );
};

const token = createJwt();
console.log(token)