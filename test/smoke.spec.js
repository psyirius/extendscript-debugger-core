const { describe, it } = require('mocha');
const { expect } = require('chai');

const ESD = require('..');
const { ESDCoreStatus } = require('..');

describe("Smoke Test", () => {
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

    it("DeInitializing core", () => {
        const res = _esd.esdCleanup();
        expect(res.status).to.equal(ESDCoreStatus.SUCCESS);
    });
});