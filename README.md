# backend

## Getting started:
1. Make sure below configurations are made in environment variables or .env file
2. Make sure the database specified (`DB_NAME`) exists and is accessible by the given user (and the user has the correct password)
3. Run `npm install` (first time and any time modules might have updated)
4. Run `npm start` (this will generate the database and then run the server)
5. If not already there run query for any required initial data

## Configurations
* Configurations are read from an environement variables in: src\configurations.ts
* These environment can be set by the system or by a .env file located at the root of this project (gitignored), .env expects keyvalue pairs with no space (i.e. `SERVER_PORT=8080`)
* You can not include or leave these values blank to get default values

### Available configurations

#### Environment
| Environment variable | Description | Default value |
| --- | --- | --- |
| NODE_ENV | This is a standard environment variable which will make libraries behave differently (i.e. express). If set to `production` our application will be less verbose about error responses |  |

#### Server
| Environment variable | Description | Default value |
| --- | --- | --- |
| SERVER_PORT | The port the server listens for requests on | 3000 |
| SERVER_BASE_PATH | The prefix for all path (i.e. `/rederly/api` | /backend-api |

##### Limiter
| Environment variable | Description | Default value |
| --- | --- | --- |
| SERVER_LIMITER_WINDOW_LENGTH | The window in which the max requests are allowed to be made (provided in milliseconds) | 60000 (ms, which is 1 minute) |
| SERVER_LIMITER_MAX_REQUESTS | The amount of requests that a single client is allowed to make in the above window | 100 |


#### Database
| Environment variable | Description | Default value |
| --- | --- | --- |
| DB_HOST | The host url for the database | localhost |
| DB_NAME | The name of the database | rederly |
| DB_USER | The user the login to the database | postgres |
| DB_PASSWORD | The password for the user to login to the database | password |
| DB_LOGGING | Whether or not queries should be output, used for debugging | false |

#### Email
| Environment variable | Description | Default value |
| --- | --- | --- |
| EMAIL_ENABLED | Whether or not emails should be sent (for dev this should be false | false |
| EMAIL_USER | The user used for authentication for sending emails (the sendgrid username) | sendgriduser |
| EMAIL_KEY | The password for the user for sending emails (the sendgrid password) | sendgridpassword |
| EMAIL_FROM | The email address that will be sending the email | verifiedsendgridemail |

#### Auth
| Environment variable | Description | Default value |
| --- | --- | --- |
| AUTH_SESSION_LIFE | The number of hours a session token is good for | 24 |
| AUTH_COST_FACTOR | The cost factor for bcrypt to hash the password (this is important for preventing brute force attacks as it makes the hash take time to calculate) | 8 |
| AUTH_TOKEN_LIFE | The default value for all other auth tokens | 1440 |
| AUTH_FORGOT_PASSWORD_TOKEN_LIFE | The amount of time you have to claim forgot password token | AUTH_TOKEN_LIFE=1440 |
| AUTH_VERIFY_INSTUTIONAL_EMAIL_TOKEN_LIFE | The amount of time you have to claim email verification | AUTH_TOKEN_LIFE=1440 |

#### Renderer
| Environment variable | Description | Default value |
| --- | --- | --- |
| RENDERER_URL | The base url for the renderer | http://localhost:3000 |

#### Jira
| Environment variable | Description | Default value |
| --- | --- | --- |
| JIRA_EMAIL | The email used to authenticate with jira | |
| JIRA_API_KEY | The api key used to authenticate with jira | |
| JIRA_HOST | Where jira is hosted (currently cloud) | rederly.atlassian.net |
| JIRA_PROTOCOL | Protocol to use | https |
| JIRA_STRICT_SSL | Enforce ssl | true |
| JIRA_API_VERSION | API version | 2 |
| JIRA_PROJECT_KEY | The project to add tickets to (currently `Rederly Support`)| RS |