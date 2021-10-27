import VueRouter from 'vue-router'

// 2021-04-11 写Elisabirthday组件时暂时失效
import index from './components/index.vue'
import discussArea from './components/discussArea.vue'
import resource from './components/resource.vue'
import blogEdit from './components/blogEdit.vue'
import personalCenter from './components/personalCenter.vue'
import article from './components/indexSub/article.vue'
import loginRegister from './components/loginRegister.vue'
import articleDetails from './components/articleDetails.vue'
// import admin from './components/admin.vue'
import elisaBirthday from './components/elisaBirthday.vue'


var router = new VueRouter({
    routes:[
        // 首页  讨论区  资源  写博客  个人中心
        {
            path:'/', 
            component:index,
            children:[
                { path:'/', component:article}
            ],
        },
        //2021-04-11,彤彤生日，
        {
            path:'/secretGarden', 
            component:elisaBirthday,
        },
        {
            path:'/discussArea',
            component:discussArea,
        },
        {
            path:'/resource',
            component:resource,
        },
        {
            path:'/blogEdit',
            component:blogEdit,
            meta:{
                requireLogin: true,
            }
        },
        {
            path:'/blogEdit/:id',
            component:blogEdit,
            meta:{
                requireLogin: true,
            }
        },
        {
            path:'/personalCenter',
            component:personalCenter,
            meta:{
                requireLogin: true,
            }
        },
        {
            path:'/loginRegister',
            component:loginRegister,
        },
        {
            path:'/articleDetails/:id',
            component: articleDetails,
        }
    ]
})

export default router