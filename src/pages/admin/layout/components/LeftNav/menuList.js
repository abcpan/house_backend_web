export const menuList = [
    {
      title:"首页",
      key:"/admin/home"
    },
    {
      title:"个人信息",
      key:"/admin/info"
    },
    {
      title:"我的房产",
      key:"/admin/house",
      children:[
          {
            title:"添加房产",
            key:"/admin/house/add"
          },
          {
            title:"房产列表",
            key:"/admin/house/list"
          },
          {
            title:"房产详情",
            key:"/admin/house/detail"
          },
          {
            title:"房产分析",
            key:"/admin/house/analyse"
          }
      ]
    }
    
]