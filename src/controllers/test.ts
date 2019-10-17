export const testGet = (req, res) => {
    res.json({
        ok: true,
        error: null,
    })
}

export const testPost = (req, res) => {
    // @ts-ignore
    res.json({
        ok: true,
        error: null,
        data: req.body.data
    })
}