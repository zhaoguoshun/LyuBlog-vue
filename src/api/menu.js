const data=[

    {
        id: '1',
        name: '功能名称',
        icon: 'el-icon-s-home',
        children:[
            {
                name: '用户管理',
                icon: 'el-icon-user',
                router: '/user'
            },
            {
                name: '栏目管理',
                icon: 'el-icon-s-order',
                router: '/channel'
            }
            ,{
                name: '标签管理',
                icon: 'el-icon-price-tag',
                router: '/tag'
            },
            {
                name: '文章管理',
                icon: 'el-icon-notebook-2',
                router: '/article'
            },
            {
                name: '评论管理',
                icon: 'el-icon-s-comment',
                router: '/comment'
            },
            {
                name: '友情链接',
                icon: 'el-icon-paperclip',
                router: '/friend'
            }
        ]
    }

]

export default  data