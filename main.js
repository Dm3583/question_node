const fs = require('fs').promises;
const readline = require('readline');
const { program } = require('commander');
program.version('0.0.1');
require('colors');
program.option(
    '-f, --file [type]',
    'file for saving game results',
    'results.txt',
);

program.parse(process.argv);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10 ) + 1;

const isValid = value => {
    if (isNaN(value)) {
        console.log('Enter a NUMBER'.red);
        return false;
    };
    if(value<1||value>10){
        console.log('A number in measures between 1 to 10'.red);
        return;
    };
    return true;
};

const log = async (data) => {
    try {
      await fs.appendFile(logFile, `${data}\n`)
      console.log(`Удалось сохранить результат в файл ${logFile}`.green)
    } catch (err) {
      console.log(`Не удалось сохранить файл ${logFile}`.red)
    }
  }

const game = () => {
    rl.question(
        'Enter a number between 1 and 10, to guess a minded number'.yellow,
        value => {
            let a = +value
            if(!isValid(a)){
                game();
                return;
            };
            count +=1;
            if (a===mind){
                console.log('Congratulations, you guess a minded number for %d efforts'.green, count);
                log(
                    `${new Date().toLocaleDateString()}: Congratulations, you guess a minded number for${count} steps,`
                ).finally(()=>rl.close());
                return;
            }
            console.log('You are not guess, next effort'.red);
            game();
        }
    )
};

game();
