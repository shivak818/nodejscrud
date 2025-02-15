const mongoose = require('mongoose');
const port = 3000;
const app = require('./app');

mongoose.connect('mongodb://127.0.0.1:27017/eLearningDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB is connected');
}).catch(err => {
    console.error('MongoDB is not connected:', err.message);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
