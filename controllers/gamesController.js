const Games = require("../modals/games");
const LatestResult = require("../modals/latestResult");

const { validationResult, matchedData } = require("express-validator");


const handleCreateNewGame = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty) {
            return res.status(400).json({ errormsg: error.array() });
        }
        const { name } = matchedData(req);
        
        const sameGame = await Games.findOne({ name });
        if (sameGame) return res.status(400).json({ errorMsg: 'This game is already exists!' });

        const newGame = await Games.create({
            name
        });

        return res.status(201).json({ successMsg: 'Game created!', data: newGame });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetGames = async (req, res) => {
    try {
        const games = await Games.find();
        return res.status(201).json({ data: games });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}


const handleAddGameResult = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty) {
            return res.status(400).json({ errormsg: error.array() });
        }
        const { gameId, result } = matchedData(req);

        if (result >= 100) return res.status(400).json({ errorMsg: 'please enter the number below 100' });


        const game = await Games.findById(gameId);
        if (!game) return res.status(404).json({ errorMsg: 'This game not found!' });

        // const today = new Date();
        // const isResultForToday = game.results.some(result => {
        //     const resultDate = new Date(result.date);
        //     return (
        //         resultDate.getDate() === today.getDate() &&
        //         resultDate.getMonth() === today.getMonth() &&
        //         resultDate.getFullYear() === today.getFullYear()
        //     );
        // });

        // if (isResultForToday) {
        //     return res.status(500).json({ errorMsg: "A result already exists for today. No new entry added." });
        // }

        if (game.results.length >= 365) {
            await game.results.pop()
            await game.save()
        }
        await game.results.unshift({ data: result });
        await game.save();

        const latestData = await LatestResult.find();
        if(latestData.length >= 1) {
            await LatestResult.deleteMany({})
        }
        await LatestResult.create({
            name:game.name,
            latestResult:[{
                data:result
            }]
        })

        return res.status(201).json({ successMsg: 'result saved.', data: game });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetGameResult = async (req, res) => {
    try {
        Games.find({}, { results: { $slice: 2 } })
            .then(games => {
                // Collect all games data into an array
                const gamesData = games.map(game => ({
                    name: game.name,
                    results: game.results,
                    // latestResult: game.latestResult
                }));

                // Send the array of game data as a single response
                return res.status(200).json({ data: gamesData });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ errorMsg: error });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};

const handleDeleteGame = async (req, res) => {
    try {
        const { gameId } = req.params;

        await Games.findByIdAndDelete(gameId)
        return res.status(200).json({ successMsg: 'Game deleted!' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleGetlatestresult = async (req, res) => {
    try {
        const latestData = await LatestResult.find();

        return res.status(200).json({data: latestData});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}



module.exports = {
    handleCreateNewGame, handleAddGameResult, handleGetGames, handleGetGameResult,
    handleDeleteGame, handleGetlatestresult
}