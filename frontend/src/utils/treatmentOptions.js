const numberFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

export function getTreatmentOptions(treatment) {
    const duration = String(treatment.duration ?? '');
    const price = String(treatment.price ?? '');
    if (!/\b(?:minutes?|mins?)\b/i.test(duration)) return null;

    const durations = duration.split('/').map((part) => part.trim());
    const prices = price.split('/').map((part) => part.trim());
    if (!durations.length || durations.length !== prices.length) return null;

    const options = [];
    for (let index = 0; index < durations.length; index += 1) {
        const match = durations[index].match(/^(\d+(?:\.\d+)?)\s*(?:minutes?|mins?)?$/i);
        if (!match || !/^\d+(?:\.\d{1,2})?$/.test(prices[index])) return null;
        const minutes = Number(match[1]);
        const amount = Number(prices[index]);
        if (!Number.isFinite(minutes) || !Number.isFinite(amount) || minutes <= 0 || amount < 0) return null;
        options.push({ duration: numberFormat.format(minutes) + ' min', price: '₹' + numberFormat.format(amount) });
    }
    return options;
}

export function getPairingLabel(value) {
    const labels = {
        'any treatment': 'Any treatment',
        facials: 'Facial treatments',
        'serene skin: only scrub and wrap': 'Serene Skin scrubs and wraps only',
    };
    return labels[value] || value;
}
