
const shortenQueryname = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, '').trim().replace(/\s+/g, '-');
}

const originalQueryName = data.title
const shortenedQueryname = shortenQueryname(originalQueryName)
