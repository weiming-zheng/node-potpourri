import { readFileSync, writeFileSync } from 'fs'
import * as path from 'path'

const __dirname = import.meta.dirname;

const firstFile = path.resolve(__dirname, '..', 'content', 'first.txt')
const secondFile = path.resolve(__dirname, '..', 'content', 'second.txt')

const firstContent = readFileSync(firstFile, 'utf-8');
const secondContent = readFileSync(secondFile, 'utf-8');

console.log(firstContent, secondContent)