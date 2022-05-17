import fs from 'fs'

import { STDFAnalyser } from '..'

async function main(): Promise<void> {

    const input = fs.createReadStream('./test/demo.stdf')

    const analyser: STDFAnalyser = new STDFAnalyser()

    const start: Date = new Date()

    for await (const chunk of input) {
        await analyser.analyseSync(<Buffer>chunk, (record) => {
            console.log(record.toString()) // taken almost all time on this line
            return Promise.resolve()
        })
    }
    console.log('analyse end.')
    console.log(`start: ${start.toISOString()}\nend: ${(new Date()).toISOString()}`)
}

main().then(() => {
    console.log('finished.')
})