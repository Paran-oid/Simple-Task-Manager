export function FixDateFormat(data: Date) {
  let currdate = data.toLocaleDateString().replaceAll('/', '-');

  let stringBuilt = '';

  for (let i = currdate.length; i >= 0; i--) {
    stringBuilt = stringBuilt + currdate[i];
  }

  console.log(stringBuilt);
  return currdate;
}
