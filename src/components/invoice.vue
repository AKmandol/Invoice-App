<template lang="">
    <router-link class="invoice flex" :to="{ name: 'Invoice', params: {invoiceId: invoice.invoiceId} }">
    
        <div class="left flex">
            <span class="tarcking-number">{{invoice.invoiceId}}</span>
            <span class="due-date">{{invoice.paymentDueDate}}</span>
            <span class="person">{{invoice.clientName}}</span>
        </div>

        <div class="right flex">
            <span class="price">{{invoice.invoiceTotal}}</span>
            <div class="status-button flex" :class="{paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending}" >
                <span v-if="invoice.invoicePaid" >Paid</span>
                <span v-if="invoice.invoiceDraft" >Draft</span>
                <span v-if="invoice.invoicePending" >Pending</span>
            </div>          
        </div>

        <div class="action flex">
            <div class="icon">
                <button><img src="../assets/icons/edit.png"/></button>
                <button class="middle"><img src="../assets/icons/delete.png" /></button>
                <button><img src="../assets/icons/view.png" /></button>
            </div>
        </div>

    </router-link>
</template>
<script>
export default {
    name: "invoice",
    props:["invoice"]
}
</script>
<style lang="scss" scoped>
.invoice {
    text-decoration : none;
    cursor: pointer;
    gap:16px;
    margin-bottom: 16px;
    color: #fff;
    border-radius: 20px;
    padding: 28px 32px;
    background-color: #12162b;
    align-items: center;

    .left {
        align-items: center;
        flex-basis: 50%;
        gap: 16px;

        span {
            flex: 1;
        }

        .tracking-number {
            text-transform: uppercase;
        }
    }

    .right {
        gap: 16px;
        flex-basis: 30%;
        align-items: center;

        .price {
            flex: 1;
            font-size: 16px;
            font-weight: 600;       
        }     
    }

    .action {
        gap: 16px;
        flex-basis: 20%;
        align-items: center;

        button {
            background-color: transparent;
            margin: 0 auto;
            padding: 0;

            img {
            width: 22px;

            }

            :hover {
                background-color: #060811;
                padding: 1px;
            }
        }

        .middle {
            margin: 0 25px;
        }
    }

    span {
        font-size: 13px;
    }
}
</style>