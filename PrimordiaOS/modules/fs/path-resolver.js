import path from "path";
export function resolvePrimordiaPath(relative) {
    return path.resolve(process.cwd(), relative);
}
