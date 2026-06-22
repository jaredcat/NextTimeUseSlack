import { MODES } from "@constants";
import {
  DEFAULTS,
  getStateFromParams,
  PARAM_STRINGS,
  type State,
  updateParams,
} from "@shared/params";
import MainTemplate from "@templates";
import { type ReactElement, useEffect, useRef, useState } from "react";

const defaultState: State = {
  [PARAM_STRINGS.PEOPLE]: DEFAULTS[PARAM_STRINGS.PEOPLE],
  [PARAM_STRINGS.SALARY]: DEFAULTS[PARAM_STRINGS.SALARY],
  [PARAM_STRINGS.TIME]: DEFAULTS[PARAM_STRINGS.TIME] * 60,
  [PARAM_STRINGS.MODE]: DEFAULTS[PARAM_STRINGS.MODE],
};

const Home = (): ReactElement | null => {
  const prevState = useRef<State>(defaultState);
  const skipUrlSync = useRef(true);
  const [isReady, setIsReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState(defaultState[PARAM_STRINGS.PEOPLE]);
  const [salary, setSalary] = useState(defaultState[PARAM_STRINGS.SALARY]);
  const [seconds, setSeconds] = useState(defaultState[PARAM_STRINGS.TIME]);
  const [mode, setMode] = useState<MODES>(defaultState[PARAM_STRINGS.MODE]);

  useEffect(() => {
    const state = getStateFromParams();
    setPeople(state[PARAM_STRINGS.PEOPLE]);
    setSalary(state[PARAM_STRINGS.SALARY]);
    setSeconds(state[PARAM_STRINGS.TIME]);
    setMode(state[PARAM_STRINGS.MODE]);
    prevState.current = state;
    setIsReady(true);
    setIsLoaded(true);

    const popState = () => {
      const nextState = getStateFromParams();
      setPeople(nextState[PARAM_STRINGS.PEOPLE]);
      setSalary(nextState[PARAM_STRINGS.SALARY]);
      setSeconds(nextState[PARAM_STRINGS.TIME]);
      setMode(nextState[PARAM_STRINGS.MODE]);
      prevState.current = nextState;
    };

    globalThis.addEventListener("popstate", popState);
    return () => globalThis.removeEventListener("popstate", popState);
  }, []);

  useEffect(() => {
    if (skipUrlSync.current) {
      skipUrlSync.current = false;
      return;
    }

    const currentState: State = {
      [PARAM_STRINGS.PEOPLE]: people,
      [PARAM_STRINGS.SALARY]: salary,
      [PARAM_STRINGS.TIME]: seconds,
      [PARAM_STRINGS.MODE]: mode,
    };

    const updateState: Partial<State> = {};
    if (prevState.current[PARAM_STRINGS.PEOPLE] !== people) {
      updateState[PARAM_STRINGS.PEOPLE] = people;
    }
    if (prevState.current[PARAM_STRINGS.SALARY] !== salary) {
      updateState[PARAM_STRINGS.SALARY] = salary;
    }
    if (prevState.current[PARAM_STRINGS.TIME] !== seconds) {
      updateState[PARAM_STRINGS.TIME] = seconds;
    }
    if (prevState.current[PARAM_STRINGS.MODE] !== mode) {
      updateState[PARAM_STRINGS.MODE] = mode;
    }

    if (Object.keys(updateState).length > 0) {
      updateParams(updateState);
    }

    prevState.current = currentState;
  }, [people, salary, seconds, mode]);

  const resetState = () => {
    setPeople(0);
    setSalary(0);
    setSeconds(0);
  };

  if (!isReady) {
    return null;
  }

  return (
    <MainTemplate
      mode={mode}
      people={people}
      salary={salary}
      seconds={seconds}
      setMode={setMode}
      setPeople={setPeople}
      setSalary={setSalary}
      setSeconds={setSeconds}
      resetState={resetState}
      isLoaded={isLoaded}
    />
  );
};

export default Home;
