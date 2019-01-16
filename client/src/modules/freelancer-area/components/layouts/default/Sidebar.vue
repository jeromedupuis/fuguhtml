<template>
  <div class="layout-freelancerArea_sidebar">

    <ul class="layout-freelancerArea_sidebarNav">
      <li v-for="(link, index) in links" :key="index" :class="[getLinkClass(link)]">
        <template v-if="link.sublinks && link.sublinks.length">
          <a class="layout-freelancerArea_sidebarNav_secondNavTrigger" :class="link.class" @click.stop="expandLink">
            <template v-if="link.icon">
              <img :src="link.icon" alt="" />
            </template>
            <span>{{ link.label }}</span>
          </a>
          <ul class="layout-freelancerArea_sidebarNav_secondNav">
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
import _ from 'lodash';

export default {
  computed: {
    currentProject() {
      return this.$store.getters.currentProject;
    },
    projectId() {
      return _.get(this.currentProject, '_id', null);
    },
    projectCategory() {
      return _.get(this.currentProject, 'category', null);
    },
    projectStatus() {
      return _.get(this.currentProject, 'status', null);
    },
    projectName() {
      return _.get(this.currentProject, 'name', '...');
    },
    links() {

      let links = [
        {
          id: 'projects',
          label: this.projectName,
          class: 'link--currentProject',
          to: '/freelancer-area/projects'
        },
        {
          label: 'Resume',
          to: '/freelancer-area/projects/'+this.projectId+'/resume',
          icon: '/static/img/svg/010-creative.svg'
        },
      ];

      if(this.projectStatus == 'CLEARUP') {
        links = [
          ...links,
          {
            label: 'Clear up details',
            to: '/freelancer-area/projects/'+this.projectId+'/clearup/details',
            icon: '/static/img/svg/010-creative.svg'
          }
        ];

        if(this.projectCategory == 'frontend') {
          links = [
            ...links,
            {
              label: 'Clear up Front End',
              to: '/freelancer-area/projects/'+this.projectId+'/clearup/frontend',
              icon: '/static/img/svg/010-creative.svg'
            }
          ];
        }

        links = [
          ...links,
          {
            label: 'Clear up Tasks',
            to: '/freelancer-area/projects/'+this.projectId+'/clearup/tasks',
            icon: '/static/img/svg/010-creative.svg'
          }
        ];
      }
      else if(this.projectStatus == 'OPEN') {

        links = [
          ...links,
          {
            label: 'Schedule',
            to: '/freelancer-area/projects/'+this.projectId+'/schedule',
            icon: '/static/img/svg/001-clock.svg'
          },
          {
            label: 'Tasks',
            to: '/freelancer-area/projects/'+this.projectId+'/tasks',
            icon: '/static/img/svg/013-pie-chart.svg'
          },
          {
            label: 'Review',
            to: '/freelancer-area/projects/'+this.projectId+'/review',
            icon: '/static/img/svg/003-search.svg'
          },
          {
            label: 'Billing',
            to: '/freelancer-area/projects/'+this.projectId+'/billing',
            icon: '/static/img/svg/015-banknote.svg'
          },
          {
            label: 'Download',
            to: '/freelancer-area/projects/'+this.projectId+'/download',
            icon: '/static/img/svg/029-download.svg'
          },
          {
            label: 'Settings',
            to: '/freelancer-area/projects/'+this.projectId+'/settings',
            icon: '/static/img/svg/008-gears.svg'
          }
        ];
      }
      return links;
    }
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
      return 'state--collapsed';
    },
    expandLink(e) {
      console.log(e);
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
