<template>
  <layout-area classname="page--projectBilling">

    <slot-header-title title="Billing" :icon="null" />

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else>
      <div class="ui-table col--noborder" v-if="invoices">
        <table>
          <thead>
            <tr>
              <th class="col--checkbox"><ui-input-checkbox v-model="checkAll" /></th>
              <th>Invoice No.</th>
              <th>Invoice Date</th>
              <th>Amount due</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
            <tr class="thead--adjustement"></tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in invoices" :key="index">
              <th class="col--checkbox"><ui-input-checkbox v-model="invoice.check" /></th>
              <td>
                <router-link :to="invoice.link"># {{ invoice.invoiceNo }}</router-link>
              </td>
              <td>{{ invoice.createAt | moment('YYYY/MM/DD') }}</td>
              <td>{{ getInvoiceAmountDue(invoice) | dueAmountFormat }} {{ invoice.currency | currencySymbol }}</td>
              <td>{{ invoice.dueAt | moment('YYYY/MM/DD')  }}</td>
              <td>{{ invoice.status }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </layout-area>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/pages/billing.scss";
</style>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkAll: false,
      isPageLoading: false
    };
  },
  computed: {
    ...mapGetters([
      'getInvoiceAmountDue'
    ]),
    invoices() {
      let invoices = _.clone(this.$store.getters.projectInvoices);
      if(_.isEmpty(invoices)) return [];
      invoices.map((x) => {
        x.check = this.checkAll;
        x.link = "/client-area/projects/"+this.projectId+"/billing/invoice/"+x.id;
      });
      return invoices;
    }
  },
  methods: {
    onSelectAll(bool) {
      this.datas.map(x => (x.check = bool));
    }
  },
  async mounted() {
    this.isPageLoading = true;
    await this.$store.dispatch('fetchInvoices', {
      projectId: this.projectId
    });
    this.isPageLoading = false;
  }
};
</script>
