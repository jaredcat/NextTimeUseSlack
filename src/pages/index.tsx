import { useState } from "react";
import Main from "@templates";

const Home = () => {
  const [people, setPeople] = useState(20);
  const [salary, setSalary] = useState(100000);
  const [seconds, setSeconds] = useState(0);

  return (
    <Main
      seconds={seconds}
      people={people}
      salary={salary}
      setSeconds={setSeconds}
      setPeople={setPeople}
      setSalary={setSalary}
    />
  );
};

export default Home;
