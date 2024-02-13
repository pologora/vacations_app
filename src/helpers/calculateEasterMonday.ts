/* eslint-disable no-magic-numbers */
export default function calculateEasterMonday(year: number) {
  const f = Math.floor;
  const G = year % 19;
  const C = f(year / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);

  const easter = new Date(year, month - 1, day);
  easter.setDate(easter.getDate() + 1); // this will set the date to Easter Monday

  // format the date as MM-DD
  const formattedDate = `${`0${easter.getMonth() + 1}`.slice(
    -2,
  )}-${`0${easter.getDate()}`.slice(-2)}`;

  return formattedDate;
}
