"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const gameController_1 = require("./controllers/gameController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, './views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
const gameController = new gameController_1.GameController();
app.get('/', gameController.index);
app.get('/game', gameController.game);
app.post('/check-match', gameController.checkMatch);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map