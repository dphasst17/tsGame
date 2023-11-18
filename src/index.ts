import express from 'express';
import path from 'path';
import { GameController } from './controllers/gameController';

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.resolve(path.join(__dirname, '../public')))); 
const gameController = new GameController();

app.get('/', gameController.index);
app.get('/game/:id/:level?', gameController.game);
app.post('/check-match', gameController.checkMatch);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});