const readings = (data) => ({
    getReadings: (meterId) => {
        return data[meterId] || [];
    },
    setReadings: (meterId, readings) => {
        // What if the meter does not exist?
        const currentReadings = data[meterId];
        // What if the meter readings are not the right format or are missing data?
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
});

module.exports = { readings };
