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
| `div`      | `number` (FP) | Dividend yield |
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



### `GET /stock/charts`

#### Request

| parameter | type     | description  |
| --------- | -------- | ------------ |
| `id`      | `string` | ISIN of stock|

#### Repsonse



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
