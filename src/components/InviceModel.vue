<template lang="">
    <div class="invoice-wrap flex flex-column" @click="checkClick" ref="invoiceWrap">
        <form class="invoice-content" @submit.prevent="submitForm">

            <loading v-show="loading" />

            <h1 v-if="!editInvoice">New Invoice</h1>
            <h1 v-else >Edit Invoice</h1>

            <div class="bill-form flex flex-column">

                <h4>Bill Form</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">Street Address</label>
                    <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                    <label for="billerCity">Biller City</label>
                    <input required type="text" id="billerCity" v-model="billerCity" />
                    </div>                
                    <div class="input flex flex-column">
                    <label for="billerZipCode">Zip Code</label>
                    <input required type="text" id="billerZipCode" v-model="billerZipCode" />
                    </div>     
                    <div class="input flex flex-column">
                    <label for="billerCountry">Country</label>
                    <input required type="text" id="billerCountry" v-model="billerCountry" />
                    </div>
                </div>

            </div>

            
            <div class="bill-to flex flex-column">
                  <h4>Bill To</h4>

                  <div class="input flex flex-column">
                    <label for="clientName">Client Name</label>
                    <input required type="text" id="clientName" v-model="clientName" />
                  </div> 
                  <div class="input flex flex-column">
                    <label for="clientEmail">Client Email</label>
                    <input required type="text" id="clientEmail" v-model="clientEmail" />
                  </div> 
                  <div class="input flex flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
                  </div> 

                  <div class="location-details flex">
                    <div class="input flex flex-column">
                    <label for="clientCity">Client City</label>
                    <input required type="text" id="clientCity" v-model="clientCity" />
                    </div>                
                    <div class="input flex flex-column">
                    <label for="clientZipCode">Zip Code</label>
                    <input required type="text" id="clientZipCode" v-model="clientZipCode" />
                    </div>     
                    <div class="input flex flex-column">
                    <label for="clientCountry">Country</label>
                    <input required type="text" id="clientCountry" v-model="clientCountry" />
                    </div>
                  </div>

            </div>
            

            <div class="invoice-work flex flex-column">

              <div class="payment flex">
                  <div class="input flex flex-column">
                    <label for="invoiceDate">Invoice Date</label>
                    <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
                  </div>
                  <div class="input flex flex-column">
                    <label for="paymentDueDate">payment Due</label>
                    <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
                  </div>
              </div>

              <div class="input flex flex-column">
                    <label for="paymentTerms">payment Terms</label>
                    <select required id="paymentTerms" v-model="paymentTerms" > 
                    <option value="30">Net 30 Days</option>
                    <option value="60">Net 60 Days</option>
                    </select>
              </div>

              <div class="input flex flex-column">
                    <label for="productDescription">Description</label>
                    <input required type="text" id="productDescription" v-model="productDescription" />
              </div>

            


            <div class="work-items"> 
              <h3>Item Lists</h3>
              <table class="item-list">
                <tr class="table-heading flex">
                  <th class="item-name">Item Name</th>
                  <th class="qty">Qty</th>
                  <th class="price">Price</th>
                  <th class="total">Total</th>
                </tr>
             
                <tr class="table-items flex" v-for="(item,index) in invoiceItemList" :key="index">
                  <td class="item-name"><input type="text" v-model="item.itemName" /></td>
                  <td class="qty"><span class='number-wrapper'><input type="number" v-model="item.qty" /></span></td>
                  <td class="price"><input type="text" v-model="item.price" /></td>
                  <td class="total flex">TK/= {{(item.total = item.qty * item.price)}}</td>
                  <img @click="deleteInvoiceItem(item.id)" src="../assets/icons/icon-delete.svg" />
                </tr>
              </table>

              <div @click="addNewInvoiceItem" class="flex button">
                 <img src="../assets/icons/icon-plus.svg" />
                 Add New Item
              </div>
            </div>


          </div>
            
            <div class="save flex">
              <div class="left">
                <button type="button" class="red" @click="closeInvoice">Close</button>
              </div>
              <div class="right flex">
                <button v-if="!editInvoice" type="submit" class="dark-purple" @click="saveDraft">Save Draft </button>
                <button v-if="!editInvoice" type="submit" class="purple" @click="publishInvoice">Create Invoice</button>
                <button v-if="editInvoice" type="submit" class="purple">Update Invoice</button>
              </div>
            </div>

        </form>
    </div>
</template>
<script>

import db from "../fire/firebaseInit";
import loading from "../components/loading.vue";
import { mapActions, mapMutations, mapState } from 'vuex';
import {uid} from 'uid';
import { updateDoc,doc, setDoc } from "firebase/firestore"; 
export default {

  name: "InviceModel",
  
  data() {
    return {
      docId: null,
      loading:null,
      dateOptions: {year: "numeric",month:"short",day:"numeric"},
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },

  components: {
    loading,
  },

  created() {

    if(!this.editInvoice) {
      this.invoiceDateUnix = Date.now();
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString("en-us",this.dateOptions);
    }

    if(this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;

    }

  },

  methods: {
    ...mapMutations(["TOGGLE_INVOICE","TOGGLE_MODAL","TOGGLE_EDIT_INVOICE"]),
    ...mapActions(["UPDATE_INVOICE","GET_INVOICES"]),

    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap){
        this.TOGGLE_MODAL();
      }
    },

    closeInvoice() {
      this.TOGGLE_INVOICE();
      if (this.editInvoice){
        this.TOGGLE_EDIT_INVOICE();
      }
    },

    addNewInvoiceItem(){
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: 1,
        price: 0,
        total: 0
      })
    },

    deleteInvoiceItem(id){
      this.invoiceItemList = this.invoiceItemList.filter((item) => item.id != id);
    },

    calInvoiceTotal(){
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },

    publishInvoice(){
      this.invoicePending = true;
    },

    saveDraft(){
      this.invoiceDraft = true;
    },

    async uploadInvoice() {
      if(this.invoiceItemList.length <= 0){
        alert("Item field is empty");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      //const dataBase = doc(collection(db, "invoices"));

      await setDoc(doc(db,"invoices",uid(4)),{
          invoiceId: uid(6),
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerZipCode: this.billerZipCode,
          billerCountry: this.billerCountry,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientZipCode: this.clientZipCode,
          clientCountry: this.clientCountry,
          invoiceDate: this.invoiceDate,
          invoiceDateUnix: this.invoiceDateUnix,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: this.invoicePending,
          invoiceDraft: this.invoiceDraft,
          invoicePaid: null,
        })

      this.loading = false;

      this.TOGGLE_INVOICE();
      this.GET_INVOICES();

      toast.fire({
            icon:"success",
            title:"Data Has beeen Added Successfully"
        });

    },

    async updateInvoice() {
      if(this.invoiceItemList.length <= 0){
        alert("Item field is empty");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = doc(db,"invoices", this.docId);

      await updateDoc(dataBase,{
            billerStreetAddress: this.billerStreetAddress,
            billerCity: this.billerCity,
            billerZipCode: this.billerZipCode,
            billerCountry: this.billerCountry,
            clientName: this.clientName,
            clientEmail: this.clientEmail,
            clientStreetAddress: this.clientStreetAddress,
            clientCity: this.clientCity,
            clientZipCode: this.clientZipCode,
            clientCountry: this.clientCountry,
            paymentTerms: this.paymentTerms,
            paymentDueDate: this.paymentDueDate,
            paymentDueDateUnix: this.paymentDueDateUnix,
            productDescription: this.productDescription,
            invoiceItemList: this.invoiceItemList,
            invoiceTotal: this.invoiceTotal,
        });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      };

      this.UPDATE_INVOICE(data);
      
    },



    submitForm() {
      if(this.editInvoice) {
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    },

  },

  computed: {
    ...mapState(["editInvoice","currentInvoiceArray"])
  },

  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us",this.dateOptions);
      }
    }
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color:#fff;
    box-shadow: 10px 4px 6px -1px rgba(0,0,0,0.2),0 2px 4px -1px rgba(0,0,0,0.6);

    h1 {
      margin-bottom: 48px;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    .bill-to,
    .bill-form {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex : 1;
        }
      }
    }

    .invoice-work {
      .payment {
        gap: 24px;

        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          .table-heading,
          .table-items {
            gap:16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
              text-align: center
            }

            .price {
              flex-basis: 20%;
              text-align: center;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
           .table-heading {
              margin-bottom: 16px;

              th {
                text-align: left;
              }
            }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color:#fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
        margin-top: 60px;

        div {
          flex: 1;
        }

        .right {
          justify-content: flex-end;
        }
      }
  }

  .input {
    margin-bottom:  24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {  
   opacity: .2;
   padding: 20px 0;
   padding-right : 0;
   margin-right: -5px; 
   }

}


</style>