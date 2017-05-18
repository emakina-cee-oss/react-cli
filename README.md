# generator-emakinacee-react

!Still work in progress!

The EMAKINA CEE React generator is built on top of react-scripts used by 
[Create React App](https://github.com/facebookincubator/create-react-app).
This way you can utilize all the awesome features of create-react-app.

And in addition you have access to some even more awesome features.


## Getting started

### 1. Install the generator
```sh
npm install -g generator-emakinacee-react
```
Also make sure you have installed [Yarn](https://yarnpkg.com/en/) 
and the [Yeoman](http://yeoman.io/) command line utility `yo`.
```sh
npm install -g yarn yo
```

### 2. Create your project
```sh
yo emakinacee-react my-awesome-project
```
This command runs the generator which creates a new folder called `my-awesome-project` 
and sets up all the files and dependencies needed to take off.

### 3. Take off
```sh
cd my-awesome-project
npm start
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
To work with Media Queries we have included [SASS-MQ](Progressive Web App).
The breakpoints are configured in `./src/scss/settings/_settings.breakpoints.scss`.
