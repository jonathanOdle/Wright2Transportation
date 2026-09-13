const baseUrl = import.meta.env.BASE_URL || '/';
const normalizedBaseUrl = baseUrl === '/' ? '/' : `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}`;

export const normalizePath = (path = '') => {
    if (!path || path === '/') {
        return '/';
    }

    let normalizedPath = path;
    if (normalizedBaseUrl !== '/' && normalizedPath.startsWith(normalizedBaseUrl)) {
        normalizedPath = normalizedPath.slice(normalizedBaseUrl.length - 1);
    }

    if (!normalizedPath.startsWith('/')) {
        normalizedPath = `/${normalizedPath}`;
    }

    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }

    return normalizedPath;
};

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