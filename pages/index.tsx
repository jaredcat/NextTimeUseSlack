import { HighlightedText } from '../shared/styles'
import { useState } from 'react';
import DiscreetInput from '@atoms/discreetInput';

const MINS_A_YEAR = 525600;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Home = () => {
  const [people, setPeople] = useState(20);
  const [salary, setSalary] = useState(100000);
  const [mins, setMins] = useState(30);


  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = burnMin * mins;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);


  return <div>
    <DiscreetInput name="people" min={0} max={99999} value={people.toString()} setValue={setPeople} /> people
    at <DiscreetInput  name="salary" min={0} max={10000000} stepSize={1000} format={true} value={salary.toString()} setValue={setSalary}/> a year
    for <DiscreetInput name="mins" min={0}  max={999} value={mins.toString()} setValue={setMins} /> <HighlightedText>MINS</HighlightedText>
    {' '}BURNS <HighlightedText>{burnTotalPretty}</HighlightedText>{' '}
     at <HighlightedText>{burnMinPretty}</HighlightedText> a min
  </div>
}

export default Home
