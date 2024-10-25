export interface INavigationRoute {
  name: string;
  displayName: string;
  meta: { icon: string };
  display: boolean;
  children?: INavigationRoute[];
}

export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    {
      name: "dashboard",
      displayName: "Dashboard",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
      display: true,
    },
    {
      name: "history",
      displayName: "Archivio",
      meta: {
        icon: "folder_shared",
      },
      display: true,
    },
    {
      name: "schedule",
      displayName: "Nuova Schedula",
      meta: {
        icon: "group",
      },
      display: true,
    },
    {
      name: "upload",
      displayName: "Carica Schedula",
      meta: {
        icon: "upload",
      },
      display: true,
    },
    {
      name: "settings",
      displayName: "Impostazioni",
      meta: {},
      display: false,
    },
    {
      name: "profile",
      displayName: "Profilo",
      meta: {},
      display: false,
    },
  ] as INavigationRoute[],
};
