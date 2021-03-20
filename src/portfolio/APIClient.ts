export type PortfolioOverview = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score?: number;
  modified: Date;
};

// TODO: Move mocks to test files once the APIClient is implemented

export const MockOverview: PortfolioOverview = {
  id: '1',
  name: 'test',
  virtual: true,
  positionCount: 3,
  value: 9,
  score: undefined,
  modified: new Date(),
};

export const MockOverviewTwo: PortfolioOverview = {
  id: '2',
  name: 'testTwo',
  virtual: false,
  positionCount: 4,
  value: 3,
  score: 20,
  modified: new Date(),
};

export async function portfolioOverview(
  token: string
): Promise<PortfolioOverview[]> {
  // TODO: implement API call
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([MockOverview, MockOverviewTwo]);
    }, 500)
  );
}
