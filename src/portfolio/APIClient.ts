export type PortfolioOverview = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score?: number;
  perf7d: number;
  perf1y: number;
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
  perf7d: -1.23,
  perf1y: 13.37,
  modified: new Date(),
};

export const MockOverviewTwo: PortfolioOverview = {
  id: '2',
  name: 'testTwo',
  virtual: false,
  positionCount: 4,
  value: 3,
  score: 20,
  perf7d: 0,
  perf1y: -1,
  modified: new Date(),
};

export async function portfolioOverview(
  token: string // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<PortfolioOverview[]> {
  // TODO: implement API call
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([MockOverview, MockOverviewTwo]);
    }, 500)
  );
}
