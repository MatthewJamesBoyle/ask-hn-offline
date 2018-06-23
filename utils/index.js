const getPostHeight = post => {
    const length = post.length;
    if (length <= 42) {
        return 45;
    }
    const lines = length / 42 //amount of chars on a line roughly.
    return 20 * lines;
}

export {
    getPostHeight,
}