import { MODES } from "@constants";

export enum PARAM_STRINGS {
  PEOPLE = "p",
  SALARY = "s",
  TIME = "t",
  MODE = "mode",
  ZOOM = "z",
}

export const PARAM_BOUNDS = {
  [PARAM_STRINGS.PEOPLE]: { min: 0, max: 100_000 },
  [PARAM_STRINGS.SALARY]: { min: 0, max: 10_000_000 },
  [PARAM_STRINGS.TIME]: { min: 0, max: 1_000 },
} as const;

export const DEFAULTS = {
  [PARAM_STRINGS.PEOPLE]: 20,
  [PARAM_STRINGS.SALARY]: 100_000,
  [PARAM_STRINGS.TIME]: 30,
  [PARAM_STRINGS.MODE]: MODES.STATIC,
  [PARAM_STRINGS.ZOOM]: false,
} as const;

export interface State {
  [PARAM_STRINGS.PEOPLE]: number;
  [PARAM_STRINGS.SALARY]: number;
  [PARAM_STRINGS.TIME]: number;
  [PARAM_STRINGS.MODE]: MODES;
  [PARAM_STRINGS.ZOOM]: boolean;
}

const INVALID_PARAM_VALUES = new Set(["", "null", "undefined", "nan"]);

export const isValidNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const parseParamNumber = (
  raw: string | null,
  fallback: number,
  bounds: { min: number; max: number },
): number => {
  if (raw == null || INVALID_PARAM_VALUES.has(raw.trim().toLowerCase())) {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return clamp(Math.round(parsed), bounds.min, bounds.max);
};

export const parseModeParam = (raw: string | null): MODES => {
  const mode = raw?.trim().toUpperCase();
  if (mode && mode in MODES) {
    return MODES[mode as keyof typeof MODES];
  }
  return DEFAULTS[PARAM_STRINGS.MODE];
};

export const parseZoomParam = (raw: string | null): boolean => {
  if (raw == null) {
    return DEFAULTS[PARAM_STRINGS.ZOOM];
  }

  const normalized = raw.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "yes") {
    return true;
  }
  if (normalized === "0" || normalized === "false" || normalized === "no") {
    return false;
  }

  return DEFAULTS[PARAM_STRINGS.ZOOM];
};

export const resolveNumber = (
  next: number | null | undefined,
  current: number,
  fallback: number,
  bounds: { min: number; max: number },
): number => {
  let candidate = fallback;
  if (isValidNumber(next)) {
    candidate = next;
  } else if (isValidNumber(current)) {
    candidate = current;
  }

  return clamp(candidate, bounds.min, bounds.max);
};

export const getStateFromParams = (): State => {
  const params = new URLSearchParams(globalThis.location.search);

  return {
    [PARAM_STRINGS.PEOPLE]: parseParamNumber(
      params.get(PARAM_STRINGS.PEOPLE),
      DEFAULTS[PARAM_STRINGS.PEOPLE],
      PARAM_BOUNDS[PARAM_STRINGS.PEOPLE],
    ),
    [PARAM_STRINGS.SALARY]: parseParamNumber(
      params.get(PARAM_STRINGS.SALARY),
      DEFAULTS[PARAM_STRINGS.SALARY],
      PARAM_BOUNDS[PARAM_STRINGS.SALARY],
    ),
    [PARAM_STRINGS.TIME]:
      parseParamNumber(
        params.get(PARAM_STRINGS.TIME),
        DEFAULTS[PARAM_STRINGS.TIME],
        PARAM_BOUNDS[PARAM_STRINGS.TIME],
      ) * 60,
    [PARAM_STRINGS.MODE]: parseModeParam(params.get(PARAM_STRINGS.MODE)),
    [PARAM_STRINGS.ZOOM]: parseZoomParam(params.get(PARAM_STRINGS.ZOOM)),
  };
};

export const updateParams = (partial: Partial<State>): void => {
  const currentState = getStateFromParams();
  const people = resolveNumber(
    partial[PARAM_STRINGS.PEOPLE],
    currentState[PARAM_STRINGS.PEOPLE],
    DEFAULTS[PARAM_STRINGS.PEOPLE],
    PARAM_BOUNDS[PARAM_STRINGS.PEOPLE],
  );
  const salary = resolveNumber(
    partial[PARAM_STRINGS.SALARY],
    currentState[PARAM_STRINGS.SALARY],
    DEFAULTS[PARAM_STRINGS.SALARY],
    PARAM_BOUNDS[PARAM_STRINGS.SALARY],
  );
  const seconds = resolveNumber(
    partial[PARAM_STRINGS.TIME],
    currentState[PARAM_STRINGS.TIME],
    DEFAULTS[PARAM_STRINGS.TIME] * 60,
    {
      min: PARAM_BOUNDS[PARAM_STRINGS.TIME].min * 60,
      max: PARAM_BOUNDS[PARAM_STRINGS.TIME].max * 60,
    },
  );
  const mode =
    partial[PARAM_STRINGS.MODE] &&
    Object.values(MODES).includes(partial[PARAM_STRINGS.MODE])
      ? partial[PARAM_STRINGS.MODE]
      : currentState[PARAM_STRINGS.MODE];
  const zoom = partial[PARAM_STRINGS.ZOOM] ?? currentState[PARAM_STRINGS.ZOOM];

  const minutes = Math.round(seconds / 60);
  const newState = {
    [PARAM_STRINGS.PEOPLE]: people,
    [PARAM_STRINGS.SALARY]: salary,
    [PARAM_STRINGS.TIME]: minutes,
    [PARAM_STRINGS.MODE]: mode,
    [PARAM_STRINGS.ZOOM]: zoom ? 1 : 0,
  };

  const params = Object.entries(newState).map(
    ([key, value]) => `${key}=${encodeURIComponent(String(value))}`,
  );
  const newUrl = `${globalThis.location.pathname}?${params.join("&")}`;

  if (newState[PARAM_STRINGS.MODE] === currentState[PARAM_STRINGS.MODE]) {
    globalThis.history.replaceState(newState, "", newUrl);
  } else {
    globalThis.history.pushState(newState, "", newUrl);
  }
};
