"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
class GameController {
    constructor() {
        this.game = (req, res) => {
            // Generate and shuffle the game board here
            const board = this.generateBoard();
            res.render('game', { board });
        };
        this.generateBoard = () => {
            // Tạo một mảng với 8 cặp hình
            let board = [
                'https://i.ytimg.com/vi/1mEuGtE4Vws/maxresdefault.jpg',
                'https://i.ytimg.com/vi/1mEuGtE4Vws/maxresdefault.jpg',
                'https://pbs.twimg.com/media/E3GL0wDVkAMN6tJ.jpg',
                'https://pbs.twimg.com/media/E3GL0wDVkAMN6tJ.jpg',
                'https://i1.sndcdn.com/artworks-5wyKtQW9E4LCPLS3-IsKmqg-t500x500.jpg',
                'https://i1.sndcdn.com/artworks-5wyKtQW9E4LCPLS3-IsKmqg-t500x500.jpg',
                'https://i.imgflip.com/6avcjk.jpg',
                'https://i.imgflip.com/6avcjk.jpg',
                'https://memeprod.sgp1.digitaloceanspaces.com/user-template/0071fde0b051988549aeb705ea546761.png',
                'https://memeprod.sgp1.digitaloceanspaces.com/user-template/0071fde0b051988549aeb705ea546761.png',
                'https://i.pinimg.com/736x/2c/b3/35/2cb335112c06276f942a79aaaca7f830.jpg',
                'https://i.pinimg.com/736x/2c/b3/35/2cb335112c06276f942a79aaaca7f830.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26L9tKjbLQcJOA1q1p4hjHC5p5oMSf4Mg1S1l2P-NqXhHPa8tt62l3d-mORMg5xi-_i8&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26L9tKjbLQcJOA1q1p4hjHC5p5oMSf4Mg1S1l2P-NqXhHPa8tt62l3d-mORMg5xi-_i8&usqp=CAU',
                'https://i.pinimg.com/736x/dd/36/da/dd36da65146255f25d1c8cab5bed4eaf.jpg',
                'https://i.pinimg.com/736x/dd/36/da/dd36da65146255f25d1c8cab5bed4eaf.jpg'
            ];
            // Xáo trộn mảng sử dụng thuật toán Fisher-Yates
            for (let i = board.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [board[i], board[j]] = [board[j], board[i]];
            }
            return board;
        };
    }
    index(req, res) {
        res.render('index');
    }
    checkMatch(req, res) {
        // Check if the two images match
        const { img1, img2 } = req.body;
        const match = img1 === img2;
        res.json({ match });
    }
}
exports.GameController = GameController;
//# sourceMappingURL=gameController.js.map