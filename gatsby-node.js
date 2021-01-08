const path = require('path')
const { pathFactory, createFullPaths, getDirGraph } = require('./libs/my/tree')

const createNavMetaData = async () => {
  const ROOT = 'src'
  const srcPath = pathFactory(ROOT)
  const paths = ['pages']
  const argPaths = createFullPaths(srcPath, paths)
  const data = await getDirGraph([ROOT, argPaths])
  return data
}

// exports.onCreateNode = async ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   const slug = await createNavMetaData()
//   await createNodeField({
//     node: node,
//     name: `navMetaData`,
//     value: JSON.stringify(slug.pages),
//   })
// }

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  const data = await createNavMetaData()
  const node = {
    id: createNodeId('navMetaData'),
    parent: null,
    children: [],
    internal: {
      type: 'navMetaData',
      mediaType: 'text/json',
      content: JSON.stringify(data.pages),
      contentDigest: createContentDigest(data),
    },
  }
  await createNode(node)
}

// import aliases
exports.onCreateWebpackConfig = async ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type AuthorJson implements Node {
//       joinedAt: Date
//     }
//   `
//   createTypes(typeDefs)
// }
