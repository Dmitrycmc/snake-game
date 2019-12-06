const buildUrl = (url, params = {}) =>
    Object.entries(params).reduce((url, [param, value]) => {
        url.searchParams.set(param, value);
        return url;
    }, new URL(url));

const requestBuilder = (url, params = {}, method = 'GET', onSuccess, onFailure) => {
    fetch(buildUrl(url, params), { method })
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure);
};

export default requestBuilder;
