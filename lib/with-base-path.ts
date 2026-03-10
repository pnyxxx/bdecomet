const GH_PAGES_BASE_PATH = "/bdecomet"

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    return path
  }

  if (path.startsWith(`${GH_PAGES_BASE_PATH}/`) || path === GH_PAGES_BASE_PATH) {
    return path
  }

  return process.env.NODE_ENV === "production"
    ? `${GH_PAGES_BASE_PATH}${path}`
    : path
}
