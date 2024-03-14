const moneyConverter = (v: number | null | string) => {
  console.log(typeof v, v);
  if (typeof v == "string") {
    return v;
  } else if (v !== null) {
    return "$" + v.toFixed(2);
  }
};

export default moneyConverter;
