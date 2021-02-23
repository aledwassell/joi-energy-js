const average = (readings) => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

const timeElapsedInHours = (readings) => {
    readings.sort((a, b) => a.time - b.time);
    const seconds = readings[readings.length - 1].time - readings[0].time;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

const usage = (readings) => {
    return average(readings) / timeElapsedInHours(readings);
};

const usageCost = (readings, rate) => {
    return usage(readings) * rate;
};

const usageForAllPricePlans = (pricePlans, readings, limit) => {
    // Don't slice the price plans if no limit is provided.
    const pp = limit ? Object.entries(pricePlans).slice(0, limit ?? 0) : Object.entries(pricePlans);
    return pp.map(([key, value]) => {
        return {
            [key]: usageCost(readings, value.rate),
        };
    });
};

module.exports = {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
};
