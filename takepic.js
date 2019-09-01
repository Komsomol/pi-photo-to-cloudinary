const spawn = require('child_process').spawn;
const btoa = require('btoa');

exports.raspistill = function (args, callback) {
    // flags must be passed as an array to spawn
    return new Promise(function (resolve, reject) {
        if (typeof args == 'string') {
            args = args.split(' ');
        }
        // console.log(args);
        var raspistill = spawn('raspistill', args);

        var arr = [];

        raspistill.stdout.on('data', function (data) {
            // console.log(data)
            arr.push(data);
        });

        raspistill.stdout.on('close', function (code) {
            var buffer = new Buffer.concat(arr);
            var base64 = buffer.toString('base64');
            var image = `data:image/jpeg;base64,${base64}`;
            resolve(image);
        });

        raspistill.stdout.on('error', function (err) {
            reject(err);
        });
    });
};
