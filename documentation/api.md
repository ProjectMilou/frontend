Orientate on Protfolio team: https://gist.github.com/an-p/3e5deef339f3eaf7d1858aa17b46301f

# Search Page


### `POST /search`
search list by NAME, ISIN, WKN

#### Request

| parameter | type     |
| --------- | -------- |
| `id`      | `string` |

#### Response

| parameter | type     |
| --------- | -------- |
| `stocks`  | `stock[]` |


response: list of stocks with searched name, ISIN, WKN

### `POST /filter`
search list by filters

#### Request

| parameter | type     |
| --------- | -------- |
| `country` | `string[]` |
| `currency`| `string[]` |
| `industry`| `string[]` |

#### Response

| parameter | type     |
| --------- | -------- |
| `stocks`      | `stock[]` |

response: list of stocks with searched by filters

### `GET /stocks/list`
List of stocks and their data, that can be later be filtered in the fronted based on the data

#### Response

| parameter          | type                      |description          |
| ------------------ | ------------------------- | ------------------- |
| `stocks`           | `stock[]`                 | List of stocks      |

#### `stock`

| parameter  | type          | description     |
| ---------- | ------------- | --------------- |
| `isin`     | `string`      |                 |
| `wkn`      | `string`      |                 |
| `symbol`   | `string`      | Ticker symbol   |
| `name`     | `string`      |                 |
| `price`    | `number` (FP) | Last price per share |
| `1d`       | `number` (FP) | 1 day return |
| `7d`       | `number` (FP) | 7 day return |
| `30d`      | `number` (FP) | 30 day return |
| `marketCap`| `number` (FP) | Market Capitalization in billion dollars|
| `analysTar`| `number` (FP) | Analyst target in dollars |
| `valuation`| `number` (FP) | Ratio comp to similar companies |
| `growth`   | `number` (FP) | Growth target in next 3 years |
| `div`      | `number` (FP) | Dividend yield |
| `currency` | `string`      |                 |
| `country`  | `string`      |                 |
| `industry` | `string`      |                 |
| `picture`  | `string`      | Link to picture source |
| `symbol`   | `string`      | Link to picture source |

<br/><br/>

# Analyser Page

### `GET /stock/overview`

#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|

#### Repsonse

Same as `stock` from seach page

| parameter  | type          | description     |
| ---------- | ------------- | --------------- |
| `isin`     | `string`      |                 |
| `wkn`      | `string`      |                 |
| `symbol`   | `string`      | Ticker symbol   |
| `name`     | `string`      |                 |
| `price`    | `number` (FP) | Last price per share |
| `1d`       | `number` (FP) | 1 day return |
| `7d`       | `number` (FP) | 7 day return |
| `30d`      | `number` (FP) | 30 day return |
| `marketCap`| `number` (FP) | Market Capitalization in billion dollars|
| `analysTar`| `number` (FP) | Analyst target in dollars |
| `valuation`| `number` (FP) | Ratio comp to similar companies |
| `growth`   | `number` (FP) | Growth target in next 3 years |
| `div`      | `number` (FP) | Dividend yield  |
| `currency` | `string`      |                 |
| `country`  | `string`      |                 |
| `industry` | `string`      |                 |
| `picture`  | `string`      | Link to picture source |

#### Errors

* `STOCK_ISIN_INVALID`


### `GET /stock/details`

#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|

#### Repsonse



### `GET /stock/charts/historic

Get the performance of the stock from beginning or last 5 years
#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|
| `max`     | `false`  | all data points if true, else only last 5 years|

#### Repsonse

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `dataPoints`| `dataPoint` | list of DataPoints|

`dataPoint`
| parameter | type     | description  |
| --------- | -------- | ------------ |
| `date` | `number` (Int) | day        |
| `close`| `number`(FP) | closing price of stock|


### `GET /stock/charts/key_figures`

Get the key figures of the stock from beginning or last 5 years
#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|
| `max`     | `false`  | all data points if true, else only last 5 years|

#### Repsonse

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `keyfigures`| `keyFigure[]` | list of keyFigures|

`keyFigure`
| parameter | type     | description  |
| --------- | -------- | ------------ |
| `date` | `number`(Int)| date        |
| `pte`| `number`(FP) | Price to Earnings Ratio|
| `ptb`| `number`(FP) | Price to Earnings Ratio|
| `ptg`| `number`(FP) | Price to Earning Growth Ratio|
| `eps`| `number`(FP) | Earnings per Share|


### `GET /stock/charts/dividend

Get the dividend of the stock from beginning or last 5 years
#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|
| `max`     | `false` | all data points if true, else only last 5 years|

#### Repsonse

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `dataPoints`| `dataPoints[]` | list of DataPoints|
| `date`    | `number`(Int) | next date for dividends|
| `quota`   | `number`(FP) | dividend payout ratio|

`dataPoint`
| parameter | type     | description  |
| --------- | -------- | ------------ |
| `date` | `number` (Int)| date        |
| `div`  | `number`(FP) | paid out dividend in dollars|


### `GET /stock/charts/analysts`

Get the analysts recommendation 
#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|

#### Repsonse

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `rating`| `rating[]` | List of Ratings|
| `averageGoal`| `number`(FP) | Average goal price of the stock |

`rating`
| parameter | type     | description  |
| --------- | -------- | ------------ |
| `date` | `number` (Int)| date when prediction was made|
| `goal`  | `number`(FP) | Stock goal in dollars|
| `strategy`  | `string` | Either buy, hold, or sell|
| `source`  | `string` | Link to source of rating|


### `GET /stock/news`

#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|

#### Repsonse

| parameter | type     |
| --------- | -------- |
| `news`      | `news[]` |

#### `news`

| parameter  | type          | description     |
| ---------- | ------------- | --------------- |
| `id`       | `number` (Int)|                 |
| `headline` | `string`      |  Headline of article   |
| `summary`  | `string`      |  First few words or sentences   |
| `url`      | `string`      |  URL to news source   |
