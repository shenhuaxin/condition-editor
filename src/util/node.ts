export const isLogical = (type) => {
    return type === "$and" || type === "$or"
}


export const getKeywordName = (keyword) => {
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
