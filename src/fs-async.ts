import { readFile, writeFile } from "fs";
import * as path from 'path';

const __dirname = import.meta.dirname;

const firstFile = path.resolve(__dirname, '..', 'content', 'first.txt');
const secondFile = path.resolve(__dirname, '..', 'content', 'second.txt');
const resultFile = path.resolve(__dirname, '..', 'content', 'result-async.txt');

console.log('ready to read the first file');
readFile(firstFile, 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    const firstContent = result;
    console.log('ready to ready the second file');
    readFile(secondFile, 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const secondContent = result;
        console.log('ready to write content to designated file');
        writeFile(resultFile, `Here is the result: ${firstContent}, ${secondContent}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })
    })
})

console.log('end of the file');