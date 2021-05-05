import React from 'react';
import { List } from '@material-ui/core';
import RRpass from './RRpass';
import RRfail from './RRfail';

// DividendsRR props type declaration
type DividendsRRProps = {
  dividend: number;
  payoutRatio: number;
};

// Test props type declaration
type Test = {
  pass: boolean;
  category: string;
  passText: string;
  failText: string;
};

/**
 * @param dividend - latest dividend yield
 * @param payoutRatio - latest dividend payout ratio
 * @return Reward & Risk part in dividend section on detail page.
 */
const DividendsRR: React.FC<DividendsRRProps> = ({ dividend, payoutRatio }) => {
  const hasDividend: Test = {
    pass: dividend > 0,
    category: 'Dividend',
    passText: 'A dividend is paid',
    failText: 'No dividend is paid',
  };

  const aboveAverage: Test = {
    pass: dividend > 0.025,
    category: 'High Dividend',
    passText: 'Dividend is above average of 2.5%',
    failText: 'Dividend is below average of 2.5%',
  };

  const goodPayoutRatio: Test = {
    pass: payoutRatio > 0 && payoutRatio < 0.5,
    category: 'analyser.details.DividendPayoutRatio',
    passText: 'A good payout ratio is below 50%',
    failText:
      'The company is making loss and does not provide a good payout ratio',
  };

  const [tests, setTests] = React.useState<Test[]>([hasDividend]);
  React.useEffect(() => {
    if (dividend > 0) {
      setTests([hasDividend, aboveAverage, goodPayoutRatio]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividend]);

  return (
    <List>
      {
        // sort list by pass based on https://stackoverflow.com/a/17387454
        tests
          .sort((x, y) => {
            if (x.pass === y.pass) {
              return 0;
            }
            return x.pass ? 1 : -1;
          })
          // create pass or fail component
          .map((t) =>
            t.pass ? (
              <RRpass category={t.category} text={t.passText} key={t.category} />
            ) : (
              <RRfail category={t.category} text={t.failText} key={t.category}/>
            )
          )
      }
    </List>
  );
};
export default DividendsRR;
