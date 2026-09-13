const baseUrl = import.meta.env.BASE_URL || '/';
const normalizedBaseUrl = baseUrl === '/' ? '/' : `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}`;

export const withBase = (path = '') => {
    if (!path || path === '/') {
        return normalizedBaseUrl;
    }

    if (/^(https?:|mailto:|tel:|#)/.test(path)) {
        return path;
    }

    if (normalizedBaseUrl !== '/' && path.startsWith(normalizedBaseUrl)) {
        return path;
    }

    if (path.startsWith('/')) {
        return `${normalizedBaseUrl}${path.slice(1)}`;
    }

    return `${normalizedBaseUrl}${path}`;
};