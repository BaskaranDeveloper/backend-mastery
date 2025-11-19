function createRouteRegex(path) {
    const paramNames = [];
    const escaped = path.replace(/\//g, "\\/");
    const regexString = escaped.replace(/:([^\/]+)/g, (_, pn) => {
        paramNames.push(pn);
        return "([^\\/]+)";
    });
    const regex = new RegExp(`^${regexString}$`);
    return { regex, paramNames };
}

function asyncHandler(fn) {
    return (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { createRouteRegex, asyncHandler };
