const { describe, it } = require('mocha');
const { expect } = require('chai');

const ESD = require('..');
const { ESDCoreStatus } = require('..');

describe("Compile Test", () => {
    let _esd;
    it("Loading core interface", () => {
        _esd = ESD.getInterface();
        expect(_esd).to.not.null;
    });

    it("Initializing core", () => {
        const res = _esd.esdInitialize('smoke_test', 0);
        expect(res.status).to.equal(ESDCoreStatus.SUCCESS);
    });

    it("Initialization checkup", () => {
        const res = _esd.esdIsInitialized();
        expect(res).to.be.true;
    });

    it("Initialization checkup", () => {
        const res = _esd.esdCompileToJSXBin('var oxf = 29375;', '', '');
        expect(res.status).to.equal(ESDCoreStatus.SUCCESS);
        expect(res.error).to.be.undefined;
        expect(res.output).to.be.a('string').that.contains('@JSXBIN@ES@');
    });

    it("DeInitializing core", () => {
        const res = _esd.esdCleanup();
        expect(res.status).to.equal(ESDCoreStatus.SUCCESS);
    });
});