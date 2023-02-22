

const getDashboards = async (req, res, next) => {
    try {
        res.render('./Dashboard/dashboard', {
            layout: 'layouts/main-layout',
            username: req.user.name
        })
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getDashboards,
}