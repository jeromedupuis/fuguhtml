<template>
  <div class="layout-clientArea_sidebar">

    <ul class="layout-clientArea_sidebarNav">
      <li v-for="(link, index) in links" :key="index" :class="[getLinkClass(link)]">
        <template v-if="link.sublinks && link.sublinks.length">
          <a class="layout-clientArea_sidebarNav_secondNavTrigger" :class="link.class" @click.stop="expandLink">
            <template v-if="link.icon">
              <img :src="link.icon" alt="" />
            </template>
            <span>{{ link.label }}</span>
          </a>
          <ul class="layout-clientArea_sidebarNav_secondNav">
              <li v-for="(sublink, subindex) in link.sublinks" :key="subindex">
                  <router-link v-if="sublink.to" :to="sublink.to">
                    <template v-if="sublink.icon">
                      <img :src="sublink.icon" alt="" />
                    </template>
                    <span>{{ sublink.label }}</span>
                  </router-link>
              </li>
          </ul>
        </template>
        <template v-else>
          <router-link v-if="link.to" :to="link.to" :class="link.class">
            <template v-if="link.icon">
              <img :src="link.icon" alt="" />
            </template>
            <span>{{ link.label }}</span>
          </router-link>
        </template>
      </li>

    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      links: [
        {
          label: 'Users',
          icon: '/static/img/svg/010-creative.svg',
          expanded: true,
          sublinks: [
            {
              label: 'Users List',
              to: '/admin/module/users',
              icon: '/static/img/svg/010-creative.svg',
            },
            {
              label: 'Create',
              to: '/admin/module/users/create',
              icon: '/static/img/svg/010-creative.svg',
            }
          ]
        }
      ]
    };
  },
  methods: {
    getLink(to) {
      return this.links.find((x) => {
        return x.to === to;
      });
    },
    getLinkClass(link) {
      if(!link.sublinks || !link.sublinks.length) {
        return null;
      }
      if(link.expanded) {
        return 'state--expanded';
      }
      return 'state--collapsed';
    },
    expandLink(e) {
      let target = e.target.parentElement;
      if(target.classList.contains('state--collapsed')) {
        target.classList.remove('state--collapsed');
        target.classList.add('state--expanded');
      } else {
        target.classList.remove('state--expanded');
        target.classList.add('state--collapsed');
      }
    }
  }
};
</script>
