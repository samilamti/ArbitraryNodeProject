module.exports = {
    
    handle(req, res) {
        res.end(jade.renderFile(path.resolve(__dirname, 'view.jade'), {title: 'About'}))        
    }
    
};

const path = require('path');
const jade = require('jade'); 