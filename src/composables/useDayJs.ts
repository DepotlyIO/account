import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/en';

dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.locale('en');

export const useDayJs = () => dayjs;
