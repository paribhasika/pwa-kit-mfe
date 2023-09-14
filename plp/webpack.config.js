/* eslint-disable */
const {ModuleFederationPlugin} = require('webpack').container
const pwaWebpackConfig = require('@salesforce/pwa-kit-dev/configs/webpack/config')
const pkg = require('./package.json').dependencies
// const {NodeFederationPlugin} = require('@module-federation/node')

const newConfig = [...pwaWebpackConfig]
const projectDir = process.cwd()

newConfig.forEach((config) => {
    if (config.target === 'web' && config.name === 'client') {
        config.plugins.push(
            new ModuleFederationPlugin({
                name: 'plpClientApp',
                filename: 'plp-client-remote.js',
                exposes: {
                    './PLP': `${projectDir}/overrides/app/pages/plp/index.jsx`
                },
                shared: {
                    react: {
                        eager: false,
                        requiredVersion: false,
                        singleton: true
                    },
                    'react-dom': {
                        eager: false,
                        requiredVersion: false,
                        singleton: true
                    },
                    '@salesforce/retail-react-app': {
                        eager: false,
                        requiredVersion: pkg['@salesforce/retail-react-app'],
                        singleton: true
                    }
                }
            })
        )
        config.output.publicPath = 'auto'
    }
    // if (config.target === 'node' && config.name === 'server') {
    //     config.plugins.push(
    //         new NodeFederationPlugin({
    //             name: 'plpServerApp',
    //             filename: 'plp-server-remote.js',
    //             library: {type: 'commonjs2'},
    //             exposes: {
    //                 './PLP': `${projectDir}/overrides/app/pages/plp/index.jsx`
    //             },
    //             shared: {}
    //         })
    //     )
    // }
})


module.exports = [...newConfig]
