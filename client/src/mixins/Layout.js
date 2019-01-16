import SiteLogo from '@/components/layouts/SiteLogo';
import LayoutArea from '@/components/layouts/Area';
import SlotHeaderTitle from '@/components/layouts/dashboard/SlotHeaderTitle';

export default {
  components: {
    'site-logo': SiteLogo,
    'layout-area': LayoutArea,
    'slot-header-title': SlotHeaderTitle
  },
  computed: {
    websiteArea() {
      return this.$store.getters.websiteArea;
    },
    getAreaLayout() {
      if(this.websiteArea == 'client-area') {
        return 'layout-clientarea';
      }
      else if(this.websiteArea == 'freelancer-area') {
        return 'layout-freelancerarea';
      }
      return 'default-layout';
    }
  }
};
