const trending = require('trending-github');

function getGithubTrendingRepos (time, lang) {
  console.log('Fetch trending repos...');
  return trending(time, lang);
}

module.exports = getGithubTrendingRepos;