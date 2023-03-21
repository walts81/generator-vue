import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default {
  install() {
    dayjs.extend(relativeTime);
  },
};
