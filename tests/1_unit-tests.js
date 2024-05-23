const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler.getNum(input)', () => {
        test('Whole number input', (done) => {
            assert.equal(convertHandler.getNum('8mi'), 8)
            done()
        })
    
        test('Decimal number input', (done) => {
            assert.equal(convertHandler.getNum('8.10mi'), 8.10)
            done()
        })
    
        test('Fractional input', (done) => {
            assert.equal(convertHandler.getNum('16/2'), 8)
            done()
        })
    
        test('Fractional input with a decimal', (done) => {
            assert.equal(convertHandler.getNum('8/10'), 0.8)
            done()
        })
    
        test('Double fraction input', (done) => {
            assert.equal(convertHandler.getNum('3/2/2'), 'invalid number')
            done()
        })

        test('No num provided. Default to 1', (done) => {
            assert.equal(convertHandler.getNum(''), 1)
            done()
        })
    })

    suite('convertHandler.getUnit(input)', () => {
        test('Valid input unit', (done) => {
            assert.equal(convertHandler.getUnit('l'), 'L')
            done()
        })

        test('Invalid input unit', (done) => {
            assert.equal(convertHandler.getUnit('adb'), 'invalid unit')
            done()
        })

        test('Valid input units', (done) => {
            let units = ['L','l','gal','GAL','mi','MI','km','KM','lbs','LBS','kg','KG']
            units.forEach(elem => {
                assert.equal(convertHandler.getUnit('1'+elem), elem === 'L' ? elem : elem === 'l'? 'L': elem.toLowerCase())
            });
            done()
        })
    })

    suite('convertHandler.spellOutUnit(input)', () => {
        test('Spelled-out string units', (done) => {
            let inputUnits = ['L', 'mi', 'lbs', 'gal', 'km', 'kg']
            let spellOutUnits = ['liters', 'miles', 'pounds', 'gallons', 'kilometers', 'kilograms']

            inputUnits.forEach((elem, i) => {
                assert.equal(convertHandler.spellOutUnit(elem), spellOutUnits[i])
            });
            done()
        })
    })

    suite('convertHandler.convert(input)', () => {
        test('gal to L', (done) => {
            assert.equal(convertHandler.convert('1', 'gal'), 3.78541)
            done()
        })

        test('L to gal', (done) => {
            assert.equal(convertHandler.convert('3.78541', 'L'), 1)
            done()
        })

        test('mi to km', (done) => {
            assert.equal(convertHandler.convert('1', 'mi'), 1.60934)
            done()
        })

        test('km to mi', (done) => {
            assert.equal(convertHandler.convert('1.60934', 'km'), 1)
            done()
        })

        test('kg to lbs', (done) => {
            assert.equal(convertHandler.convert('0.453592', 'kg'), 1)
            done()
        })

        test('lbs to kg', (done) => {
            assert.equal(convertHandler.convert('1', 'lbs'), 0.453592)
            done()
        })
    })
});