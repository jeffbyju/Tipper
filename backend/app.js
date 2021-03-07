const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const rp=require('request-promise')
const $=require('cheerio')

app.use(bodyParser.urlencoded({extended:true}))

app.listen(4000||process.env.PORT,function()
{
    console.log('server started successfuly')
})

app.post('/api/getGoFundMe',function(req,res){
    const url=req.body.url;
    rp(url).then(function(html){
        const goal=$('.m-progress-meter-heading',html).text().split(" ")[3]
        const amountDonated=$('.m-progress-meter-heading',html).text().split(" ")[0]
        const title=$('.a-campaign-title',html).text()
        const description=$('.o-campaign-description',html).text()
        return res.status(200).json({
        "status":"success",
        "url": url,
        "title": title,
        "description": description,
        "goal": goal,
        "amountDonated":amountDonated})
    }).catch(function(err){
        return res.status(404)
    })
})