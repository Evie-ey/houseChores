const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const getDay = (newDate: Date) => {
  let day  = days[newDate.getDay()]
  return day
}
