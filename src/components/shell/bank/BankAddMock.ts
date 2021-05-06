import IBank from '../../../services/models/bank/IBank';

const mockResponse = {
  banks: [
    {
      id: 10081,
      name: 'GAD Test',
      blz: '49999924',
      location: 'DE',
      city: 'DE',
      isTestBank: true,
      popularity: 0,
      interfaces: ['WEB_SCRAPER'],
      loginCredentials: [
        { label: 'testlabel', isSecret: true, isVolatile: true },
      ],
      properties: 'REDIRECT_APPROACH',
      health: 2,
    },
  ] as IBank[],
};

export default mockResponse;
