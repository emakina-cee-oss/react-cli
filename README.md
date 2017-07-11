# EMAKINA React CLI

[![npm version](https://badge.fury.io/js/emakina-react-cli.svg)](http://badge.fury.io/js/emakina-react-cli)

The EMAKINA React CLI is built on top of react-scripts used by 
[Create React App](https://github.com/facebookincubator/create-react-app).
This way you can utilize all the awesome features of create-react-app.

In addition you have access to some even more awesome features like
[File Generators](https://github.com/emakina-cee-oss/react-cli#file-generators).


## Getting started

### 1. Install the CLI
```sh
npm install -g emakina-react-cli
```

### 2. Create a new Project
```sh
react new <projectName>
```

The command above will bootstrap a new project in a new directory relative to the path you are in.
Without any option the [Basic Setup](https://github.com/emakina-cee-oss/react-cli#basic-setup)
will be used.

To bootstrap a new project ready to build a Single Page Application you can enable the 
[SPA Setup](https://github.com/emakina-cee-oss/react-cli#spa-setup) 
by adding the option flag `--spa` 

To use [Yarn](https://yarnpkg.com/en/) in addition to NPM simply add the option flag `--yarn`.

### 3. Take off
```sh
cd <projectName>
npm start
```

> Also have a look to the [Create React App](https://github.com/facebookincubator/create-react-app) 
documentation for more information.


## Basic Setup
The basic setup simply provides a ready to go project structure for React
without any fancy additions.


## SPA Setup
For Single Page Applications [Cerebral](http://cerebraljs.com/docs/introduction/) 
is added to the stack to provide route, state management etc.


## Project Structure
There is a `public` folder for static files and a `src` folder for the fancy app code.

Inside the `src` folder three main sections can be found. Components are encapsulated 
in the `components` folder each component has it's own folder which contains all resources
used by the component.

The `shared` folder is for code which is shared and can be consumed from many components and other
parts of the app.
Like services and helper functions etc.

As Cerebral is used for the SPA-Setup the `modules` folder is introduced to split Cerebral's signals
and state into modules. Therefore each module has it's own folder which contains actions, computes,
and factories. If there are e.g. actions used in multiple modules those are moved to the `shared` 
folder.

```
|-public
    |-index.html
    |-manifest.json
|-src
    |-components 
        |-App 
            |-App.js
            |-App.spec.js
            |-App.scss
            |-images
                |-logo.svg
    |-modules 
        |-App
            |-actions
                |-exampleAction.js
                |-exampleAction.spec.js
            |-computes
                |-exampleCompute.js
                |-exampleCompute.spec.js
            |-factories
                |-exampleFactory.js
                |-exampleFactory.spec.js
            |-AppModule.js
            |-AppModule.spec.js
    |-shared
        |-actions
            |-exampleAction.js
            |-exampleAction.spec.js
        |-computes
            |-exampleCompute.js
            |-exampleCompute.spec.js
        |-factories
            |-exampleFactory.js
            |-exampleFactory.spec.js
        |-services
            |-exampleService.js
            |-exampleService.spec.js
        |-providers
            |-exampleProvider.js
            |-exampleProvider.spec.js
    |-index.js
    |-index.css
    |-controller.js 
```


## Styles (SCSS)
By default the support for SCSS is enabled and we recommend to use it.

Just add a .scss instead of a .css file for your components.
The SCSS files are watched and compiles to a CSS file right next to it.
As components still import the CSS all the styles will be part of the application.

### Variables and Tools
Variables, Settings and tools which can be used by all components are placed in `./src/scss`.

If you add new files add an import to _base-imports.scss which then gets imported by
a components SCSS file to get access to all settings and tools.

### SASS MQ
To work with Media Queries [SASS-MQ](https://github.com/sass-mq/sass-mq) is included.
The breakpoints are configured in `./src/scss/settings/_settings.breakpoints.scss`.



## File Generators
To quickly add new parts to your app like components modules etc. the syntax to you can use is
```sh
react generate <scaffold> <name> [module]
```
*As a shorthand you can type the command above as:*
```sh
react g <scaffold> <name> [module]
```


Scaffold  | Usage
---       | ---
[Component](https://github.com/emakina-cee-oss/react-cli/wiki) | `react g component AwesomeComponent`
[Module](https://github.com/emakina-cee-oss/react-cli/wiki)    | `react g module AwesomeModule`
[Service](https://github.com/emakina-cee-oss/react-cli/wiki)   | `react g service AwesomeService`
[Action](https://github.com/emakina-cee-oss/react-cli/wiki)    | `react g action awesomeAction SomeModule`
[Factory](https://github.com/emakina-cee-oss/react-cli/wiki)   | `react g factory awesomeFactory SomeModule`
[Compute](https://github.com/emakina-cee-oss/react-cli/wiki)   | `react g compute awesomeCompute SomeModule`

See the following examples for more detail.

### Component
```sh
react g component ComponentName
```
_Options_
+ --connect (Connect the Component to the Cerebral Controller)
+ --class (Generate a Component in ES6 Class Syntax)

Spawns the following Files:
+ `src/components/ComponentName/ComponentName.js`
+ `src/components/ComponentName/ComponentName.scss`
+ `src/components/ComponentName/ComponentName.spec.js`

### Service
```sh
react g service AwesomeService
```
Spawns the following Files:
+ `src/shared/services/AwesomeService.js`
+ `src/shared/services/AwesomeService.spec.js`

### Module
```sh
react g module AwesomeModule
```
Spawns the following Files:
+ `src/modules/Awesome/AwesomeModule.js`
+ `src/modules/Awesome/AwesomeModule.spec.js`

### Action
```sh
react g action awesomeAction SomeModule
```
If the module is omitted the action will be created in the shared folder.

If there is a module given which does not yet exist you will be asked to create
the module right away.

Spawns the following Files:
+ `src/modules/SomeModule/actions/awesomeAction.js`
+ `src/modules/SomeModule/actions/awesomeAction.spec.js`

### Factory
```sh
react g factory awesomeFunctionFactory SomeModule
```
If the module is omitted the action will be created in the shared folder.

If there is a module given which does not yet exist you will be asked to create
the module right away.

Spawns the following Files:
+ `src/modules/SomeModule/factory/awesomeFunctionFactory.js`
+ `src/modules/SomeModule/factory/awesomeFunctionFactory.spec.js`

### Compute
```sh
react g compute awesomeCompute SomeModule
```
If the module is omitted the action will be created in the shared folder.

If there is a module given which does not yet exist you will be asked to create
the module right away.

Spawns the following Files:
+ `src/modules/SomeModule/computes/awesomeCompute.js`
+ `src/modules/SomeModule/computes/awesomeCompute.spec.js`


## How to Contribute
We really appreciate every contribution, so if you have some cool ideas have a look to the 
[Contributing Guidelines](https://github.com/emakina-cee-oss/react-cli/blob/master/CONTRIBUTING.md).
