module.exports = {
    checkStatus: (req, res) => {
        return req.body == null || undefined ? res.body.statusCode == 400 : res.body.statusCode == 200;
    }
}
    
