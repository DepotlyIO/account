import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/en';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

dayjs.locale('en');

export const useDayJs = () => dayjs;
