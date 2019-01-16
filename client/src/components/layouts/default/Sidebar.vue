<template>
  <div class="layout-default_sidebar">

    <ul class="layout-default_sidebarNav">

      <li v-for="(link, index) in links" :key="index" :class="[link.expanded ? 'state--expanded' : 'state--collapsed']">
        <template v-if="link.sublinks && link.sublinks.length">
          <a class="layout-default_sidebarNav_secondNavTrigger" @click.stop="link.expanded = !link.expanded">{{ link.label }}</a>
          <ul class="layout-default_sidebarNav_secondNav">
              <li v-for="(sublink, subindex) in link.sublinks" :key="subindex">
                  <router-link :to="sublink.to">{{ sublink.label }}</router-link>
              </li>
          </ul>
        </template>
        <template v-else>
          <router-link :to="link.to">{{ link.label }}</router-link>
        </template>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: this.$route.path,
      links: [
        {
          label: 'UI Form',
          to: '/ui/form',
          expanded: false,
          sublinks: [
            {
              label: 'Checkbox',
              to: '/ui/form/checkbox',
            },
            {
              label: 'SwitchCheckbox',
              to: '/ui/form/switch_checkbox',
            },
            {
              label: 'Radio',
              to: '/ui/form/radio',
            },
            {
              label: 'Select',
              to: '/ui/form/select',
            },
            {
              label: 'Datepicker',
              to: '/ui/form/datepicker',
            }
          ]
        },
      ]
    };
  },
  mounted () {
    if(this.route.indexOf('/ui/form') > -1) {
      let route = this.getLink('/ui/form');
      route.expanded = true;
    }
  },
  methods: {
    getLink(to) {
      return this.links.find((x) => {
        return x.to === to;
      });
    }
  }
};
</script>
