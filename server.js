const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public')); 


app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
if(error){
    console.log('Unable to append to Server.log');
}
    });
next();
});

/*app.use((req,res,next)=>{
res.render('maintainence.hbs'); 
});
*/


hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});

/*app.get('/',(req,res)=>{
res.send(/{
    name:'Awanish',
    likes:[
        'football',
        'food'
    ]
});

//res.send('<h1>Hello Express</h1>');
});*/

app.get('/',(req,res)=>{
res.render('home.hbs',{
    pageTitle:'Home page',
    currentYear:new Date().getFullYear(),
    welcome:'Welcome to the Home Page'
});
});



app.get('/bad',(req,res)=>{
res.send('Unable to fetch data');
});



app.get('/about',(req,res)=>{
    //res.send('About page');
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear:new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'Unable to connect'
    });
});

app.listen(3000);