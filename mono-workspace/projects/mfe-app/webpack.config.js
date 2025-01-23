// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports =
//  withModuleFederationPlugin({
//   output: {
//     uniqueName: "mfeApp",
//     publicPath: "auto",
//     scriptType: "text/javascript" // to fix :styles.js:3600 Uncaught SyntaxError: Cannot use 'import.meta' outside a module
//   },

//   name: 'mfe-app',

//   exposes: {
//     // './Component': './projects/mfe-app/src/app/app.component.ts',
//     './TodoModule': './projects/mfe-app/src/app/todo-list/todo-list.module.ts', //it means whatever is inside todolist module will be aviable in a file with a name of remoteEntry.js (default)

//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },
//   // shared: share({
//   //   "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//   //   "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//   //   "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//   //   "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

//   //   ...sharedMappings.getDescriptors()
//   // })

// });

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();

sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfeApp",
    publicPath: "auto",
    scriptType: "text/javascript" // to fix :styles.js:3600 Uncaught SyntaxError: Cannot use 'import.meta' outside a module
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "mfeApp",
        filename: "remoteEntry.js",
        exposes: {
               './TodoListModule': './projects/mfe-app/src/app/todo-list/todo-list.module.ts', //it means whatever is inside todolist module will be aviable in a file with a name of remoteEntry.js (default)
               },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "hostApp": "http://localhost:4200/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};

