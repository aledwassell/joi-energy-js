const { meters } = require("../meters/meters");
const { pricePlanNames } = require("./price-plans");
const { readings } = require("../readings/readings");
const { recommend } = require("./price-plans-controller");

describe("price plans", () => {
    const { getReadings } = readings({
        [meters.METER0]: [
            { time: 1607686125, reading: 0.26785 },
            { time: 1607599724, reading: 0.26785 },
            { time: 1607513324, reading: 0.26785 },
        ],
    });

    it("should get usage cost for all price plans", () => {
        const expected = [
            {
                [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
            },
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
        });

        expect(recommendation).toEqual(expected);
    });

    it("should limit the number of plans returned based on the query", () => {
        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {
                limit: 2,
            }
        });

        const expected = [
            {[pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10},
            {[pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2},
        ];

        expect(recommendation.length).toBe(2);
        expect(recommendation).toEqual(expected);
    });
});
