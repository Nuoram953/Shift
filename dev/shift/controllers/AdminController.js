exports.adminPage = function (req, res, next) {
    res.render('admin', {
        title: "Admin - Shift",
        currentUser: req.session.user,
    })
}