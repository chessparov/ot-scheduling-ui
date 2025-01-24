export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  display: boolean
  children?: INavigationRoute[]
  requiresAdminPrivileges: boolean
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
      display: true,
      requiresAdminPrivileges: false,
    },
    {
      name: 'history',
      displayName: 'Archivio',
      meta: {
        icon: 'folder_shared',
      },
      display: true,
      requiresAdminPrivileges: false,
    },
    {
      name: 'schedule',
      displayName: 'Nuova schedula',
      meta: {
        icon: 'group',
      },
      display: true,
      requiresAdminPrivileges: true
    },
    {
      name: 'upload',
      displayName: 'Analizza schedula',
      meta: {
        icon: 'speed',
      },
      display: true,
      requiresAdminPrivileges: true
    },
    {
      name: 'cleaner',
      displayName: 'Filtra lista',
      meta: {
        icon: 'upload',
      },
      display: true,
      requiresAdminPrivileges: true
    },
    {
      name: 'settings',
      displayName: 'Impostazioni',
      meta: {},
      display: false,
      requiresAdminPrivileges: true,
    },
    {
      name: 'profile',
      displayName: 'Profilo',
      meta: {},
      display: false,
      requiresAdminPrivileges: false,
    }
  ] as INavigationRoute[],
}
