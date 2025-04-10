export default function isWeekend(day) {
  const dayName = day.format('dddd');
    return dayName === 'Saturday' || dayName === 'Sunday'
}