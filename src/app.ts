import express, { Request, Response } from 'express';
import { AppDataSource } from "./config/database"; 

const port = process.env.PORT ;
const app = express();
app.use(express.json());


AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, world!');
    });
  })
  .catch((err) => console.error("DB Connection Error:", err));
