import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import index_nav from '../mock/index-nav'

// import Foo from '../components/Foo.vue'
import Home from '../view/home'
import context from '../view/dialog-badge-context'
import Registry from '../view/startup/registry'
import InvesitDetail from '../view/startup/invesit-detail'
//投资人
import Me from '../view/investors/Me.vue'
import SystemMessage from '../view/investors/SystemMessage.vue'
import Certification from '../view/investors/Certification.vue'
import BusinessCardScanning from '../view/investors/BusinessCardScanning.vue'
import BasicInformation from '../view/investors/BasicInformation.vue'
import InvestmentInformation from '../view/investors/InvestmentInformation.vue'
import InvestorsOK from '../view/investors/InvestorsOK.vue'
import InvestMessageInfo from '../view/investors/InvestMessageInfo.vue'
import MessageInfo from '../view/startup/messageInfo.vue'

import Mine from '../view/startup/mine.vue'
import Investors from '../view/startup/investors.vue'
import PSchdule from '../view/startup/project-schdule.vue'

import ProjectList from '../view/investors/ProjectList.vue'
import ProjectDetails from '../view/investors/ProjectDetails.vue'
import ProjectSchedule from '../view/investors/ProjectSchedule.vue'
import BusinessPlan from '../view/investors/BusinessPlan.vue'
import ProjectSelfCommon from '../view/investors/ProjectSelfCommon.vue'
import EditInformation from '../view/investors/EditInformation.vue'
import ReportingProgress from '../view/startup/reporting-progress.vue'
import ProjectInfo from '../view/startup/project-info.vue'

import BPInfo from '../view/startup/BP-info.vue'
import SystemInfo from '../view/startup/system-info.vue'
import AddPlan from '../view/startup/add-plan.vue'
import tip from '../view/startup/tip'//提示前往pc填资料

import itsuport from '../view/startup/it-suport'
Vue.use(VueRouter);


const routes = [
    {path: '/', redirect: '/home'},
   
    {
        path: '/itsuport', component: itsuport,
        meta: {
            noNav: true,//
            title: '技术服务',
            isNeedAuth: false
        }
    },
   
    {
        path: '/tip', component: tip,
        meta: {
            noNav: true,//
            title: '',
            isNeedAuth: false
        }
    },
   
    {
        path: '/home',
        name: 'home',
        component: Home, meta: {
        title: '首页',
        isNeedAuth: false
    }
    },
    {path: '/context', component: context},
    {
        path: '/registry/:type',
        name: 'registry',
        component: Registry,
        meta: {
            noNav: true,//
            title: '登录'
        }
    },//注册登录
    {
        path: '/invesit_detail',
        name: 'invesitDetail',
        component: InvesitDetail,
        meta: {
            noNav: true,//
            title: '投资人详情'
        }
    },
    //投资人
    {path: '/me', component: Me, meta: {noNav: false, title: '我的'}},
    {path: '/system_message', component: SystemMessage, meta: {noNav: true, title: '系统消息'}},
    {path: '/certification/:status', component: Certification, meta: {noNav: true, title: '投资人认证'}},
    {path: '/business_card_scanning', component: BusinessCardScanning, meta: {noNav: true, title: '第一步 名片扫描'}},
    {path: '/basic_information', component: BasicInformation, meta: {noNav: true, title: '第二步 基本信息'}},
    {path: '/message_info/:type', name: 'mssage_info', component: MessageInfo, meta: {title: '消息'}},
    {path: '/investment_information', component: InvestmentInformation, meta: {noNav: true, title: '第三步 投资信息'}},
    {path: '/investors_ok', component: InvestorsOK, meta: {noNav: true, title: '认证资料已提交'}},
    {path: '/mine', name: 'mine', component: Mine, meta: {title: '我的'}},
    {path: '/investors', name: 'investors', component: Investors, meta: {noNav: true, title: '投资人'}},
    {path: '/pschdule', name: 'pschdule', component: PSchdule, meta: {noNav: true, title: '项目进度'}},
    {path: '/project_list', component: ProjectList, meta: {noNav: false, title: '项目'}},
    {path: '/project_details/:id', component: ProjectDetails, meta: {noNav: true, title: '项目详情'}},
    {path: '/project_schedule/:id', component: ProjectSchedule, meta: {noNav: true, title: '项目进度'}},
    {path: '/project_schedule/:id', component: ProjectSchedule, meta: {noNav: true, title: '项目进度'}},
    {path: '/business_plan/:id', component: BusinessPlan, meta: {noNav: true, title: '商业计划书'}},
    {
        path: '/project_self_common/:common1/:common2/:common3/:common4/:common5/:common6/:common7',
        component: ProjectSelfCommon,
        meta: {noNav: true, title: '项目自评'}
    },
    {path: '/edit_information', component: EditInformation, meta: {noNav: true, title: '资料编辑'}},
    {path: '/invest_message_info', component: InvestMessageInfo, meta: {noNav: false, title: '消息'}},
    {
        path: '/reporting',
        name: 'reporting',
        component: ReportingProgress,
        meta: {
            noNav: true,//
            title: '申报进度'
        }
    },
    {
        path: '/project_info/:id',
        name: 'ProjectInfo',
        component: ProjectInfo,
        meta: {
            noNav: true,//
            title: '项目信息'
        }
    },
    {
        path: '/bp_info',
        name: 'BPInfo',
        component: BPInfo,
        meta: {
            noNav: true,//
            title: 'BP资料'
        }
    },
    {
        path: '/system_info',
        name: 'SystemInfo',
        component: SystemInfo,
        meta: {
            noNav: true,//
            title: '系统消息'
        }
    },
    {
        path: '/add_plan',
        name: 'AddPlan',
        component: AddPlan,
        meta: {
            noNav: true,//
            title: '添加新进度'
        }
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes // （缩写）相当于 routes: routes
})
let isLogon = true;
router.beforeEach((to, from, next) => {
    let noNav = to.meta.noNav ? false : true
    let title = to.meta.title
    next();
})

export default router