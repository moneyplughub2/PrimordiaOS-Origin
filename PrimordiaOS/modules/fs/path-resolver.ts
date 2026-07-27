import path from "path";

export function resolvePrimordiaPath(relative: string) {
  return path.resolve(process.cwd(), relative);
}
