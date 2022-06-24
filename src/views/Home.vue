<template>
  <div class="home container">
    <div class="header flex">

      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are <span class="totalInvoice">{{invoiceData.length}}</span> total Invoices</span>
      </div>
      <div class="right flex">

        <div class="filter flex" @click="toggleFilterMenu" >
          <span>Filter status by<span v-if="filteredInvoice"> : {{filteredInvoice}}</span> </span>
          <img src="../assets/icons/icon-arrow-down.svg" alt="">
          <ul class="filter-menu" v-show="filterMenu">
          <li @click="filteredInvoices">Draft</li>
          <li @click="filteredInvoices">Pending</li>
          <li @click="filteredInvoices">Paid</li>
          <li @click="filteredInvoices">Clear Filter</li>
          </ul>
        </div>
        <div class="button flex" @click="newInvoice">
          <div class="inner-button flex">
            <img src="../assets/icons/icon-plus.svg" alt="">
          </div>
          <span>New Invoice</span>
        </div>
     
     </div>

    </div>
    <!-- End of Header -->
    <div v-if="invoiceData.length > 0">

      <Invoice v-for="(invoice, index) in filteredData" :key="index" :invoice="invoice" />

    </div>
    <div v-else class="empty flex flex-column">
      <img src="../assets/icons/illustration-empty.svg" />
      |<h3>There in no data here</h3>
      <p>For getting started Try to create new Invoices....<br>Thank You.</p>
    </div>
  </div>
</template>

<script>

import Invoice from "../components/invoice.vue";
import { mapMutations,mapState } from "vuex";


export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    }
  },
  components: {
    Invoice
  },
  methods: {
    
  ...mapMutations(['TOGGLE_INVOICE']),
  newInvoice(){
    this.TOGGLE_INVOICE();
  },

    
  toggleFilterMenu () {
     this.filterMenu = !this.filterMenu;
   },


  filteredInvoices(e){
    if(e.target.innerText === "Clear Filter"){
      this.filteredInvoice = null;
      return;
    }
    this.filteredInvoice = e.target.innerText;
  }

  },

  computed: {
    ...mapState(['invoiceData']),

    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if(this.filteredInvoice === "Draft"){
          return invoice.invoiceDraft === true;
        }
        if(this.filteredInvoice === "Pending"){
          return invoice.invoicePending === true;
        }
        if(this.filteredInvoice === "Paid"){
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    .totalInvoice {
      color: rgba(60, 255, 0, 0.644)
      }
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;
        cursor: pointer;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }
      .filter-menu {
        width: 120px;
        position: absolute;
        top: 25px;
        list-style: none;
        background: #1e2139;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.6);

        li {
          cursor: pointer;
          font-size: 12px;
          padding: 10px 20px;

          &:hover {
            color: #1e2139;
            background-color: #fff;
          }
        }
       }

      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;

          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
      color: rgba(255, 17, 0, 0.479);
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }

}

</style>