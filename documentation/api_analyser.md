### `GET /stocks/list`

List of all stocks and their data. It should be possible, but not required, to send filters as paramters with this request and only receive stocks as response that match the filters.

#### Request

| parameter   | type       | description                                         |
| ----------- | ---------- | --------------------------------------------------- |
| `country?`  | `string[]` | possible filter of countries                        |
| `currency?` | `string[]` | possible filter of currencies                       |
| `industry?` | `string[]` | possible filter of industry                         |
| `mc?`       | `string`   | either small, medium or large market capitalization |

#### Response

| parameter | type      | description    |
| --------- | --------- | -------------- |
| `stocks`  | `stock[]` | List of stocks |

#### `stock`

| parameter   | type          | description                                      |
| ----------- | ------------- | ------------------------------------------------ |
| `isin`      | `string`      |                                                  |
| `wkn`       | `string`      |                                                  |
| `symbol`    | `string`      | Ticker symbol                                    |
| `name`      | `string`      |                                                  |
| `price`     | `number` (FP) | Last price per share                             |
| `per1d`     | `number` (FP) | 1 day performance                                |
| `per7d`     | `number` (FP) | 7 days performance                               |
| `per30d`    | `number` (FP) | 30 days performance                              |
| `per365d`   | `number` (FP) | 1 year performance                               |
| `marketCap` | `number` (FP) | Market Capitalization in billion dollars         |
| `analysTar` | `number` (FP) | Analyst target in dollars                        |
| `valuation` | `number` (FP) | Ratio comp to similar companies                  |
| `growth`    | `number` (FP) | Growth target in next 3 years                    |
| `div`       | `number` (FP) | Latest paid out dividend in percentage per share |
| `mc`        | `string`      | Either small, medium, large                      |
| `currency`  | `string`      |                                                  |
| `country`   | `string`      |                                                  |
| `industry`  | `string`      |                                                  |
| `picture`   | `string`      | Link to picture source                           |
| `date`      | `number`(Int) | Date when sources where updated last             |

<br/><br/>

# Analyser Page

### `GET /stock/overview`

#### Request

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

Same as `stock` from search page

#### Errors

- `STOCK_SYMBOL_INVALID`

### `GET /stock/details`

#### Request

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

all from alpha vantage company overview

### `GET /stock/charts/historic`

Get the performance of the stock from beginning or last 5 years

#### Request

| parameter | type      | description                                     |
| --------- | --------- | ----------------------------------------------- |
| `id`      | `string`  | SYMBOL of stock                                 |
| `max`     | `boolean` | all data points if true, else only last 5 years |

#### Repsonse

| parameter    | type          | description        |
| ------------ | ------------- | ------------------ |
| `dataPoints` | `dataPoint[]` | list of DataPoints |

`dataPoint`
| parameter | type | description |
| --------- | --------------- | ------------ |
| `date` | `number` (Int) | day |
| `close` | `number`(FP) | closing price of stock|

### `GET /stock/charts/key_figures`

Get the key figures of the stock from beginning or last 5 years

#### Request

| parameter | type     | description                                     |
| --------- | -------- | ----------------------------------------------- |
| `id`      | `string` | SYMBOL of stock                                 |
| `max`     | `false`  | all data points if true, else only last 5 years |

#### Repsonse

| parameter    | type          | description        |
| ------------ | ------------- | ------------------ |
| `keyfigures` | `keyFigure[]` | list of keyFigures |

`keyFigure`
| parameter | type | description |
| --------- | ----------------- | ------------ |
| `date` | `number`(Int) | date |
| `pte` | `number`(FP) | Price to Earnings Ratio|
| `ptb` | `number`(FP) | Price to Book Ratio|
| `ptg` | `number`(FP) | Price to Earning Growth Ratio|
| `eps` | `number`(FP) | Earnings per Share|

### `GET /stock/charts/dividend (DEPRECATED)`

Get the dividend of the stock from beginning or last 5 years

#### Request

| parameter | type     | description                                     |
| --------- | -------- | ----------------------------------------------- |
| `id`      | `string` | SYMBOL of stock                                 |
| `max`     | `false`  | all data points if true, else only last 5 years |

#### Repsonse

| parameter    | type           | description                                           |
| ------------ | -------------- | ----------------------------------------------------- |
| `dataPoints` | `dataPoints[]` | list of DataPoints                                    |
| `date`       | `number`(Int)  |  next date for dividends                              |
| `quota`      | `number`(FP)   |  dividend payout ratio (profit vs. paid out dividend) |

`dataPoint`
| parameter | type | description |
| --------- | --------------- | ------------ |
| `date` | `number` (Int) | date |
| `div` | `number`(FP) | paid out dividend in percentage per share|

### `GET /stock/charts/analysts`

Get the analysts recommendation

#### Request

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

| parameter     | type         | description                     |
| ------------- | ------------ | ------------------------------- |
| `rating`      | `rating[]`   | List of Ratings                 |
| `averageGoal` | `number`(FP) | Average goal price of the stock |

`rating`
| parameter | type | description |
| ------------- | ------------- | ------------ |
| `date` | `number` (Int)| date when prediction was made|
| `goal` | `number`(FP) | Stock goal in dollars|
| `strategy` | `string` | Either buy, hold, or sell|
| `source` | `URL` | Link to source of rating agency|
| `more Info?` | `TBD` | More Information, e.g. Future Growth|

### `GET /stock/news`

#### Request

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

| parameter | type     |
| --------- | -------- |
| `news`    | `news[]` |

#### `news`

| parameter  | type           | description                  |
| ---------- | -------------- | ---------------------------- |
| `id`       | `number` (Int) |                              |
| `headline` | `string`       | Headline of article          |
| `summary`  | `string`       | First few words or sentences |
| `url`      | `string`       | URL to news source           |

### `GET /stock/risk`

Get risk analysis

#### Request

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

| parameter     | type        | description                                   |
| ------------- | ----------- | --------------------------------------------- |
| `rewards`     | `string[]`  | List of Rewards                               |
| `risks`       | `string[]`  | List of Risks                                 |
| `risk_checks` | `boolean[]` | A list of risk checks, as in simpy Wallstreet |

### `GET /stock/balanceSheet`

| parameter | type     | description     |
| --------- | -------- | --------------- |
| `id`      | `string` | SYMBOL of stock |

#### Repsonse

balance sheet of the stock, as in alpha vantage https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo
