const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const fs = require("fs-extra")
function downloadTemplate (downloadPath, destDir) {
    return new Promise((resolve, reject) => {
        const spinner = ora(chalk.greenBright('🧨Downloading template, wait a moment...\r\n'))
        spinner.start()
        download(downloadPath, destDir, { clone: true }, err => {
            if (err) {
                spinner.stop()
                console.error(chalk.red('Download failed, please check if the network is connected normally or please try again'))
                reject(err)
            } else {
                spinner.succeed(chalk.greenBright('🎉Download successful ! ! !'))
                resolve('successful')
            }
        })
    })
}

module.exports = downloadTemplate