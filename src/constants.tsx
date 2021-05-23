export const colors = {
  white: "#ffffff",
  primary: "#a5b4ff",
  highlighted: "#ffffff",
  background: "#374795",
};

export const sizes = {
  lineHeight: "2rem",
  fontSize: "2rem",
  buttonFontSize: "1rem",
};

export const MINS_A_YEAR = 525600;

export enum MODES {
  STATIC = "static",
  TIMER = "timer",
}

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
