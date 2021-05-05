import React from 'react';
import { render } from '@testing-library/react';
import Analysts from './Analysts';
import {
  MockOverview,
  MockAnalystsRecommendation,
} from '../../../analyser/APIMocks';

describe('Analysts', () => {
  test('display Analysts text', () => {
    const { queryByText } = render(
      <Analysts
        recommendations={MockAnalystsRecommendation}
        overview={MockOverview}
      />
    );
    expect(queryByText('analyser.details.analystsHeader')).toBeInTheDocument();
    expect(queryByText('analyser.details.analysts.target')).toBeInTheDocument();
  });
});
