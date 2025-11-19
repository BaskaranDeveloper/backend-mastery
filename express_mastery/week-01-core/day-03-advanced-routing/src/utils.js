function createRouteRegex(path) {

    const paramNames = [];

    const regexString = path.replace(/:([^/]+)/g, (full, paramName) => {
        paramNames.push(paramName);
        return "([^/]+)";
    });

    // IMPORTANT: Add $ to match the entire URL path
    const regex = new RegExp(`^${regexString}$`);

    return { regex, paramNames };
}

module.exports = { createRouteRegex };
