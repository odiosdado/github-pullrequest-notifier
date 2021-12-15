export const containsItemsBeforeDate = (items, property, date, results) => {
    if (!items || items.length === 0) {
        return false;
    }
    for (const item of items) {
        const itemDate = new Date(item[property]);
        if (itemDate < date) {
            return true;
        }
        results.push(item)
    }
}