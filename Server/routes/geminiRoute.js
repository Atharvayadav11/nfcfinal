const {Router} = require('express');
const router = Router();
const run = require('../GeminiApi')

router.post('/prompt',async(req,res)=>{
    try{
        const {prompt} = req.body
        const response = await run(prompt)
         res.json(response);
    }
    catch(err){
        console.log(err)
    }
})

module.exports=router