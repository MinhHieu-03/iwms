export const domain = {
  warehouse: {
    get_all: '/warehouse',
    create: '/warehouse',
    update: '/warehouse',
  },
  inbound: {
    get_all: '/inbound',
    list: '/inbound/list',
    create: '/inbound',
    update: '/inbound',
    delete: '/inbound',
  },
  order: {
    get_all: '/orders',
    list: '/orders/list',
    create: '/orders',
    update: '/orders',
    delete: '/orders',
  },
  areaconfig: {
    get_all: '/areaconfig',
    create: '/areaconfig',
    update: '/areaconfig',
  },
  master_data: {
    get_all: '/master-data',
    list: '/master-data/list',
    create: '/master-data',
    update: '/master-data',
    delete: '/master-data',
    upload: '/master-data/import',
    download: '/master-data/file/download',
  },
  rack_config: {
    list: "/area/list",
    get_all: "/area",
    create: "/area",
    update: "/area",
    delete: "/area",
  },
  mission_history: {
    API_GET_LIST_ALL: "/mission_history",
    API_GET_LIST: "/mission_history/list",
    API_DOWNLOAD: "/mission_history/download",
  },
  user: {
    API_LOGIN: "/auth/login",
  },
  account: {
    manager_account: {
      API: "/auth",
      API_GET_LIST_ALL: "auth/list",
      API_SIGN_UP: "/auth/signup",
      API_UPDATE: "/auth/account",
      API_UPDATE_PW: "/auth/account/change_password",
    },
  },
  callboxes: {
    API_GET_LIST_ALL: "/call_boxes",
    API_GET_LIST: "/call_boxes/list",
    API_ADD: "/call_boxes",
    API_UPDATE: "/call_boxes/",
    API_DELETE: "/call_boxes/",
  },
  settings_system: {
    API_GET: "/system",
    API_UPDATE: "/system",
  },
  role: {
    API: "/role",
  },
  menus: {
    API: "/menus",
  },
  system: {
    API: "/system",
  },
  products: {
    API: "/products",
  },
  ware_house: {
    API_GET_AREA: "/area",
    API_POST_AREA: "/area",
    API_DELETE_AREA: "/area",
    API_UPDATE_AREA: "/area",
  },
  location: {
    API_GET_LOCATION_ALL: "/location",
    API_GET_LOCATION: "/location/list",
    API_UPDATE_LOCATION: "/location",
  },
  sector: {
    API_GET_SECTOR: "/sectors",
  },
};
