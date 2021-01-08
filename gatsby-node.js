const fs = require('fs').promises
const path = require('path')

const readAllDir = async (paths) => {
  const lambdas = []
  for (const path of paths) {
    const lambda = fs.readdir(path)
    lambdas.push(lambda)
  }
  const data = await Promise.all(lambdas)
  return data
}

const transformData = (obj, [root, paths], data) => {
  const newPaths = []
  for (let i = 0; i < paths.length; i++) {
    const dirFullPath = paths[i]
    const lastDirPath = path.basename(dirFullPath)
    const dirFiles = data[i]
    if (dirFiles.length !== 0) {
      const afterRootPath = parseRootPath([root, dirFullPath])
      const pathChunks = afterRootPath.split(path.sep)

      let objData = obj
      if (!objData[pathChunks[0]]) {
        objData[pathChunks[0]] = []
        objData = objData[pathChunks[0]]
      } else {
        objData = objData[pathChunks[0]]
      }

      for (let j = 1; j < pathChunks.length; j++) {
        const dir = pathChunks[j]
        let objRef = objData.find((el) => typeof el === 'object')

        if (objRef === undefined) {
          objData.push({ [dir]: [] })
          objRef = objData.find((el) => typeof el === 'object')
        }
        objData = objRef[dir]
      }

      for (const file of dirFiles) {
        if (!file.includes('.')) {
          newPaths.push(path.resolve(dirFullPath, file))
          const objRef = objData.find((el) => typeof el === 'object')
          if (objRef === undefined) {
            objData.push({ [file]: [] })
          } else {
            objRef[file] = []
          }
          continue
        }
        objData.push(file)
      }
    }
  }
  return newPaths
}

const parseRootPath = ([root, filePath]) => {
  const data = filePath.split(root)
  const pathAfterRoot = data[1]
  if (pathAfterRoot.startsWith(path.sep)) {
    return pathAfterRoot.substr(1)
  }
  return pathAfterRoot
}

const getDirGraph = async ([root, paths], obj = {}) => {
  if (paths.length === 0) return obj
  const data = await readAllDir(paths)
  const newPaths = transformData(obj, [root, paths], data)
  return getDirGraph([root, newPaths], obj)
}

const pathFactory = (root) => (filePath) => path.resolve(process.cwd(), root, filePath)
const createFullPaths = (pathFn, paths) => {
  const argPaths = []
  for (const path of paths) {
    argPaths.push(pathFn(path))
  }
  return argPaths
}

const createNavMetaData = async () => {
  const ROOT = 'src'
  const srcPath = pathFactory(ROOT)
  const paths = ['pages']
  const argPaths = createFullPaths(srcPath, paths)
  const data = await getDirGraph([ROOT, argPaths])
  return data
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const slug = await createNavMetaData()

  console.dir({ slug })

  createNodeField({
    node,
    name: `navMetaData`,
    value: JSON.stringify(slug.pages),
  })
}

// add import aliases
exports.onCreateWebpackConfig = async ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // '@components': path.resolve(__dirname, 'src/components'),
        // '@containers': path.resolve(__dirname, 'src/containers'),
        // '@projectContainers': path.resolve(__dirname, 'src/projectContainers'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
