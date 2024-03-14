const moneyConverter = (v: number | null | string) => {
  console.log(typeof v, v);
  if (typeof v == "string") {
    console.log(v, "fell111111111");
    return v;
  } else if (v !== null) {
    console.log(v, "fell222222222222");
    return "$" + v.toFixed(2);
  }
};

export default moneyConverter;
