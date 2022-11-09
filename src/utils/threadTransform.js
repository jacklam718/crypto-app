import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const threadTransform = (thread) => ({
  ...thread,
  postedAt: dayjs(Number(thread.postTime)).fromNow(false),
});

export default threadTransform;
