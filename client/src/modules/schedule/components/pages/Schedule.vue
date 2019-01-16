<template>
  <layout-area classname="page--projectSchedule">
    <slot-header-title title="Project Schedule" :icon="null" />

    <div class="project-schedule_calendar">
      <full-calendar :events="events" @event-selected="selectEvent" />
    </div>

  </layout-area>
</template>

<style lang="sass">
  @import "fullcalendar/dist/fullcalendar.css";
  @import "fullcalendar-scheduler/dist/scheduler.min.css";
  @import "../../assets/sass/pages/schedule.scss";
</style>

<script>
import Vue from 'vue';
import { FullCalendar } from 'vue-full-calendar';
import moment from 'moment';

export default {
  components: {
    FullCalendar,
  },
  computed: {
    project() {
      let project = this.$store.getters.currentProject;
      let events = [];

      if(project.devStartAt) {
        events.push({
          title: 'Development start',
          id: 'project_dev_start',
          start: moment(project.devStartAt).format('YYYY-MM-DD HH:mm'),
          textColor: 'white',
          color: '#57a510',
          editable: false,
          module: 'project',
          allDay: true
        });
      }

      if(project.devEndAt) {
        events.push({
          title: 'Development end',
          id: 'project_dev_start',
          start: moment(project.devEndAt).format('YYYY-MM-DD HH:mm'),
          textColor: 'white',
          color: '#d2a504',
          editable: false,
          module: 'project',
          allDay: true
        });
      }

      if(project.reviewStartAt && project.reviewEndAt) {
        events.push({
          title: 'Review',
          id: 'project_dev_start',
          start: moment(project.reviewStartAt).format('YYYY-MM-DD HH:mm'),
          end: moment(project.reviewEndAt).format('YYYY-MM-DD HH:mm'),
          textColor: 'white',
          color: '#ce6a23',
          editable: false,
          module: 'project',
          allDay: true
        });
      }

      if(project.endAt) {
        events.push({
          title: 'Project end',
          id: 'project_end',
          start: moment(project.endAt).format('YYYY-MM-DD HH:mm'),
          textColor: 'white',
          color: '#57a510',
          editable: false,
          module: 'project',
          allDay: true
        });
      }

      return events;
    },
    planning() {
      let planning = this.$store.getters.projectPlanning.filter((x) => {
        return x.startAt && x.endAt;
      });

      planning.map((x) => {
        x.start = moment(x.startAt).format('YYYY-MM-DD HH:mm');
        x.end = moment(x.endAt).format('YYYY-MM-DD HH:mm');
        x.allDay = x.allDay === undefined ? false : x.allDay;
        x.textColor = 'white';
        x.color = '#42a4c5';
        x.editable = false;
        x.module = 'planning';
      });
      return planning;
    },
    tasks() {
      let tasks = this.$store.getters.projectTasks.filter((x) => {
        return x.startAt && x.dueAt;
      });

      tasks.map((x) => {
        x.title = x.subject;
        x.start = moment(x.startAt).format('YYYY-MM-DD HH:mm');
        x.end = moment(x.dueAt).format('YYYY-MM-DD HH:mm');
        x.allDay = true;
        x.textColor = 'white';
        x.color = '#383838';
        x.editable = false;
        x.module = 'task';
      });
      return tasks;
    },
    events() {
      return [
        ...this.project,
        ...this.tasks,
        ...this.planning
      ];
    }
  },
  methods: {
    selectEvent(event) {
      console.log(event);
      Vue.$bus.$emit('setSidebarComment', {
        title: 'Task comment',
        endpoint: '#'
      });
    }
  }
};
</script>
