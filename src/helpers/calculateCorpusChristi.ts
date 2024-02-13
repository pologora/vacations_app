/* eslint-disable no-magic-numbers */
export default function calculateCorpusChristi(easterMonday: string) {
  const parts = easterMonday.split('-');
  const easter = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  easter.setDate(easter.getDate() + 59); // add 59 days to get Corpus Christi

  // format the date as MM-DD
  const formattedDate = `${`0${easter.getMonth() + 1}`.slice(
    -2,
  )}-${`0${easter.getDate()}`.slice(-2)}`;

  return formattedDate;
}
