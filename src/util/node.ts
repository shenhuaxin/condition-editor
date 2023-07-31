export const isLogical = (type) => {
    return type === "$and" || type === "$or"
}