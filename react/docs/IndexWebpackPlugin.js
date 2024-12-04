const { globSync } = require("glob");
const path = require("path");
const fs = require('fs');
const { parse } = require('@babel/parser');
const { debug } = require("util");
const traverse = require('@babel/traverse').default;

const logerName = 'IndexWebpackPlugin';
class IndexWebpackPlugin {

    constructor(options) {

    }

    apply(compiler) {

        const self = this;

        compiler.hooks.thisCompilation.tap(logerName, (compilation) => {
            compilation.hooks.processAssets.tapAsync(
                {
                    name: logerName,
                    stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                (assets, callback) => {

                    let files = globSync([
                        path.join(__dirname, '..', '/Router.tsx'),
                        path.join(__dirname, '..', '/Pages/*.tsx')
                    ]);

                    let docblocks = [];

                    try {
                        files.forEach((filePath) => {

                            const content = fs.readFileSync(filePath, 'utf8');
                            const results = self.extractDocblocks(content, filePath);
                            if (results.length > 0) {
                                docblocks.push(...results);
                            }

                        });
                    } catch (e) {
                        compilation.errors.push(new Error(`Error processing file: ${e.message}`));
                    } finally {

                        if (docblocks.length > 0) {
                            compilation.emitAsset('docblocks.json', {
                                source: () => JSON.stringify(docblocks, null, 2),
                                size: () => JSON.stringify(docblocks, null, 2).length,
                            });
                        }

                        callback();
                    }

                });
        });
    }

    extractDocblocks(content, filePath) {
        const ast = parse(content, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        });

        const self = this;
        const docblocks = [];


        traverse(ast, {

            ExportNamedDeclaration(path) {
                const { leadingComments } = path.node;
                if (leadingComments) {
                    const funcName = path.node.specifiers[0].local.loc.identifierName;
                    const docblock = leadingComments.map(comment => comment.value).join('\n');
                    docblocks.push({ name: funcName, docblock, file: filePath, type: 'namedexport' });
                }
            },
            FunctionDeclaration(path) {
                const { leadingComments } = path.node;

                if (leadingComments && path.node.id) {
                    const funcName = path.node.id.name;
                    const docblock = leadingComments.map(comment => comment.value).join('\n');
                    docblocks.push({ name: funcName, docblock, file: filePath, type: 'function' });
                }
            },
            VariableDeclaration(path) {
                path.node.declarations.forEach(declaration => {
                    if (
                        declaration.init &&
                        ['FunctionExpression', 'ArrowFunctionExpression'].includes(declaration.init.type)
                    ) {
                        const funcName = declaration.id ? declaration.id.name : null;
                        const leadingComments = path.node.leadingComments;
                        const typeAnnotation = self.getTypeAnnotation(declaration);

                        if (leadingComments) {
                            const docblock = leadingComments.map(comment => comment.value).join('\n');
                            docblocks.push({ name: funcName, docblock, file: filePath, type: `var:${path.node.kind}`, tstype: typeAnnotation });
                        }
                    }
                });
            },
        });

        return docblocks;
    }

    getTypeAnnotation(declaration) {
        if (declaration.id.typeAnnotation) {
            const typeNode = declaration.id.typeAnnotation.typeAnnotation;

            // Obsługa typu: React.FC lub innych nazwanych typów
            if (typeNode.type === 'TSTypeReference') {
                return this.extractTSTypeReference(typeNode);
            }
        }

        return null;
    }

    extractTSTypeReference(typeNode) {
        // Pobierz nazwę typu (np. React.FC)
        const typeName = typeNode.typeName;

        if (typeName.type === 'TSQualifiedName') {
            return `${typeName.left.name}.${typeName.right.name}`;
        }

        if (typeName.type === 'Identifier') {
            return typeName.name;
        }

        return null;
    }
}

module.exports = IndexWebpackPlugin;