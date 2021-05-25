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
  small: {
    mediaQuery: "550px",
    lineHeight: "1.5rem",
    fontSize: "1.5rem",
    buttonFontSize: "0.8rem",
  },
};

export const MINS_A_YEAR = 125220; // 2087 annual working hours

export enum MODES {
  STATIC = "static",
  TIMER = "timer",
}

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
