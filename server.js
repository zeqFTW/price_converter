const axios = require("axios");

const convertCurrencies = (endpoint, from, to, amount, apiKey) => {
  let len;
  const supportedCurrencies = [
    "USD",
    "JPY",
    "GBP",
    "EUR",
    "CAD",
    "AUD",
    "SEK",
    "SGD",
    "MXN",
    "NZD",
    "DKK",
    "BRL",
    "NOK",
    "HKD",
    "CLP",
    "THB",
    "ZAR",
    "INR",
    "COP",
  ];
  const isOk =
    supportedCurrencies.includes(from) && supportedCurrencies.includes(to);
  if (!isOk) return 0;
  else {
    axios
      .get(
        "https://api.exchangeratesapi.io/v1/" +
          endpoint +
          "?access_key=" +
          apiKey +
          "&from=" +
          from +
          "&to=" +
          to +
          "&amount=" +
          amount
      )
      .then((response) => {
        console.log(response);
        len = (response.result + "").replace(".", "").length;

        if (len === 2 || len === 3) return Math.ceil(response.result) - 0.01;

        if (len === 5) {
          const firstTwo4 = Math.floor(response.result / 100);
          const thirdDigit4 =
            Math.floor(((response.result / 10) % 10) + 1) * 10;
          return firstTwo4 + "" + thirdDigit4;
        }

        if (len === 5) {
          const firstTwo5 = Math.floor(response.result / 1000);
          const thirdDigit5 =
            Math.floor(((response.result / 100) % 10) + 1) * 100;
          return firstTwo5 + "" + thirdDigit5;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

convertCurrencies(
  "convert",
  "USD",
  "EUR",
  25,
  "qKnpbvxG1lK6JWaqCouZ4S3pUDYZD9xq"
);
