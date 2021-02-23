const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../usage/usage");

const recommend = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    const limit = req.query?.limit ?? null;
    return usageForAllPricePlans(pricePlans, getReadings(meter), limit);
};

const compare = (getData, req) => {
    const pricePlanComparisons = recommend(getData, req);
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};

module.exports = { recommend, compare };
 