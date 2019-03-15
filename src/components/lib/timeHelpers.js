import {
  isValid,
  differenceInYears,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInSeconds,
} from 'date-fns';
import format from 'date-fns/format';

export function formatUpdatedAt(time) {
  const date = new Date(time);
  if (isValid(date)) {
    if (differenceInSeconds(new Date(), date) < 60) {
      return 'Less than minute ago.';
    }

    if (differenceInMinutes(new Date(), date) < 60) {
      return `${differenceInMinutes(new Date(), date)} minute(s) ago.`;
    }

    if (differenceInHours(new Date(), date) < 24) {
      return `${differenceInHours(new Date(), date)} hour(s) ago.`;
    }

    if (differenceInDays(new Date(), date) < 7) {
      return `${differenceInDays(new Date(), date)} day(s) ago.`;
    }

    if (differenceInYears(new Date(), date) < 1) {
      return format(date, 'MMM D');
    }

    return format(date, 'MMM D, YYYY');
  }

  return '';
}

export default {
  formatUpdatedAt,
};
