export const isLogical = (type) => {
    return type === "$and" || type === "$or"
}

export const   options = [
    {
        label: "=",
        value: '$eq'
    },
    {
        label: "!=",
        value: "$ne"
    },
    {
        label: ">",
        value: "$gt"
    },
    {
        label: ">=",
        value: "$gte"
    },
    {
        label: "<",
        value: "$lt"
    },
    {
        label: "<=",
        value: "$lte"
    },
    {
        label: "in",
        value: "$in"
    },
    {
        label: "not in",
        value: "$nin"
    },
    {
        label: "like",
        value: "$like"
    },
]

export const getKeywordName = (keyword) => {
    if (!keyword) {
        return ""
    }
    var value = "";
    switch (keyword) {
        case "$eq":
            value = "="
            break
        case "$ne":
            value = "!="
            break
        case "$gt":
            value = ">"
            break
        case "$gte":
            value = ">="
            break
        case "$lt":
            value = "<"
            break
        case "$lte":
            value = "<="
            break
        case "$in":
            value = "in"
            break
        case "$nin":
            value = "not in"
            break
        case "$and":
            value = "and"
            break
        case "$or":
            value = "or"
            break
        case "$not":
            value = "not"
            break
        case "$like":
            value = "like"
            break
    }
    return value;
}
