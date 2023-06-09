import { createApp } from 'vue';
import { vuetify } from './plugins/vuetify';
import './style.scss';
import App from './App.vue';

let app = createApp(App);
app = app.use(vuetify);
app.mount('#app');
