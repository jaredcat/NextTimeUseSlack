import { useState } from "react";
import Main from "@templates";

const Home = () => {
  const [people, setPeople] = useState(20);
  const [salary, setSalary] = useState(100000);
  const [mins, setMins] = useState(0);

  return (
    <Main
      mins={mins}
      people={people}
      salary={salary}
      setMins={setMins}
      setPeople={setPeople}
      setSalary={setSalary}
    />
  );
};

export default Home;
