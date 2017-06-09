import Vue from 'vue'
import Router from 'vue-router'

import Acquisition from '@/components/acquisition'
import Communication from '@/components/communication'

Vue.use(Router)


export default new Router({
  routes: [
  	{path: '*', redirect: '/communication'},
    {
      path: '/communication',
      name: 'Communication',
      component: Communication
    },
    {
      path: '/acquisition',
      name: 'Acquisition',
      component: Acquisition
    }
  ]
})
