import dayjs from 'https://esm.sh/dayjs';

const day = dayjs();

export default function isWeekend(day) {
  const dayName = day.format('dddd').toLowerCase(); // нормализуем к нижнему регистру

  if (dayName === 'saturday') {
    console.log('The day is Saturday');
  } else if (dayName === 'sunday') {
    console.log('The day is Sunday');
  } else {
    console.log('Today is not a weekend');
  }
}