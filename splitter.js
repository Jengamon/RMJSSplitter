/*: ==========================================================================
* ############################################################################
*
* Plugin: Split RMMZ.js files
* Author: DekitaRPG [dekitarpg.com] (dekitarpg@gmail.com)
* Edited by jengamon
*
* ############################################################################
* ============================================================================
* 1- copy the files from the js folder into the js directory 
* (only the files directly inside the folder are necessary)
* 2- run 'yarn install'
* 3- run 'yarn start'
*/
const mkdirp = require('mkdirp');
const splitter = "//-----------------------------------------------------------------------------";
const fs = require('fs');
const path = require('path');
console.log('#creating-target-dir');
mkdirp.sync("src/");
console.log('#scanning-all-files:..')
const cdirectoryFiles = fs.readdirSync('js');
const commandFiles = cdirectoryFiles.filter(f => {
    return f.startsWith('rmmz_') && f.endsWith('.js')
});
console.log('#scanning-rmmz-files:', commandFiles)
for (const filename of commandFiles) {
    fs.readFile(path.join('js', filename), 'utf8', (err, data) => {
        if (err) throw err;
        const split_classes = data.split(splitter);
        for (const [i, maybeclass]  of split_classes.entries()) {
            const tempname = filename.replace('.js','');
            const matches = maybeclass.match(/(function) \w+/);
            const classname = matches ? matches[0].replace('function','').trim() : `unknown-class-${i}`;
            const newpath = `/src/${classname}(${tempname}).js`;
            // const newpath = `/src/${classname}.js`;
            const newfilepath = path.join('.', newpath);
            fs.writeFile(newfilepath, maybeclass, (werr, wdata) =>{
                if (werr) throw werr;
                console.log('wrote', newfilepath);
            })
        }
    });
}