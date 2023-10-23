const mongoose = require('mongoose')

mongoose.connect(process.env.BASE_URL, {
    
    useUnifiedTopology: true,
    useNewUrlParser: true
    
}).then(() => {
    console.log("____mongodb Atlas connected");
}).catch((error) => {
    console.error("____mongodb Atlas not connected:", error);
})