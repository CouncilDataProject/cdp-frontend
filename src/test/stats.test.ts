import { expect } from "chai";

import { mean, range } from "../stats";

describe("stats", () => {
    describe("mean", () => {
        it("finds the average of a list of numbers", () => {
            expect(mean(4, 5, 6)).to.equal(5);
        });
    });

    describe("range", () => {
        it("finds the range of a spread of numbers", () => {
            expect(range(4, 5, 6)).to.equal(2);
        });
    });
});
