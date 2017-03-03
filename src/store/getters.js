// 

export const indexNav = ({ base }) => base.index_nav ? base.index_nav : []

export const indexData = ({ home }) => home.index_data ? home.index_data : {}

export const  message = ({home}) => home.obj.message 

export const todo = ({home}) => home.obj.todo

export const isNeedNav = ({home}) => home.isNeedNav

export const conditionDate = ({home}) => home.conditionDate

export const userInfo = ({base}) => base.userInfo

//投资人列表
export const startUpList = ({home}) => home.startUpList
//登录方式  1投资人 2 创业者
export const type = ({base}) => base.type

export const path = ({route}) => route.fullPath