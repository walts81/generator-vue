import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import "./style.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(vuetify);

app.mount("#app");
