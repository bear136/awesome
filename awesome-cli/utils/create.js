const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
// 终端中创建框
const boxen = require('boxen')
const path = require('path')
const downloadTemplate = require('./download')

const { baseUrl, promptList } = require('./constants.js')
// 下载模板 

// 创建成功后的回调
const downloadSuccessfully = (projectName, installTool) => {
    const END_MSG = `${chalk.blue("🎉 created project " + chalk.greenBright(projectName) + " Successfully")}\n\n 🙏 Thanks for using awesome-cli !`
    const BOXEN_CONFIG = {
        padding: 1,
        margin: { top: 1, bottom: 1 },
        borderColor: 'cyan',
        align: 'center',
        borderStyle: 'double',
        title: '🚀 Congratulations',
        titleAlignment: 'center'
    }

    const showEndMessage = () => process.stdout.write(boxen(END_MSG, BOXEN_CONFIG))
    showEndMessage()

    console.log('👉 Get started with the following commands:')
    console.log(`\n\r\r cd ${chalk.cyan(projectName)}`)
    console.log("\r\r npm install")
    console.log("\r\r npm run start \r\n")
}

async function create (projectName) {
    inquirer.prompt(promptList).then(async answer => {
        const destDir = path.join(process.cwd(), projectName)
        const downloadPath = `direct:${baseUrl}/${answer.template}.git#master`
        try {
            const data = await downloadTemplate(downloadPath, destDir)
            downloadSuccessfully(projectName, installTool)
        } catch (error) {
        }
    })
}

module.exports = create