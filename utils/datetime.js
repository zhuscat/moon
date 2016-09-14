export function cloneDate(date) {
  return new Date(date.getTime());
}

export function getMonthFirstDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function prevMonthDate(date) {
  const d = cloneDate(date);
  d.setMonth(d.getMonth() - 1);
  return d;
}

export function nextMonthDate(date) {
  const d = cloneDate(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

export function prevYearDate(date) {
  const d = cloneDate(date);
  d.setFullYear(d.getFullYear() - 1);
  return d;
}

export function nextYearDate(date) {
  const d = cloneDate(date);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

export function getMonthDays(date) {
  const d = cloneDate(date);
  d.setMonth(date.getMonth() + 1);
  d.setDate(0);
  return d.getDate();
}

export function prevMonthDays(date) {
  const d = cloneDate(date);
  const month = d.getMonth();
  return getMonthDays(new Date(d.setMonth(month - 1)));
}

// two dimension array, every array in the array has seven elements.
export function getMonthDaysArray(date) {
  const d = cloneDate(date);
  const daysArray = [];
  const weekArray = [];
  const days = getMonthDays(d);
  const prevDays = prevMonthDays(d);
  for (let i = 1; i <= days; i++) {
    daysArray.push(new Date(d.getFullYear(), d.getMonth(), i, d.getHours(), d.getMinutes()));
  }
  while (daysArray.length) {
    const weekFirstDay = daysArray[0].getDay();
    const daysOfFirstWeek = 7 - weekFirstDay;
    const lastMonthDays = 7 - daysOfFirstWeek;
    const week = daysArray.splice(0, daysOfFirstWeek);
    const weekLastDay = week[week.length - 1].getDay();
    const nextMonthDays = 6 - weekLastDay;
    for (let i = 0; i < lastMonthDays; i++) {
      week.unshift(new Date(
        d.getFullYear(),
        d.getMonth() - 1,
        prevDays - i,
        d.getHours(),
        d.getMinutes()));
    }
    for (let i = 1; i <= nextMonthDays; i++) {
      week.push(new Date(d.getFullYear(), d.getMonth() + 1, i, d.getHours(), d.getMinutes()));
    }
    weekArray.push(week);
  }
  return weekArray;
}

export function sameDay(date, compareDate) {
  const sameYear = date.getFullYear() === compareDate.getFullYear();
  const sameMonth = date.getMonth() === compareDate.getMonth();
  const sameDate = date.getDate() === compareDate.getDate();
  if (sameYear && sameMonth && sameDate) {
    return true;
  }
  return false;
}

export function addLeadingZeros(num, length) {
  const str = `${num > 0 ? num : -num}`;
  let zeros = '';
  for (let i = length - str.length; i > 0; i--) {
    zeros += '0';
  }
  zeros += str;
  return num >= 0 ? zeros : `-${zeros}`;
}

export function format(date, fmt) {
  let f = fmt;
  const regValueMap = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  if (/(y+)/.test(f)) {
    f = f.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(regValueMap).forEach((k) => {
    if (new RegExp(`(${k})`).test(f)) {
      f = f.replace(RegExp.$1,
        (RegExp.$1.length === 1) ?
        (regValueMap[k]) :
        `00${regValueMap[k]}`.substr(`${regValueMap[k]}`.length));
    }
  });
  return f;
}

export function formatDate(fmt, date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}/${month}/${day} ${addLeadingZeros(hour)}:${addLeadingZeros(minute)}`;
}
