export interface Istate {
  userId?: string
  token?: string
  tenantId?: string
  username?: string
  user?: Record<string, any>

  meta?: {
    [key: string]: string
  }

  permission: {
    menuList?: any[]
    menuReady?: boolean
    spaName?: string
    spaIcon?: string
    centerId?: string
  }

  setting: {
    collapse?: boolean // 是否收缩侧边栏
  }
}

export interface mapObj {
  [key: string]: any
}
