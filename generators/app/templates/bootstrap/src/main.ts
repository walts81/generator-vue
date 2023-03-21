import { createApp } from 'vue';
import dayjs from './plugins/dayjs';
import 'bootstrap';
import './styles/main.scss';
import App from './App.vue';

let app = createApp(App);
app = app.use(dayjs);
app.mount('#app');
