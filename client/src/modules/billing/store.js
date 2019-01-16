import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const FETCH_INVOICES = 'FETCH_INVOICES';
const FETCH_ONE_INVOICE = 'FETCH_ONE_INVOICE';

// invoiceFormat = {
//   id: 1,
//   status: 'confirmed',
//   invoiceId: '12345678911',
//   invoiceDate: '2018/10/11 10:00',
//   dueAt: '2018/10/20 20:00',
//   client: {
//     name: '株式会社〇〇〇〇 御中',
//     zipcode: '101-0000',
//     address: '東京都〇〇市〇〇町1-2-3 〇〇〇〇ビル〇階 〇〇号'
//   },
//   provider: {
//     companyMame: '株式会社〇〇〇〇',
//     name: 'Jerome Dupuis',
//     zipcode: '101-0000',
//     address: '東京都〇〇市〇〇町1-2-3 〇〇〇〇ビル〇階 〇〇号',
//     tel: '00-0000-0000',
//     bankAccount: {
//       holderName: 'JEROME JEAN FRANCOIS LUCIEN DUPUIS',
//       bankName: 'MIZUHO',
//       branchName: '渋谷',
//       accountNumber: '000-1234567-1',
//       type: '普通'
//     }
//   },
//   currency: 'JPY',
//   items: [
//     {
//       no: 1,
//       item: 'ウェブサイト制作',
//       quantity: 45,
//       unity: 'hour',
//       unitPrice: 5000,
//       summary: ''
//     }
//   ],
//   discounts: [
//     {
//       name: 'Sample',
//       unity: 'amount',
//       value: '5000'
//     },
//   ],
//   vat: 8
// }

const state = () => {
  return {
    invoices: [],
    oneInvoice: {}
  };
};
const getters = {
  getInvoice: state => {
    return id => {
      return state.invoices.find((x) => { return x.id == id; });
    };
  },
  projectInvoices: state => {
    return state.invoices;
  },
  getInvoiceAmountTax: (state, getters) => {
    return invoice => {

      let amount = getters.getInvoiceAmountDueBeforeTaxDiscountIncluded(invoice);
      return _.round(amount/100*invoice.vat, 2);
    };
  },
  getInvoiceAmountDueBeforeTax: () => {
    return invoice => {
      let amount = 0;

      if(_.isEmpty(invoice.items)) {
        return amount;
      }

      invoice.items.map((item) => {
        amount += parseFloat(item.quantity * item.unitPrice);
      });
      return _.round(amount, 2);
    };
  },
  getInvoiceAmountDueBeforeTaxDiscountIncluded: (state, getters) => {
    return invoice => {
      let before_tax = getters.getInvoiceAmountDueBeforeTax(invoice);
      let discount = getters.getInvoiceTotalDiscount(invoice);
      return _.round(before_tax - discount, 2);
    };
  },
  getInvoiceTotalDiscount: (state, getters) => {
    return invoice => {

      let amount = 0;
      if(_.isEmpty(invoice.discounts)) {
        return amount;
      }

      invoice.discounts.map((discount) => {
        amount += parseFloat(getters.getInvoiceOneDiscountValue(invoice, discount));
      });
      return _.round(amount, 2);
    };
  },
  getInvoiceAmountDue: (state, getters) => {
    return invoice => {

      let before_tax = getters.getInvoiceAmountDueBeforeTaxDiscountIncluded(invoice);
      let tax = getters.getInvoiceAmountTax(invoice);
      return _.round(before_tax+tax, 2);
    };
  },
  getInvoiceOneDiscountValue: (state, getters) => {
    return (invoice, discount) => {
      let amount = 0;
      let before_tax = getters.getInvoiceAmountDueBeforeTax(invoice);

      switch(discount.unity) {
      case 'amount':
        amount = discount.value;
        break;
      case 'percent':
        amount = before_tax/100*discount.value;
        break;
      }
      return amount;
    };
  },
  isInvoiceSettled: () => {
    return invoice => {
      let statuses = ['completed', 'confirmed'];
      if(statuses.indexOf(invoice.status) > -1) {
        return true;
      }
      return false;
    };
  }
};
const actions = {
  async fetchInvoices({commit}, params) {
    let req = Vue.$firestore.collection('invoices');
    req = req.where('projectId', '==', params.projectId);
    let data = await req.get();

    let docs = Vue.$libs.firestore.getFireDocs(data);
    commit(FETCH_INVOICES, docs);
  },
  async fetchOneInvoice({commit}, params) {
    let req = Vue.$firestore.collection('invoices');
    req.doc(params.id);
    req = req.where('projectId', '==', params.projectId);
    let data = await req.get();

    let docs = Vue.$libs.firestore.getFireDocs(data);
    if (_.isEmpty(docs)) {
      commit(FETCH_ONE_INVOICE, {});
    }
    else {
      commit(FETCH_ONE_INVOICE, _.head(docs));
    }

  }
};
const mutations = {
  [FETCH_INVOICES] (state, payload) {
    state.invoices = payload;
  },
  [FETCH_ONE_INVOICE] (state, payload) {
    let index = _.indexOf(state.invoices, (doc) => {
      return doc.id === payload.id;
    });

    if(index == -1) {
      state.invoices.push(payload);
    } else {
      Object.assign(state.invoices[index], payload);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
