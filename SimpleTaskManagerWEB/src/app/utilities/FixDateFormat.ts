export function FixDateFormat(data: Date) {
  let currdate = data.toLocaleDateString().replaceAll('/', '-');
  console.log(currdate);
  return currdate;
}
