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
        if( results.length > 0 )  
        {    
            id = results[0]._id;
            fn = results[0].firstName;    
            ln = results[0].lastName;
            em = results[0].email;
            ver = results[0].isVerified;
        }  
        var ret = { id:id, firstName:fn, lastName:ln, email:em, isVerified:ver, error:''};  
        res.status(200).json(ret);
    });

    //Register API
    app.post('/api/register', async (req, res, next) =>    
    {      // incoming: firstName, lastName, login, email, password      // outgoing: error/no error     
        const { firstName, lastName, login, email, password } = req.body;      
        const newUser = {firstName:firstName,lastName:lastName,login:login,email:email,password:password,isVerified:false};      
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
            try      
            {        
                const db = client.db();        
                const result = db.collection('Users').insertOne(newUser);      
            }      
            catch(e)      
            {        
                error = e.toString();      
            }         
            var ret = { error: error };      
            res.status(200).json(ret);
        }
    });
}