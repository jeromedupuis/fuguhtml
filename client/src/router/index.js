import Vue from 'vue';
import Router from 'vue-router';
import _ from 'lodash';

Vue.use(Router);

import PageIndex from '@/components/pages/index/Index';
import PageServices from '@/components/pages/services/Services';
import PageSamples from '@/components/pages/samples/Samples';
import PageAbout from '@/components/pages/about/About';
import PageOrderNow from '@/components/pages/ordernow/OrderNow';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/services',
      name: 'PageServices',
      component: PageServices
    },
    {
      path: '/about',
      name: 'PageAbout',
      component: PageAbout
    },
    {
      path: '/samples',
      name: 'PageSamples',
      component: PageSamples
    },
    {
      path: '/order-now',
      name: 'PageOrderNow',
      component: PageOrderNow
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 0 }
      };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach(async (to, from, next) => {

  /*
   * set websiteArea
   */

  await Vue.$store.dispatch('setWebsiteArea');



  let nextParams = true;
  if(to.meta) {

    nextParams = false;

    if(to.matched.some(record => record.meta.requiresAuth)) {

      if(localStorage.getItem('jwt') == null) {
        if(to.matched.some(record => record.meta.isAdmin)) {
          nextParams = {
            path: '/admin/login',
            params: { nextUrl: to.fullPath }
          };
        }
        else if(to.matched.some(record => record.meta.isFreelancer)) {
          nextParams = {
            path: '/freelancer-area/login',
            params: { nextUrl: to.fullPath }
          };
        }
        else if(to.matched.some(record => record.meta.isClient)) {
          nextParams = {
            path: '/client-area/login',
            params: { nextUrl: to.fullPath }
          };
        }
      } else {

        let user = await Vue.$api.get('/me').catch(() => {
          nextParams = {
            path: '/logout'
          };
          next(nextParams);
        });
        
        if(user) {
          Vue.$store.dispatch('setMe', user);

          if(to.matched.some(record => record.meta.isAdmin)) {
            if(user.isAdmin == 1){
              nextParams = true;
            }
            else{
              nextParams = {
                path: '/'
              };
            }
          } else if(to.matched.some(record => record.meta.isFreelancer)) {
            if(user.isFreelancer == 1){
              nextParams = true;
            }
            else{
              nextParams = {
                path: '/'
              };
            }
          }  else if(to.matched.some(record => record.meta.isClient)) {
            if(user.isClient == 1){
              nextParams = true;
            }
            else{
              nextParams = {
                path: '/'
              };
            }
          } else {
            nextParams = true;
          }
        } else {
          nextParams = {
            path: '/logout'
          };
        }
      }
    }
    else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
        nextParams = true;
      }
      else{
        nextParams = {
          path: '/client-area'
        };
      }
    }
    else {
      nextParams = true;
    }
  } else {
    nextParams = true;
  }

  if(nextParams === true) {
    if(to.meta.beforeEnter) {
      to.meta.beforeEnter(to, from, next);
    }
    else {
      next();
    }
  }
  else if(_.isObject(nextParams)) {
    next(nextParams);
  }
});


export default router;
