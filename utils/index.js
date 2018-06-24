const getPostHeight = post => {
    if (!post || post.length <= 42) {
        return 47;
    }

    const length = post.length;
    const lines = length / 42 //amount of chars on a line roughly.
    return 23 * lines;
}

export {
    getPostHeight,
}