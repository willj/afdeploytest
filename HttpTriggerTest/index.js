const sms = require("simple-sms");

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let phoneNumbers = process.env.NotifyPhoneNumber.split(',');

    phoneNumbers.forEach((num, index) => {
        context.log("Number: " + num);

        sms.send({
            phoneNumber: num.trim(),
            message: "Hello, this is the internet calling!",
            senderId: "AzureFuncs"
        }).catch((err) => {
            context.log("Failed sending to " + num);
            context.log(err);
        });
    });

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};