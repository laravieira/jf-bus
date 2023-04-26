# JF Bus App
The Juiz de Fora first app to let you recharge your Bilhete Único card on your phone.

See the bus schedules of Juiz de Fora.

## How to run the app locally
#### Install packages
```shell
yarn install:app
```

#### How to build `.dev.apk` online
###### Needs to prepare online environment first, check [here](#how-to-prepare-environment-for-online-build)
```shell
yarn android:build:dev:online
```

#### How to build `.preview.apk` online
###### Needs to prepare online environment first, check [here](#how-to-prepare-environment-for-online-build)
```shell
yarn android:build:preview:online
```

#### How to build `.dev.apk` locally
###### Has to be in a Linux environment (tested on Ubuntu WSL2)
###### Needs to prepare build environment first, check [here](#how-to-prepare-environment-for-local-build)
```shell
set ANDROID_HOME=[android sdk path]
yarn android:build:dev
```

#### How to run dev server locally
```shell
yarn android:dev:server
```

#### How to build `.preview.apk` locally
###### Has to be in a Linux environment (tested on Ubuntu WSL2)
###### Needs to prepare build environment first, check [here](#how-to-prepare-environment-for-local-build)
```shell
set ANDROID_HOME=[android sdk path]
yarn android:build:preview
```

### How to prepare environment for local build
###### Has to be in a Linux environment
###### This is designed for Ubuntu on WSL2
```shell
yarn eas:login
yarn eas:configure
yarn android:build:install
```

### How to prepare environment for online build
```shell
yarn eas:login
yarn eas:configure
```

## Scheduler Extractor
This is a script to extract the bus schedules from the [PJF website](https://www.pjf.mg.gov.br/onibus/itinerario/index.php) and save it to JSON files.
### The extracted data
* The last extracted data is at [scheduler/data](scheduler/data).
* The data models are at [scheduler/src/models](scheduler/src/models).

#### How to install
```shell
yarn install:scheduler
```
#### How to run
```shell
yarn scheduler:start
```
#### How to test
```shell
yarn scheduler:test
```