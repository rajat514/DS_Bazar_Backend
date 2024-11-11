const router = require("express").Router();


const { IsLogIn, isLogOut } = require("../middleware/auth");

const { validateSignUp } = require('../validator/validateAdmin');

const { validateCreteGame, validateGameResult } = require('../validator/validateGame');

const { handleSignUp, handleSignIn } = require('../controllers/adminController');

const { handleCreateNewGame, handleAddGameResult,handleGetlatestresult, handleGetGames, handleGetGameResult, handleDeleteGame } = require("../controllers/gamesController");


router.post('/sign-up', validateSignUp, handleSignUp);

router.post('/sign-in', validateSignUp, handleSignIn);

router.post('/create-game', IsLogIn, validateCreteGame, handleCreateNewGame);

router.get('/get-games', IsLogIn, handleGetGames);

router.post('/add-result', IsLogIn, validateGameResult, handleAddGameResult);

router.get('/get-games-result', handleGetGameResult);

router.get('/get-latest-result', handleGetlatestresult);

router.delete('/delete-game/:gameId', handleDeleteGame);

router.delete('/log-out', IsLogIn, isLogOut);



module.exports = router