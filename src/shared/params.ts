import { MODES } from "@constants";

export enum PARAM_STRINGS {
  PEOPLE = "p",
  SALARY = "s",
  TIME = "t",
  MODE = "mode",
}

export interface State {
  [PARAM_STRINGS.PEOPLE]?: number | null;
  [PARAM_STRINGS.SALARY]?: number | null;
  [PARAM_STRINGS.TIME]?: number | null;
  [PARAM_STRINGS.MODE]?: MODES;
}

export const getStateFromParams = (): State => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get(PARAM_STRINGS.MODE)?.toUpperCase();
  const peopleParam = params.get(PARAM_STRINGS.PEOPLE);
  const salaryParam = params.get(PARAM_STRINGS.SALARY);
  const timeParam = params.get(PARAM_STRINGS.TIME);

  return {
    [PARAM_STRINGS.PEOPLE]: peopleParam ? Number(peopleParam) : null,
    [PARAM_STRINGS.SALARY]: salaryParam ? Number(salaryParam) : null,
    [PARAM_STRINGS.TIME]: timeParam ? Number(timeParam) * 60 : null,
    [PARAM_STRINGS.MODE]: mode ? MODES[mode] : MODES.STATIC,
  };
};

const findValidNumber = (newNum: number, oldNum: number): number => {
  if (newNum || newNum === 0) return newNum;
  return oldNum;
};

export const updateParams = (state: State): void => {
  const currentLocation = window.location;
  const currentState: State = getStateFromParams();
  const newState = {
    [PARAM_STRINGS.PEOPLE]: findValidNumber(
      state?.[PARAM_STRINGS.PEOPLE],
      currentState[PARAM_STRINGS.PEOPLE],
    ),
    [PARAM_STRINGS.SALARY]: findValidNumber(
      state?.[PARAM_STRINGS.SALARY],
      currentState[PARAM_STRINGS.SALARY],
    ),
    [PARAM_STRINGS.TIME]: Math.round(
      findValidNumber(
        state?.[PARAM_STRINGS.TIME],
        currentState[PARAM_STRINGS.TIME],
      ) / 60,
    ),
    [PARAM_STRINGS.MODE]:
      state?.[PARAM_STRINGS.MODE] || currentState[PARAM_STRINGS.MODE],
  };

  let newUrl = `${currentLocation.pathname}`;
  const params = [];
  Object.entries(newState).forEach((entry) => {
    params.push(`${entry[0]}=${encodeURIComponent(entry[1])}`);
  });
  if (params.length > 0) {
    newUrl += `?${params.join("&")}`;
  }

  if (newState.mode !== currentState.mode) {
    window.history.pushState(newState, "", newUrl);
  } else {
    window.history.replaceState(newState, "", newUrl);
  }
};
