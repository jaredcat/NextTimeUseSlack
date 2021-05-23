import { useState, useEffect, ReactElement, useRef } from "react";
import MainTemplate from "@templates";
import {
  updateParams,
  PARAM_STRINGS,
  State,
  getStateFromParams,
} from "@shared/params";
import { MODES } from "@constants";

const Home = (): ReactElement => {
  const prevState = useRef<State>({});
  const [people, setPeople] = useState<number>(20);
  const [salary, setSalary] = useState<number>(100000);
  const [seconds, setSeconds] = useState<number>(0);
  const [mode, setMode] = useState<MODES>(MODES.STATIC);

  useEffect(() => {
    const {
      [PARAM_STRINGS.PEOPLE]: initPeople,
      [PARAM_STRINGS.TIME]: initSeconds,
      [PARAM_STRINGS.MODE]: initMode,
      [PARAM_STRINGS.SALARY]: initSalary,
    }: State = getStateFromParams();
    setPeople(initPeople || 20);
    setSalary(initSalary || 100000);
    setSeconds(initSeconds || 0);
    setMode(initMode || MODES.STATIC);

    const popState = () => {
      const state = getStateFromParams();
      setMode(state.mode || MODES.STATIC);
      updateParams(state);
    };
    window.addEventListener("popstate", popState);

    return () => window.removeEventListener("popstate", popState);
  }, []);

  useEffect(() => {
    const currentState = {
      [PARAM_STRINGS.PEOPLE]: people,
      [PARAM_STRINGS.SALARY]: salary,
      [PARAM_STRINGS.TIME]: seconds,
      [PARAM_STRINGS.MODE]: mode,
    };

    const updateState: State = {};
    if (prevState.current[PARAM_STRINGS.PEOPLE] !== people)
      updateState[PARAM_STRINGS.PEOPLE] = people;
    if (prevState.current[PARAM_STRINGS.SALARY] !== salary)
      updateState[PARAM_STRINGS.SALARY] = salary;
    if (prevState.current[PARAM_STRINGS.TIME] !== Math.round(seconds / 60))
      updateState[PARAM_STRINGS.TIME] = seconds;
    if (prevState.current[PARAM_STRINGS.MODE] !== mode)
      updateState[PARAM_STRINGS.MODE] = mode;

    updateParams(updateState);
    prevState.current = currentState;
  }, [people, salary, seconds, mode]);

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
    />
  );
};

export default Home;
