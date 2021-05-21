import { number, func } from "prop-types";
import { useEffect } from "react";

const Timer = ({ burnRate, seconds, setSeconds }) => {
  const total = (burnRate * seconds) / 60;

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [setSeconds]);

  return <>{total}</>;
};

Timer.propTypes = {
  burnRate: number.isRequired,
  seconds: number,
  setSeconds: func.isRequired,
};

Timer.defaultProps = {
  seconds: 0,
};

export default Timer;
