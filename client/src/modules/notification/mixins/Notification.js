import Notification from '../components/Notification';

export default {
  components: {
    'module-notification': Notification
  },
  methods: {

    /**
     * addNotification : add notification manually from a string or a object
     * @notice (string OR object)
     * -- string : set a String will give a 'default' type to the notifications
     * -- object : will set a notification with the object given without any change
     * = dispatch addNotification
     */
    addNotification(text, type) {
      if(type === undefined) {
        type = 'default';
      }

      this.$store.dispatch('addNotification', {
        text, type
      });
    },

    /**
     * callNotification : add notification from data/notication.js file using a code
     * @ code (string) key of data/notification.js object data
     * @args (array) : arguments used in the data/notification.js object's print method
     * = dispatch fetchNotificationbyCode
     */
    callNotification(code, args) {
      this.$store.dispatch('fetchNotificationbyCode', {
        code,
        args
      });
    }
  }
};
