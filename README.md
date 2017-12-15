# EMAKINA React CLI

An easy to use CLI for starting and building React projects in a fast and consistent way.

[![npm version](https://badge.fury.io/js/emakina-react-cli.svg)](http://badge.fury.io/js/emakina-react-cli)

The EMAKINA React CLI is built on top of react-scripts used by 
[Create React App](https://github.com/facebookincubator/create-react-app).  
This way you can utilize all the awesome features of create-react-app.

In addition you have access to some even more awesome features like
+ [File Generators](https://github.com/emakina-cee-oss/react-cli#file-generators)
+ Built in SCSS support
+ Flexible ESLint configuration via .eslintrc file
+ Easy state and side effects management with [CerebralJS](https://cerebraljs.com/)
+ [Adjustable webpack config](https://github.com/emakina-cee-oss/react-cli#change-webpack-config)





## Getting started

__1. Install the CLI__
```sh
npm install -g emakina-react-cli
```

__2. Create a new Project__
```sh
react new <projectName>
```

__3. Take off__
```sh
cd <projectName>
npm start
```

> Also have a look to the [Create React App](https://github.com/facebookincubator/create-react-app) 
documentation for more information.





## File Generators

To add new parts to your app simply tell your console what you need.
```sh
react generate <scaffold> <name> [module]
```

*As a shorthand you can type:*
```sh
react g <scaffold> <name> [module]
```

Scaffold   | Usage
---        | ---
Component  | `react g component <AwesomeComponent>`
Module     | `react g module <AwesomeModule>`
Service    | `react g service <AwesomeService>`
Signal     | `react g signal <awesomeSignal> [<ModuleName>]`
Action     | `react g action <awesomeAction> [<ModuleName>]`
Factory    | `react g factory <awesomeFactory> [<ModuleName>]`
Compute    | `react g compute <awesomeCompute> [<ModuleName>]`

If the `ModuleName` is the files are created in the folder of the desired module. 
If the `ModuleName` is omitted the files will be created in a shared folder.

### Some Comfortable Convenience
As the CLI's main intend is to help you save time while being consistent,
it is built to only write the necessary things.

So `react g signal foo bar` will still generate `fooSignal` in the module folder `Bar`.



### Component
```sh
react g component ComponentName
```

Spawns the following Files:
+ `src/components/ComponentName/ComponentName.js`
+ `src/components/ComponentName/ComponentName.scss`
+ `src/components/ComponentName/ComponentName.spec.js`

__Options__
+ `-c` or `--connect` (Connect a Component to Cerebral)
+ `-s` or `--stateful` (Generate a Stateful Component)

__Variable Path__  
By default, components are created in the components folder of the project.  
It is possible to create them in different locations like shown in the examples below.

```sh
react g component somewhere/ComponentName
```
Will result in `src/components/somewhere/ComponentName/ComponentName.js`.

```sh
react g component ./containers/ComponentName
```
Will result in `src/containers/ComponentName/ComponentName.js`.



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



### Signal
```sh
react g signal awesomeSignal SomeModule
```

Spawns the following Files:
+ `src/modules/SomeModule/signals/awesomeSignal.js`
+ `src/modules/SomeModule/signals/awesomeSignal.spec.js`



### Action
```sh
react g action awesomeAction SomeModule
```

Spawns the following Files:
+ `src/modules/SomeModule/actions/awesomeAction.js`
+ `src/modules/SomeModule/actions/awesomeAction.spec.js`



### Factory
```sh
react g factory awesomeFunctionFactory SomeModule
```

Spawns the following Files:
+ `src/modules/SomeModule/factory/awesomeFunctionFactory.js`
+ `src/modules/SomeModule/factory/awesomeFunctionFactory.spec.js`



### Compute
```sh
react g compute awesomeCompute SomeModule
```

Spawns the following Files:
+ `src/modules/SomeModule/computes/awesomeCompute.js`
+ `src/modules/SomeModule/computes/awesomeCompute.spec.js`




## Project Structure
There is a `public` folder for static files and a `src` folder for the fancy app code.

Inside the `src` folder three main sections can be found. Components are located 
in the `components` folder each component has its own folder which contains all resources
used by the component.

The `shared` folder is for code which is shared and can be consumed from many components and other
parts of the app. Like utility functions, services etc.

As Cerebral is used for state and side effects management the `modules` folder is introduced 
to split Cerebral's state into modules. Therefore each module has its own folder 
which contains signals, actions, computes, and so on.

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
            |-signals
                |-exampleSignal.js
                |-exampleSignal.spec.js
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
        |-signals
            |-exampleSignal.js
            |-exampleSignal.spec.js
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





## Change Webpack Config
With the help of react-app-rewired it is very easy to
extend or adjust the webpack config used by the underlying react-scripts.

Simply add a new rewire file inside the `config` folder and import it to `config-overrides.js`.

For Detailed information have a closer look to the documentation of
[react-app-rewired](https://github.com/timarney/react-app-rewired).





## Styles (SCSS)
By default, the support for SCSS is enabled.  
Just import a .scss file into your component and Webpack will do the job.

### Variables and Tools
Variables, Settings and tools which can be used by all components are placed in `./src/scss`.

If you add new files, add an import to _base-imports.scss which then gets imported by
a components SCSS file to get access to all settings and tools.

### SASS MQ
To work with Media Queries [SASS-MQ](https://github.com/sass-mq/sass-mq) is included.
The breakpoints are configured in `./src/scss/settings/_settings.breakpoints.scss`.





## How to Contribute
We really appreciate every contribution, so if you have some cool ideas have a look to the 
[Contributing Guidelines](https://github.com/emakina-cee-oss/react-cli/blob/master/CONTRIBUTING.md).
