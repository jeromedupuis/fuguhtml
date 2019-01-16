<template>
  <layout-area classname="page--projectInvoice">

    <template v-if="hasNoData">
      <slot-header-title :title="$t('invoice-title')" />
    </template>
    <template v-else>
      <slot-header-title :title="$t('invoice-title')+' #'+invoice.invoiceNo" />
    </template>

    <section class="section-loader" v-if="isPageLoading">
      <ui-loader-circle />
    </section>
    <template v-else-if="hasNoData">
      <section class="section-container">
        <p class="text--center">No data</p>
      </section>
    </template>
    <template v-else>
      <section class="section-container">
          <div class="invoice-resume">
          <div class="invoice-resumeRow">
            <div class="invoice-resumeCell">
              <label>{{ $t('invoice-status') }}</label>
              <p class="text--status">{{ invoice.status }}</p>
            </div>
            <div class="invoice-resumeCell">
              <label>{{ $t('invoice-date') }}</label>
              <template v-if="isInvoiceSettled(invoice)">
                <p class="text--date">{{ invoice.createdAt | moment('YYYY/MM/DD')  }}</p>
              </template>
              <template v-else>
                <p>{{ $t('invoice-unsettled') }}</p>
              </template>
            </div>
            <div class="invoice-resumeCell">
              <label>{{ $t('invoice-dueAt') }}</label>
              <template v-if="isInvoiceSettled(invoice)">
                <p class="text--date">{{ invoice.dueAt | moment('YYYY/MM/DD')  }}</p>
              </template>
              <template v-else>
                <p>{{ $t('invoice-unsettled') }}</p>
              </template>
            </div>
            <div class="invoice-resumeCell">
              <template v-if="isInvoiceSettled(invoice)">
                <label>{{ $t('invoice-total_amount_due') }}</label>
              </template>
              <template v-else>
                <label>{{ $t('invoice-unsettled_total_amount') }}</label>
              </template>
              <p class="text--amount">{{ invoice.amountDue | dueAmountFormat }} {{ invoice.currency | currencySymbol }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="invoice-detail_container">
        <div class="ui-table">
          <table>
            <thead>
              <tr>
                <th class="col--id"></th>
                <th class="col--item">{{ $t('invoice-item') }}</th>
                <th class="col--quantity">{{ $t('invoice-quantity') }}</th>
                <th class="col--unity">{{ $t('invoice-unity') }}</th>
                <th class="col--unitPrice">{{ $t('invoice-unit_price') }}</th>
                <th class="col--item_price">{{ $t('invoice-item_price') }}</th>
                <th class="col--summary">{{ $t('invoice-summary') }}</th>
              </tr>
              <tr class="thead--adjustement"></tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index">
                <td class="col--id">#{{index+1}}</td>
                <td class="col--item">{{ item.item }}</td>
                <td class="col--quantity">{{ item.quantity }}</td>
                <td class="col--unity">{{ $t('invoice-unity_'+item.unity) }}</td>
                <td class="col--unitPrice">{{ item.unitPrice | dueAmountFormat }}</td>
                <td class="col--item_price">{{ getItemTotalPrice(item) | dueAmountFormat }}</td>
                <td class="col--summary">{{ item.summary }}</td>
              </tr>
              <tr class="tbody--adjustement"></tr>
            </tbody>
            <tbody>
              <tr v-for="(discount, index) in invoice.discounts" :key="index">
                <td colspan="5" class="col--item">
                  {{ discount.name }}
                  <template v-if="discount.unity == 'percent'">
                    ({{ discount.value }}%)
                  </template>
                </td>
                <td class="col--discount_value">- {{ getInvoiceOneDiscountValue(invoice, discount) | dueAmountFormat }}</td>
                <td class="col--discount_summary"></td>
              </tr>
              <tr class="tbody--adjustement"></tr>
            </tbody>
            <tbody>
              <tr>
                <td colspan="5" class="col--footer_items_price">{{ $t('invoice-total_items_price') }}</td>
                <td class="col--footer_value">{{ invoice.beforeTax | dueAmountFormat }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="5" class="col--footer_vat">{{ $t('invoice-tax') }} ({{ $t('invoice-vat') }} {{ invoice.vat }}%)</td>
                <td class="col--footer_value">{{ invoice.tax | dueAmountFormat }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="5" class="text--bold col--footer_amount_due">
                  <template v-if="isInvoiceSettled(invoice)">
                    {{ $t('invoice-amount_due') }}
                  </template>
                  <template v-else>
                    {{ $t('invoice-unsettled_amount_due') }}
                  </template>
                </td>
                <td class="text--bold col--footer_value">{{ invoice.currency | currencySymbol }} {{ invoice.amountDue | dueAmountFormat }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <template v-if="isInvoiceSettled(invoice)">
        <section class="invoice-provider_container">
          <div class="row">
            <div class="col-6">
              <section class="section-container">
                <label>{{ $t('invoice-recipient') }}</label>
                <template v-if="provider.companyName">
                  {{ provider.companyName }}
                </template>
                <p>{{ provider.name }}</p>
                <p>
                  <template v-if="provider.zipcode">〒</template>
                  {{ provider.zipcode }} {{ provider.address }}
                </p>
                <p>{{ $t('invoice-phone') }} : {{ provider.tel }}</p>
              </section>
            </div>
            <div class="col-6">
              <section class="section-container background--transparent">
                <label>{{ $t('invoice-bank_account') }}</label>
                <p>{{ bank_account.holderName }}</p>
                <p>{{ bank_account.bankName }}銀行 {{ bank_account.branchName }}支店 ({{ bank_account.type }})</p>
                <p>{{ bank_account.accountNumber }}</p>
              </section>
            </div>
          </div>
        </section>
      </template>
    </template>
  </layout-area>
</template>

<style lang="sass">
  @import "../../assets/sass/pages/invoice.scss";
</style>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPageLoading: true
    };
  },
  computed: {
    ...mapGetters([
      'getInvoice',
      'getInvoiceAmountTax',
      'getInvoiceAmountDueBeforeTax',
      'getInvoiceAmountDueBeforeTaxDiscountIncluded',
      'getInvoiceAmountDue',
      'getInvoiceOneDiscountValue',
      'isInvoiceSettled'
    ]),
    hasNoData() {
      return (this.isPageLoading === false && _.isEmpty(this.invoice));
    },
    invoice() {
      let invoice = _.clone(this.getInvoice(this.id));
      if(_.isEmpty(invoice)) {
        return {};
      }
      invoice.beforeTax = this.getInvoiceAmountDueBeforeTaxDiscountIncluded(invoice);
      invoice.tax = this.getInvoiceAmountTax(invoice);
      invoice.amountDue = this.getInvoiceAmountDue(invoice);

      return invoice;
    },
    provider() {
      return _.get(this.invoice, 'provider', {});
    },
    bank_account() {
      return _.get(this.provider, 'bank_account', {});
    }
  },
  methods: {
    getItemTotalPrice(item) {
      return _.round(item.quantity * item.unitPrice, 2);
    }
  },
  async mounted() {
    this.isPageLoading = true;
    await this.$store.dispatch('fetchOneInvoice', {
      projectId: this.projectId,
      id: this.id
    });
    this.isPageLoading = false;
  }
};
</script>
