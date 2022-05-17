import fs from 'fs'

import { STDFAnalyser } from '..'

const input = fs.createReadStream('./test/demo.stdf')

const analyser: STDFAnalyser = new STDFAnalyser()

const start: Date = new Date()

input.on('data', (chunk) => {
    analyser.analyse(<Buffer>chunk, (record) => {
        console.log(record.toString()) // taken almost all time on this line, try to commet it.
    })
})

input.on('end', () => {
    console.log('analyse end.')
    console.log(`start: ${start.toISOString()}\nend: ${(new Date()).toISOString()}`)
})