const { pathFactory, createFullPaths, getDirGraph } = require('../libs/my/tree');

(async () => {
  const ROOT = 'src'
  const srcPath = pathFactory(ROOT)
  const paths = ['pages']
  const argPaths = createFullPaths(srcPath, paths)

  const data = await getDirGraph([ROOT, argPaths])
  console.dir(data, { depth: null })

  const res = data.pages['test']
  console.log(`typeof res ${typeof res}, res = ${res}`)
})()
