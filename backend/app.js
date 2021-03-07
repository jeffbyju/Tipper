const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const rp=require('request-promise')
const $=require('cheerio')
const cors=require('cors')

// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.listen(4000||process.env.PORT,function()
{
    console.log('server started successfuly')
})

app.post('/api/getGoFundMe/',function(req,res){
    const url=req.body.url;
    console.log("----------------")
    console.log(req.body)
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