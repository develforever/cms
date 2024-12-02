const { globSync } = require("glob");
const path = require("path");
const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const logerName = 'IndexWebpackPlugin';
class IndexWebpackPlugin {

    constructor(options) {

    }

    apply(compiler) {

        compiler.hooks.emit.tapAsync(
            logerName,
            (compilation, callback) => {

                console.group('IndexWebpackPlugin');

                let files = globSync(path.join(__dirname, '..', '/Pages/*.tsx'));

                console.log(files);
                console.groupEnd();

                callback();
            }
        );

        compiler.hooks.emit.tapAsync(logerName, (compilation, callback) => {

            const filePath = path.join(__dirname, '..', '/Router.tsx');

            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    compilation.errors.push(new Error(`Error reading file: ${err.message}`));
                    return callback();
                }

                try {
                    const results = this.extractDocblocks(content);
                    compilation.assets['docblocks.json'] = {
                        source: () => JSON.stringify(results, null, 2),
                        size: () => JSON.stringify(results, null, 2).length,
                    };
                    callback();
                } catch (error) {
                    compilation.errors.push(new Error(`Error processing file: ${error.message}`));
                    callback();
                }
            });
        });
    }

    extractDocblocks(content) {
        const ast = parse(content, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        });

        const functionsWithDocblocks = [];

        traverse(ast, {
            ExportNamedDeclaration(path) {
                const { leadingComments } = path.node;
                if (leadingComments) {
                    const funcName = path.node.specifiers[0].local.loc.identifierName;
                    const docblock = leadingComments.map(comment => comment.value).join('\n');
                    functionsWithDocblocks.push({ name: funcName, docblock });
                }
            },
        });

        return functionsWithDocblocks;
    }
}

module.exports = IndexWebpackPlugin;