// @ts-check
const fs = require('fs');
const path = require('path');
const envTemplate = `FRONT_END_PROJECT_NAME = Win10-in-Vue
SERVER_DEV_ROOT = http://localhost
NODE_ENV = development
PUBLIC_ROOT = public
PORT = 3000
PREFIX = api/v1
DB = mongodb://localhost/win-db
JWT_KEY = jwt
JWT_SECRET = ultra_secure_secrpt_key_for_me
JWT_EXPIRED_IN = 90d
JWT_COOKIE_EXPIRED_IN = 90d 
`;

fs.writeFileSync(path.join(__dirname, '../env'), envTemplate);
