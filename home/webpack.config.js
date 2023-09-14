/* eslint-disable */
const {ModuleFederationPlugin} = require('webpack').container
const pwaWebpackConfig = require('@salesforce/pwa-kit-dev/configs/webpack/config')
const pkg = require("./package.json").dependencies;

const newConfig = [...pwaWebpackConfig]
const projectDir = process.cwd()

newConfig.forEach((config) => {
    config.plugins.push(
        new ModuleFederationPlugin({
            name: 'RetailHomeApp',
            remotes: {
                plpClientApp:
                    'plpClientApp@http://localhost:3001/mobify/bundle/development/plp-client-remote.js'
            },
            shared: {
                'react': {
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
                    requiredVersion: pkg["@salesforce/retail-react-app"],
                    singleton: true
                }
            }
        })
    )
    config.devtool = false
})


module.exports = [...newConfig]
