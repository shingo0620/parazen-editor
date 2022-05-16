const path = require('path')
const ghpages = require('gh-pages')

const options = {
  branch: 'gh-pages',
  repo: 'git@github.com:shingo0620/parazen-editor.git'
}

ghpages.publish('dist', options, function(err) {
  console.error(err)
})
