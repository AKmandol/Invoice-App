import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';


window.Swal = Swal;

const  toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton: false,
    timer:2000,
    timerProgressBar:true,
});

window.toast = toast;

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
