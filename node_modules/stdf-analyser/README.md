# STDFAnalyser

A library tool to parse STDF files.

- base on STDF v4
- support all Record Types and most Data Types
- only TypeScript code

## Install
```
    npm install stdf-analyser
```

## Usage
- callback
```ts
    import fs from 'fs'
    import { STDFAnalyser, STDFAnalyserOptions } from 'stdf-analyser'

    const input = fs.createReadStream('./test/demo.stdf')

    const opts: STDFAnalyserOptions | undefine = undefine
    const analyser: STDFAnalyser = new STDFAnalyser(opts)

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
```
- sync
```ts
    for await (const chunk of input) {
        await analyser.analyseSync(<Buffer>chunk, (record) => {
            console.log(record.toString())
            return Promise.resolve()
        })
    }
```

## Options
```ts
    export interface STDFAnalyserOptions {
        bufferSize?: number,
        byteOrder?: number,
        included?: string[],
        excluded?: string[],
        allCallback?: boolean
    }
```
- bufferSize: cache size of buffer to read file, default is 64 * 1024
- byteOrder: specify STDF file byte order, support 'BYTE_ORDER_AUTO', 'BYTE_ORDER_LE' and 'BYTE_ORDER_BE', default is BYTE_ORDER_AUTO
- included: specify the STDF Record Type to be analysed, such as 'ATR', 'FTR', etc., default is all
- excluded: specify the STDF Record Type not to be analysed, default is none
- allCallback: reserved, keep false

## Record Types
support all Record Types of STDF v4.
- record.name to output record name, such as 'PTR'
- record.desc to output recrod desciption, such as 'Parametric Test Record'
- record.tostring() to output the detail of record, includes all fields content 

check './lib/record-define' directory to figure out more.

## Data Types
support most data types, includes
- C*n
- U*n
- I*n
- R*n
- B*n
- kxTypes

And
- field.name to output field name, such as 'RESULT'
- field.desc to output field description, such as 'Test result'
- field.value to output field value
- field.len to output the length of field value
- field.toValueString() to output the string of field value
- field.toValueNotes() to output the notes of field value, if exists
- field.toDescript() to output the name and description of field
- field.toString() to output the field detail

check './lib/data-define.ts' to figure out more.



