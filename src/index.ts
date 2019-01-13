// import * as fs from 'fs-extra'
// import * as tempy from 'tempy'
// import * as typedoc from 'typedoc'
// import * as ts from 'typescript'
import { FunctionDeclaration, printNode, Project, ts } from 'ts-simple-ast'
import * as TJS from 'typescript-json-schema'

export default async function createFTSDefinition(file: string) {
  const opts = {
    ignoreCompilerErrors: true,
    target: ts.ScriptTarget.ES2017
  }

  const project = new Project({ compilerOptions: opts })

  project.addExistingSourceFiles([file])
  project.resolveSourceFileDependencies()

  const diagnostics = project.getPreEmitDiagnostics()
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  const sourceFile = project.getSourceFileOrThrow(file)
  const functionDefaultExports = sourceFile
    .getFunctions()
    .filter((f) => f.isDefaultExport())

  let main: FunctionDeclaration

  if (functionDefaultExports.length === 1) {
    main = functionDefaultExports[0]
  } else {
    const functionExports = sourceFile
      .getFunctions()
      .filter((f) => f.isExported())

    if (functionExports.length === 1) {
      main = functionExports[0]
    } else if (functionExports.length > 1) {
      throw new Error('Unable to infer a main function export')
    }
  }

  if (!main) {
    throw new Error('Unable to infer a main function export')
  }

  console.log(printNode(main.compilerNode))

  // const name = main.getName()

  /*
  const app = new typedoc.Application(opts)
  const src = app.expandInputFiles(files)
  const project = app.convert(src)
  const docFile = tempy.file({ extension: 'json' })
  app.generateJson(project, docFile)

  const docs = await fs.readJson(docFile)
  console.log(JSON.stringify(docs, null, 2))
  */
}

export function createJSONSchema(
  file: string,
  compilerOptions: object
): TJS.Definition {
  const program = TJS.getProgramFromFiles(
    [file],
    compilerOptions,
    process.env.CWD
  )
  const schema = TJS.generateSchema(program, '*')
  return schema
}

createFTSDefinition('./examples/double.ts')
