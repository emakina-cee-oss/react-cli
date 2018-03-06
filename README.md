# EMAKINA React CLI

An easy to use CLI for building React projects in a fast and consistent way.

[![Build Status](https://travis-ci.org/emakina-cee-oss/react-cli.svg?branch=master)](https://travis-ci.org/emakina-cee-oss/react-cli)
[![npm version](https://badge.fury.io/js/emakina-react-cli.svg)](http://badge.fury.io/js/emakina-react-cli)

The EMAKINA React CLI is built on top of [Create React App](https://github.com/facebookincubator/create-react-app).
  
This way you can utilize all the awesome features of create-react-app
and in addition you have access to some even more awesome features like
+ [File Generators](#file-generators)
+ Built in SCSS support
+ Flexible ESLint configuration via .eslintrc file
+ Easy state and side effects management with [CerebralJS](https://cerebraljs.com/)
+ [Adjustable webpack config](#change-webpack-config) (without eject)
+ [Styleguide](#styleguide)




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

Scaffold   | Usage                                             |
-----------|---------------------------------------------------|
Component  | `react g component <AwesomeComponent>`            |
Container  | `react g container <AwesomeContainer>`            |
Module     | `react g module <AwesomeModule>`                  |
Signal     | `react g signal <awesomeSignal> [<ModuleName>]`   |
Action     | `react g action <awesomeAction> [<ModuleName>]`   |
Factory    | `react g factory <awesomeFactory> [<ModuleName>]` |
Compute    | `react g compute <awesomeCompute> [<ModuleName>]` |

If the `ModuleName` is added the files are created in the folder of the desired module.
If the `ModuleName` is omitted the files will be created in the shared folder.

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
+ `src/components/ComponentName/ComponentName.module.scss`
+ `src/components/ComponentName/ComponentName.spec.js`
+ `src/components/ComponentName/ComponentName.md`

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
react g component ./fancyComponents/ComponentName
```
Will result in `src/fancyComponents/ComponentName/ComponentName.js`.



### Container
```sh
react g container ContainerName
```

Spawns the following Files:
+ `src/containers/ContainerName/ContainerName.js`
+ `src/containers/ContainerName/ContainerName.spec.js`

__Options__
+ `-c` or `--connect` (Connect a Component to Cerebral)
+ `-s` or `--stateful` (Generate a Stateful Component)

__Variable Path__  
By default, containers are created in the containers folder of the project.  
It is possible to create them in different locations like shown in the examples below.

```sh
react g container somewhere/ContainerName
```
Will result in `src/containers/somewhere/ContainerName/ContainerName.js`.

```sh
react g container ./fancyContainers/ContainerName
```
Will result in `src/fancyContainers/ContainerName/ContainerName.js`.



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

As CerebralJS is used for state and side effects management the `modules` folder is introduced 
to split Cerebral's state into modules. Therefore each module has its own folder 
which contains signals, actions, computes, and so on.

```
|-public
    |-index.html
|-src
    |-components 
        |-Button
            |-Button.js
            |-Button.md
            |-Button.module.scss
            |-Button.spec.js
    |-containers 
        |-App 
            |-App.js
            |-App.spec.js
    |-modules 
        |-Root
            |-RootModule.js
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
    |-styles
        |-modules
            |-flex.module.scss
        |-settings
            |-_settings.breakpoints.scss
            |-_settings.colors.scss
        |-tools
            |-_tools.units.scss
        |-_essentials.scss
        |-global.scss
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
        |-providers
            |-exampleProvider.js
            |-exampleProvider.spec.js
    |-index.js
    |-controller.js 
```





## Change Webpack Config
With the help of react-app-rewired it is very easy to
extend or adjust the webpack config used by the underlying react-scripts.

Simply add a new rewire file inside the `config` folder and import it to `config-overrides.js`.

For Detailed information have a closer look to the documentation of
[react-app-rewired](https://github.com/timarney/react-app-rewired).





## Styles
By default, CSS Modules are part of the setup.  
As soon as a file is css/scss file ending is prefixed with module e.g. `foo.module.scss`
Webpack will do the job and applies CSS Module scoping to the styles.

Also the support for SCSS is enabled by default.  
Just replace the .css by the .scss file ending and you are fine to use
the full power of SASS.



### "Framework"
As you can see in the [Project Structure](#project-structure)
there is already a little frame for the styles.

Especially for the use of SCSS the _essentials.scss file is used to share all
variables, settings, tools, etc. across the component or shared style modules.

**Shared style modules** are placed in styles/modules/ just import and use them when
needed.  
They can be very convenient for e.g. utility styles to quickly apply some flex box rules
or add a spacing.



### SASS MQ
To work with media queries [SASS-MQ](https://github.com/sass-mq/sass-mq) is included.
The breakpoints are configured in `./src/styles/settings/_settings.breakpoints.scss`.





## Styleguide

[React Styleguidist](https://react-styleguidist.js.org/) is available and can be used out of 
the box. It documents all components in the components directory.

Run `npm run styleguide` for development. It will start React Styleguidist in watch mode.  
Or use `npm run styleguide:build` if you want to host your style guide.
You can check the build with `npm run serve:styleguide`

To provide additional information to your components use the `.md` file which
is generated automatically for all new components.

React Styleguidist will use prop-types and defaults automatically also the 
information from JS Doc comments are used in the style guide.

Have a look to the [React Styleguidist](https://react-styleguidist.js.org/docs/getting-started.html) 
documentation for more information.




## How to Contribute
We really appreciate every contribution, so if you have some cool ideas have a look to the 
[Contributing Guidelines](https://github.com/emakina-cee-oss/react-cli/blob/master/CONTRIBUTING.md).
