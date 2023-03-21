'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const stringHelpers = require('underscore.string');
const superb = require('superb');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.

    const adj1 = superb.random();
    this.log(yosay(`Welcome to the ${adj1} ${chalk.red('generator-vue-3')} generator!`));

    const adj2 = superb.random();
    const prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'What is the name of your app?',
        default: `My ${adj2} Vue App`,
      },
      {
        type: 'list',
        name: 'uiframework',
        message: 'Would you like to use a UI framework?',
        choices: [
          { name: 'Bootstrap', value: 'bootstrap' },
          { name: 'Vuetify', value: 'vuetify' },
          { name: 'None', value: '' },
        ],
        default: '',
      },
      {
        type: 'number',
        name: 'port',
        message: 'What port would you like the Vite dev server to run on?',
        default: 5173,
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.slugged = stringHelpers.slugify(props.name);
      props.title = stringHelpers.titleize(props.name);
      props.importUiFramework = '';
      if (props.uiframework === 'bootstrap') {
        props.importUiFramework = `@import '~/bootstrap/scss/bootstrap';`;
      }
      this.props = props;
    });
  }

  default() {
    this.composeWith(require.resolve('@walts81/generator-vite-debug/generators/app'), {
      port: this.props.port,
      dest: this.props.slugged,
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('rootFiles'), this.destinationPath(this.props.slugged), this.props);
    this.fs.copyTpl(this.templatePath('vue'), this.destinationPath(this.props.slugged), this.props);
    if (!!this.props.uiframework) {
      this.fs.copyTpl(this.templatePath(this.props.uiframework), this.destinationPath(this.props.slugged), this.props);
    }

    const pkgJson = {
      dependencies: {
        vue: '^3.2.47',
      },
      devDependencies: {},
    };
    const ui = this.props.uiframework;
    if (!!ui) {
      if (ui === 'vuetify') {
        pkgJson.dependencies['vuetify'] = '^3.1.10';
        pkgJson.devDependencies['vite-plugin-vuetify'] = '^1.0.2';
      } else if (ui === 'bootstrap') {
        pkgJson.dependencies['dayjs'] = '^1.11.7';
        pkgJson.dependencies['bootstrap'] = '^5.2.3';
        pkgJson.devDependencies['@types/bootstrap'] = '^5.2.6';
      }
    }

    // Extend or create package.json file in destination path
    const pkgJsonFile = this.props.slugged + '/package.json';
    this.fs.extendJSON(this.destinationPath(pkgJsonFile), pkgJson);
  }

  end() {
    this.log('cd into ' + this.props.slugged + ' and run `npm install`');
  }
};
