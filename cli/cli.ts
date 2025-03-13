#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

console.log(chalk.blue("🚀 Generating bullet-proof Next.js project"));

async function main() {
  // Ask for project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-next-app",
    },
  ]);

  const templatePath = path.join(__dirname, "../main-app/");
  const targetPath = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  if (fs.existsSync(targetPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: "Directory exists. Overwrite?",
        default: false,
      },
    ]);
    if (!overwrite) process.exit(1);
  }

  // Copy templates to target directory
  await fs.copy(templatePath, targetPath);

  // Update package.json with project name
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  console.log(chalk.green(`✅ Success! Created ${projectName}`));
  console.log(chalk.yellow(`cd ${projectName} && pnpm install`));
}

main().catch((err) => {
  console.error(chalk.red("Error:"), err);
  process.exit(1);
});
