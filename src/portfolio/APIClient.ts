export type PortfolioOverview = {
  id: string;
  name: string;
  virtual: boolean;
  positionCount: number;
  value: number;
  score?: number;
  modified: Date;
};

export const MockOverview: PortfolioOverview = {
  id: '1',
  name: 'test',
  virtual: true,
  positionCount: 3,
  value: 9,
  score: undefined,
  modified: new Date()
}

export const MockOverviewTwo: PortfolioOverview = {
  id: '2',
  name: 'testTwo',
  virtual: false,
  positionCount: 4,
  value: 3,
  score: 20,
  modified: new Date()
}
