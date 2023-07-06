const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: ["Criar Conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      switch (action) {
        case "Criar Conta":
          welcome();
          createAccount();
          break;
        case "Consultar Saldo":
          consultAccount();
          break;
        case "Depositar":
          deposit();
          break;
        case "Sacar":
          withdraw();
          break;
        case "Sair":
          console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
          break;
      }
    })
    .catch((err) => console.log(err));
}

function welcome() {
  console.log(chalk.bgGreen.black.bold("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
}

function createAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Já existe uma conta com esse nome!"));
        return createAccount();
      }
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) =>
        console.log(err)
      );
      console.log(chalk.green("Parabéns a sua conta foi criada!"));
      operation();
    })
    .catch((err) => console.log(err));
}

function consultAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return consultAccount();
      }
      const accountUser = getAccount(accountName);
      console.log(chalk.bgBlue.black(`O saldo da sua conta é R$${accountUser.balance}`));
      return operation();
    })
    .catch((err) => console.log(err));
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      } else {
        inquirer
          .prompt([
            {
              name: "amount",
              message: "Quanto você deseja depositar?",
            },
          ])
          .then((answer) => {
            const amount = answer["amount"];

            addAmount(accountName, amount);
            return operation();
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
          return operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (fs.existsSync(`accounts/${accountName}.json`)) {
    return true;
  } else {
    console.log(chalk.bgRed.black("Esta conta não existe, tente novamente."));
    return false;
  }
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

function addAmount(accountName, amount) {
  const accountUser = getAccount(accountName);

  accountUser.balance = parseFloat(amount) + parseFloat(accountUser.balance);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountUser), (err) =>
    console.log(err)
  );

  console.log(chalk.bgGreen.black(`Foi depositado o valor R$${amount} na sua conta!`));
}

function removeAmount(accountName, amount) {
  const accountUser = getAccount(accountName);

  if (amount > accountUser.balance) {
    console.log(chalk.bgRed.black(`Saldo na conta insuficiente!`));
    return
  }

  accountUser.balance = parseFloat(accountUser.balance) - parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountUser), (err) =>
    console.log(err)
  );

  console.log(chalk.bgGreen.black(`Foi sacado o valor R$${amount} da sua conta!`));
}

operation();
