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
// data
// [
//   [ 'nav.tsx', 'seo.tsx', 'test' ],
//   [],
//   [],
//   [ '404.tsx', 'fontSize.tsx', 'index.tsx', 'test' ],
//   [ 'global.ts', 'nav.tsx' ],
//   [ 'normalize.css' ]
// ]

// obj
// {
//   components: [ 'nav.tsx', 'seo.tsx', { test: [] } ],
//   pages: [ '404.tsx', 'fontSize.tsx', 'index.tsx', { test: [] } ],
//   projectContainers: [ 'global.ts', 'nav.tsx' ],
//   styles: [ 'normalize.css' ]
// }
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

// (async () => {
//   const p = (filePath) => path.resolve(process.cwd(), './src/', filePath)
//   const l = fs.readdir.bind(null, p('pages'))
//   const data = await Promise.all([])
//   console.dir(data)
// })()

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

// {
//   const afterRoot = parseRootPath([ROOT, srcPath('components/test')])
//   const chunks = afterRoot.split(path.sep)
//   console.log(afterRoot)
//   console.log(chunks)
// }

// const getNavMetadata = async (path) => {
//   const data = await fs.readdir(path)
//   // console.log(typeof data)
//   // console.dir(data, { depth: null })
//   return data
// };

// (async () => {
//   const navMetadata = await getNavMetadata(path.resolve(process.cwd(), './src/pages'))
//   console.log(typeof navMetadata)
//   console.dir(navMetadata, { depth: null })
// })()

module.exports = { pathFactory, createFullPaths, getDirGraph }
