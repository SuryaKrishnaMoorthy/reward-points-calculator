const POINT_ONE = 1;
const POINT_TWO = 2;

export const Months = Object.freeze({
  0: "january",
  1: "february",
  2: "march",
  3: "april",
  4: "may",
  5: "june",
  6: "july",
  7: "august",
  8: "september",
  9: "october",
  10: "november",
  11: "december",
});

/**
  Calculate rewards for a customer for 3 months
  By default, January is selected. If a month is passed,
  then that is considered as the starting month.
 */
export const calculateMonthlyRewards = (transactions, firstMonth) => {
  let month;
  if (!firstMonth) {
    month = 0;
  } else {
    month = parseInt(firstMonth);
  }
  let first = month % 12,
    second = (month + 1) % 12,
    third = (month + 2) % 12;
  /*
    To make rewards object to get data in below format
    {
      january: 100,
      february: 300,
      march: 200
    }
  */
  let rewards = {
    [Months[first]]: 0,
    [Months[second]]: 0,
    [Months[third]]: 0,
  };

  const totalRewards =
    transactions &&
    transactions.reduce((acc, { date, amount }) => {
      const month = new Date(date).getMonth();

      if (month === first) {
        acc[Months[first]] += getRewardsForSingleTransaction(amount);
      } else if (month === second) {
        acc[Months[second]] += getRewardsForSingleTransaction(amount);
      } else if (month === third) {
        acc[Months[third]] += getRewardsForSingleTransaction(amount);
      }

      return acc;
    }, rewards);

  return totalRewards;
};

/**
  Calculate rewards for a single transaction
  Business Logic: 2 points for every dollar spent over $100
  plus 1 point for every dollar spent between $50 and $100
  E.g, $120 = 2 * $20 + 1 * $50 = 90 points
 */
const getRewardsForSingleTransaction = (amount) => {
  let points = 0,
    purchased = amount;

  if (purchased > 100) {
    points += (purchased - 100) * POINT_TWO + 50 * POINT_ONE;
  } else if (50 < purchased && purchased <= 100) {
    points += (purchased - 50) * POINT_ONE;
  }
  return points;
};
