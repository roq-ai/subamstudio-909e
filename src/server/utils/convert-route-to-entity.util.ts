const mapping: Record<string, string> = {
  assignments: 'assignment',
  media: 'media',
  renamedpackages: 'Renamedpackage',
  projects: 'project',
  studios: 'studio',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
