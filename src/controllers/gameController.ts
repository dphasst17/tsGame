import { Request, Response } from 'express';

export class GameController {
    public index(req: Request, res: Response) {
        res.render('index');
    }

    public game = async(req: Request, res: Response) => {
        // Generate and shuffle the game board here
        const level = req.params['level'] || 'ease'
        const board = await this.generateBoard(level);
        res.render('game', { board:board, level:level });
    }

    public checkMatch(req: Request, res: Response) {
        // Check if the two images match
        const { img1, img2 } = req.body;
        const match = img1 === img2;
        res.json({ match });
    }

    private generateBoard = async(level:string) => {
        let limit:string = '8'
        switch (level){
            case 'easy':{
                limit = '8'
                break;
            }
            case 'normal':{
                limit = '12'
                break;
            }
            case 'hard':{
                limit = '18'
                break;
            }
        }
        let board:any = []
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`);
        const data = await response.json();
        let urls = data.results.map((e:any) => e.url);
    
        // Lấy hình ảnh từ url
        const imgPromises = urls.map((url: string) => fetch(url).then(response => response.json()));
        const imgResponses = await Promise.all(imgPromises);
        let img = imgResponses.map((response: any) => response.sprites.front_default);
    
        board = [...img,...img];
    
        // Xáo trộn mảng sử dụng thuật toán Fisher-Yates
        for (let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 2));
            [board[i], board[j]] = [board[j], board[i]];
        }
    
        return board;
    }
    
    
}