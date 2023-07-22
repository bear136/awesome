#! /usr/bin/env node
const { program } = require('commander')
const figlet = require('figlet')
const fs = require('fs-extra')
const create = require('../utils/create.js')
const path = require('path')
// 调节终端颜色
const chalk = require('chalk')
// 终端交互
const inquirer = require("inquirer")
const ora = require("ora")
// init 命令
program.command("create")
    .description("You are about to create a new project")
    //命令参数项
    .option("-f , --force", "overwrite target directory if it exists")
    .action(async (options) => {
        const { projectName } = await inquirer.prompt([
            {
                name: 'projectName',
                type: 'input',
                message: 'What is the name of the creation project?',
                default: 'awesome-project'
            }
        ])

        // 获取到当前工作目录
        const cwd = process.cwd()
        // 将文件夹进行拼接 及 当前/目录/文件夹
        const targetDirectory = path.join(cwd, projectName)
        // 如果已经有该目录了
        if (fs.existsSync(targetDirectory)) {
            if (!options.force) {
                console.error(chalk.red(`Project already exist! Please change your project name or use ${chalk.greenBright(`wb-cli create ${projectName} -f`)} to create`))
                return
            }
            // 判断是否覆盖目标目录
            const { isOverWrite } = await inquirer.prompt([
                {
                    name: 'isOverWrite',
                    type: "confirm",
                    message: 'Target directory already exists, Would you like to overwrite it?',
                    choices: [
                        {
                            name: 'Yes', value: true
                        },
                        {
                            name: 'No', value: false
                        }
                    ]
                }
            ])
            // 如果同意覆盖 
            if (isOverWrite) {
                const spinner = ora(chalk.blackBright('The project is deleting,wait a moment...'))
                spinner.start()
                await fs.removeSync(targetDirectory)
                spinner.succeed()
                console.info(chalk.green('🤑🤑 Deleted Successfully, start init project...'))
                await create(projectName)
                return
            }
            // 不同意覆盖
            console.error(chalk.red('You cannel to create project , Please make sure to overwrite the target directory '))
            return
        }
        // 不存在则直接创建
        await create(projectName)
    })



program.on("--help", () => {
    console.log(figlet.textSync("Awesome-cli", {
        font: "Standard",
        horizontalLayout: 'full',
        verticalLayout: 'fitted',
        width: 120,
        whitespaceBreak: true
    }))
})

program.parse(process.argv)