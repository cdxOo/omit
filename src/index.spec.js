'use strict';
var expect = require('chai').expect,
    omit = require('./index');

describe('omit()', () => {
    it('omits single attribute passed as string', () => {
        var filtered = omit('foo', { foo: 42, bar: "2B" });
        expect(filtered).to.eql({ bar: '2B' });
    });
    
    it('omits multiple attributes passed as array', () => {
        var filtered = omit(['a', 'c'], { a: 1, b: 2, c: 3, d: 4 });
        expect(filtered).to.eql({ b: 2, d: 4 });
    });

    it('omits multiple attributes passed as object', () => {
        var filtered = omit(
            { a: true, c: true },
            { a: 1, b: 2, c: 3, d: 4 }
        );
        expect(filtered).to.eql({ b: 2, d: 4 });
    });

    it('handles filter attributes that are functions', () => {
        var filtered = omit(
            { 
                a: (value) => ( value >= 1 ), 
                u: (value) => ( value === null )
            },
            { a: 1, b: 2, c: 3, d: 4, u: null }
        );
        expect(filtered).to.eql({ b: 2, c: 3, d: 4 });
    });

    it('omits all matching attrs when filter itself is a function', () => {
        var filtered = omit(
            (value, _k) => ( value === null || value === undefined ),
            { a: 1,  b: null, c: 3, d: undefined }
        );
        expect(filtered).to.eql({ a: 1, c: 3 });
    });
});
