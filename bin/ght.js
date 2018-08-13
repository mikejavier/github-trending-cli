#!/usr/bin/env node
const program = require('commander');
const Table = require('cli-table');
const pkg = require('../package.json');
const githubTrending = require('../github-trending.js');

const table = new Table({
  head: ['AUTHOR', 'NAME', 'URL', 'DESCRIPTION', 'LANGUAGE', 'STARS'],
  colWidths: [25, 25, 60, 80, 15, 10]
});

program
  .version(pkg.version)
  .description('CLI for list Github trending repositories.')
  .option('-t, --time [time]', 'List weekle|monthly trending. Default: Today')
  .option('-l, --language [language]', 'Filter trending by language')
  .parse(process.argv)

githubTrending(program.time, program.language)
  .then(repos => {
    repos.map(repo => {
      delete repo.forks;
      delete repo.starsToday;
      table.push(Object.values(repo));
    });
    console.log(table.toString());
  })
  .catch(err => console.log(err.response));