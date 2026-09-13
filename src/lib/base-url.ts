const baseUrl = import.meta.env.BASE_URL || '/';

export const withBase = (path = '') => {
    if (!path || path === '/') {
        return baseUrl;
    }

    if (/^(https?:|mailto:|tel:|#)/.test(path)) {
        return path;
    }

    if (baseUrl !== '/' && path.startsWith(baseUrl)) {
        return path;
    }

    if (path.startsWith('/')) {
        return `${baseUrl}${path.slice(1)}`;
    }

    return `${baseUrl}${path}`;
};