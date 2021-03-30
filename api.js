

exports.setApp = function( app, client)
{
    //Login API
    app.post('/api/login', async (req, res, next) => 
    {  
        // incoming: login, password  // outgoing: id, firstName, lastName, error 
        var error = '';  
        const { login, password } = req.body;  
        const db = client.db();  
        const results = await db.collection('Users').find({login:login,password:password}).toArray();
        var id = -1;  
        var fn = '';  
        var ln = '';
        var em = '';
        var ver = false; 
        var emTok = '';
        if( results.length > 0 )  
        {    
            id = results[0]._id;
            fn = results[0].firstName;    
            ln = results[0].lastName;
            em = results[0].email;
            ver = results[0].isVerified;
            emTok = results[0].emailTok
        }  
        var ret = { id:id, firstName:fn, lastName:ln, email:em, isVerified:ver, emailTok:emTok, error:''};  
        res.status(200).json(ret);
    });
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    //Register API
    app.post('/api/register', async (req, res, next) =>    
    {      // incoming: firstName, lastName, login, email, password      // outgoing: error/no error   
        const crypto = require('crypto');
        const { firstName, lastName, login, email, password } = req.body;      
        const newUser = {firstName:firstName,lastName:lastName,login:login,email:email,emailTok:crypto.randomBytes(64).toString('hex'),password:password,isVerified:false};      
        var error = '';
        const db = client.db();  
        const results = await db.collection('Users').find({login:login}).toArray();
        if( results.length > 0 )  
        { 
            error = "The Username you entered is already in use"
            var ret = { error: error };      
            res.status(500).json(ret);
        }
        else 
        {
            const msg = 
            {
                from: 'letsbuckitgroup10@gmail.com',
                to: req.body.email,
                subject: 'LetsBuckit - Email Verification',
                text:` 
                    Hello!
                    Thank you for signing up for LetsBuckit! 
                    Please copy and paste the following link in your browser to verify your account:
                    http://${req.headers.host}/verify-email?token=${newUser.emailTok} 
                `,
                html: `
                    <h2>Hello!</h2>
                    <p>Thank you for signing up for LetsBuckit!</p>
                    <p>Please click the link below to verify your account:</p>
                    <a href="http://${req.headers.host}/verify-email?token=${newUser.emailTok}">Verify Your Account</a>
                `
            }
            try      
            {        
                const db = client.db();        
                const result = db.collection('Users').insertOne(newUser);      
                try
                {
                    await sgMail.send(msg);
                    //req.flash('success');
                    res.redirect('/login');
                }
                catch (er)
                {
                    console.log(er);
                    //req.flash('an error has occured');
                    req.redirect('/');
                    error = er.toString();
                    var ret = { error: error };      
                    res.status(500).json(ret);
                }
            }      
            catch(e)      
            {        
                error = e.toString();      
            }         
            var ret = { error: error };      
            res.status(200).json(ret);
        }
    });

   
    app.post('/api/verify-email',async (req, res, next) =>
    {
        var err = '';
        const db = client.db();  
        try
        {
           //  const user = await db.collection('Users').findOne({emailTok : req.query.token});
            const results = await db.collection('Users').find({emailTok:req.query.token}).toArray();
            var myQuery = {emailTok: req.query.token};
            var newVal = { $set :{emailTok:null, isVerified:true}};
            if (results.length == 0)
            {
                req.flash('error!');
                return res.redirect('/');
            }
            results[0].emailTok = null;
            results[0].isVerified = true;
            // await results[0].save();
            db.collection('Users').updateOne(myQuery,newVal, function(err, res) {
                if (err) throw err;
                console.log("Collection Item Updated");
            });
        }
        catch (error)
        {
            console.log(error);
            err = error.toString();
            var ret = {error : err}
            res.status(500).json(ret);
        }

        var ret = { error: err };      
        res.status(200).json(ret);
    });
}