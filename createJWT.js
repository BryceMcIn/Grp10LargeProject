const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (fn, ln, id)
{
    try
    {
        const expiration = new Date();
        const user = {userID:id, firstName:fn, lastName:ln};

        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        var ret = {accessToken:accessToken};
    }
    catch(e)
    {
        var ret = {error:e.message};
    }
    return ret;
}

exports.refresh = function(token)
{
    var ud = jwt.decode(token,{complete:true});

    var userID = ud.payload.id;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;

    return createToken( firstName, lastName, userID);
}

