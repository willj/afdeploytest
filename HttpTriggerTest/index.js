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
        })
        .then((val) => {
            context.log("sms done");
            context.log(val);
        })
        .catch((err) => {
            context.log("Failed sending to " + num);
            context.log(err);
        });
    });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: ""
    };
    context.done();
};