const { globSync } = require("glob");
const path = require("path");
const fs = require('fs');
const { parse } = require('@babel/parser');
const babelGenerator = require('@babel/generator').default;
const t = require('@babel/types');
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

                        const ast = self.createReactComponentAst(docblocks);
                        const { code } = babelGenerator(ast, { quotes: 'single' });

                        fs.writeFileSync(path.join(__dirname, '..', '/docs/DocblockList.tsx'), code);

                        callback();
                    }

                });
        });
    }

    createReactComponentAst(docblocks) {

        const importReact = t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('React'))],
            t.stringLiteral('react')
        );

        const styleVariable = t.variableDeclaration('const', [
            t.variableDeclarator(
                t.identifier('style'),
                t.objectExpression([
                    t.objectProperty(t.identifier('width'), t.stringLiteral('100%')),
                    t.objectProperty(t.identifier('border'), t.stringLiteral('1px solid black')),
                ])
            ),
        ]);

        const renderTable = t.arrowFunctionExpression(
            [],
            t.blockStatement([
                styleVariable,
                t.returnStatement(t.jsxElement(
                    t.jsxOpeningElement(t.jsxIdentifier('div'), []),
                    t.jsxClosingElement(t.jsxIdentifier('div')),
                    [
                        // Tytuł
                        t.jsxElement(
                            t.jsxOpeningElement(t.jsxIdentifier('h1'), []),
                            t.jsxClosingElement(t.jsxIdentifier('h1')),
                            [t.jsxText('Docblock List')]
                        ),
                        // Tabela
                        t.jsxElement(
                            t.jsxOpeningElement(t.jsxIdentifier('table'), [
                                t.jsxAttribute(t.jsxIdentifier('style'), t.jsxExpressionContainer(t.identifier('style')))
                            ]),
                            t.jsxClosingElement(t.jsxIdentifier('table')),
                            [
                                // Nagłówki tabeli
                                t.jsxElement(
                                    t.jsxOpeningElement(t.jsxIdentifier('thead'), []),
                                    t.jsxClosingElement(t.jsxIdentifier('thead')),
                                    [
                                        t.jsxElement(
                                            t.jsxOpeningElement(t.jsxIdentifier('tr'), []),
                                            t.jsxClosingElement(t.jsxIdentifier('tr')),
                                            [
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('th'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('th')),
                                                    [t.jsxText('Name')]
                                                ),
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('th'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('th')),
                                                    [t.jsxText('Docblock')]
                                                ),
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('th'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('th')),
                                                    [t.jsxText('File')]
                                                ),
                                            ]
                                        ),
                                    ]
                                ),
                                // Wiersze tabeli
                                t.jsxElement(
                                    t.jsxOpeningElement(t.jsxIdentifier('tbody'), []),
                                    t.jsxClosingElement(t.jsxIdentifier('tbody')),
                                    docblocks.map(docblock =>
                                        t.jsxElement(
                                            t.jsxOpeningElement(t.jsxIdentifier('tr'), []),
                                            t.jsxClosingElement(t.jsxIdentifier('tr')),
                                            [
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('td'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('td')),
                                                    [t.jsxText(docblock.name)]
                                                ),
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('td'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('td')),
                                                    [t.jsxText(docblock.docblock)]
                                                ),
                                                t.jsxElement(
                                                    t.jsxOpeningElement(t.jsxIdentifier('td'), []),
                                                    t.jsxClosingElement(t.jsxIdentifier('td')),
                                                    [t.jsxText(docblock.file)]
                                                ),
                                            ]
                                        )
                                    )
                                ),
                            ]
                        ),
                    ]
                )
                )
            ])
        );



        const component = t.variableDeclaration('const', [
            t.variableDeclarator(
                t.identifier('DocblockList: React.FC'),
                renderTable
            ),
        ]);

        const exportComponent = t.exportDefaultDeclaration(t.identifier('DocblockList'));

        return t.program([importReact, component, exportComponent]);
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