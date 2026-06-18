function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable ${key} is not set in .env file`);
    }
    return value;
}

export const qaInterviewUser = {
    login: getEnvVar('LOGIN'),
    password: getEnvVar('PASSWORD'),
}

export const serverTimeZone = getEnvVar('SERVER_TIMEZONE');
