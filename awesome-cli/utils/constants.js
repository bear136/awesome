const chalk = require('chalk')
const { version } = require('../package.json')
const baseUrl = 'https://github.com/bear136'

const promptList = [
    {
        name: 'template',
        message: chalk.yellow('Please select a project template'),
        type: 'rawlist',
        default: 'webpack',
        choices: [
            {
                name: 'vue3_template',
                description: 'Vite+Vue3+Ts项目模板'
            },
            {
                name: 'react_components',
                description: 'react+dumi+ts实现的组件库模板'
            },
            {
                name: "React(暂无此项)",
                description: "react项目模板(暂无此项)"
            }
        ]
    },
]

module.exports = {
    version,
    baseUrl,
    promptList
}