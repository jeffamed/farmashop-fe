export const useRouteApiRef = (route: string): string => {
  const path = import.meta.env.VITE_PATH_API_VERSION
  return `${path}/${route}`
}
