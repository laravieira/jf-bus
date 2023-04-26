## How to run the app locally
#### Install packages
```shell
yarn
```

#### How to build `.dev.apk` online
* Needs to prepare online environment first, check [here](#how-to-prepare-environment-for-online-build)
```shell
yarn android:build:dev:online
```

#### How to build `.preview.apk` online
* Needs to prepare online environment first, check [here](#how-to-prepare-environment-for-online-build)
```shell
yarn android:build:preview:online
```

#### How to build `.dev.apk` locally
* Has to be in a Linux environment (tested on Ubuntu WSL2)
* Needs to prepare build environment first, check [here](#how-to-prepare-environment-for-local-build)
```shell
set ANDROID_HOME=[android sdk path]
yarn android:build:dev
```

#### How to run dev server locally
```shell
yarn android:dev:server
```

#### How to build `.preview.apk` locally
* Has to be in a Linux environment (tested on Ubuntu WSL2)
* Needs to prepare build environment first, check [here](#how-to-prepare-environment-for-local-build)
```shell
set ANDROID_HOME=[android sdk path]
yarn android:build:preview
```

#### How to test
```shell
yarn test
```

### How to prepare environment for local build
* Has to be in a Linux environment
* This is designed for Ubuntu on WSL2
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
