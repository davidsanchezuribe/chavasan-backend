import MongoClient from 'mongodb';
import env from './env';
// para almacenar la conexión a la base de datos
const { mongoServer, database } = env;

export let db = null;

export async function dbInit(){
    const client = await MongoClient.connect(`mongodb://${mongoServer}?authSource=admin`
    , { useUnifiedTopology: true });
    db = client.db(database);
    console.log('mongo successfully conected');
    return;
}

/*MongoClient.connect(`mongodb://${mongoServer}`
    , { useUnifiedTopology: true }).then(client => {
        db = client.db('issuetracker');
        console.log('mongo successfully conected')
    }).catch(error => {
        console.log('ERROR: ', error);
    });*/