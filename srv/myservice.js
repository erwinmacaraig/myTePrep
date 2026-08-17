const mysrv = function(srv) {
    srv.on('myFunc', (req,res) => {
        console.log('myFunc was called');
        return "Welcome " + req.data.msg;
    })
}

module.exports = mysrv; 