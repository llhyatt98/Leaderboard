// Interfaces
interface playerScoreItem {
    id: number;
    roundScores: Array<number>
}

interface playerItem {
    id: number;
    name: string;
}

interface leaderboardRow {
    id: number; // unique identifier for players
    name: string; // name of player
    score: number; // sum of roundScores
    winner: boolean; // true if player has lowest score
}

// helper for finding sum of roundScores
const reducer = (acc, a) => {
    return acc + a;
}

const generateLeaderboard = (playerScores: Array<playerScoreItem>, playerNames: Array<playerItem>): Array<leaderboardRow>=> {
    /*
        Method which generates a leaderboard consisting of n rows (leaderboardRow)
        n: Length of playerScores/playerNames - players with null roundScores

        Params:
            playerScores: Array of playerScoreItems,
            playerNames: Array of playerItems

        Return:
            A leaderboard sorted by score (greatest to least) with null roundScores removed.
    */

    // Each player should have a playerScoreItem (even if null) and there should be input
    if(playerScores.length !== playerNames.length || playerScores.length === 0 || playerNames.length === 0){ 
        console.log("Error with input data!");
        return null; 
    }

    const leaderboard: Array<leaderboardRow> = playerNames.map((player: playerItem) => {
        // find an index for the playerScores data for this player
        const index = playerScores.findIndex((score: playerScoreItem) => score.id === player.id);

        let score;
        if(!playerScores[index].roundScores){
            return; // returns undefined
        } else {
            score = playerScores[index].roundScores.reduce(reducer); // sum of roundScores
        }

        // returns a leaderboardRow
        return { ...player, score, winner: false };
    })
    .filter(row => row !== undefined) // remove all null scores
    .sort((a, b) => a.score - b.score); // sort by score least to greatest (lowest scores first)

    leaderboard[leaderboard.length - 1].winner = true; // assigning winner (nothing stated about multiple winners)
    
    // log for testing purposes
    console.log("Leaderboard:", leaderboard);

    return leaderboard;
};

// --------------- testing ---------------

// Example dataset 1
const playerScores = [ // playerScores
    {id: 5, roundScores: [1, 1, 1, 0]},
    {id: 2, roundScores: [-2, -1, -1, -1]},
    {id: 6, roundScores: null},
    {id: 3, roundScores: [0, 0, -2, -1]},
    {id: 4, roundScores: [0, 0, -1, -1]},
    {id: 1, roundScores: [1, 0, -2, -1]},
];

const playerNames = [ // playerNames
    {id: 4, name: "Bob"},
    {id: 5, name: "Ann"},
    {id: 1, name: "Joe"},
    {id: 2, name: "Sue"},
    {id: 3, name: "Jane"},
    {id: 6, name: "Larry"},
];

// Example dataset 2 - invalid input
const playerScores1 = [ // playerScores
];
  
const playerNames1 = [ // playerNames
    {id: 4, name: "Bob"},
    {id: 5, name: "Ann"},
    {id: 1, name: "Joe"},
    {id: 2, name: "Sue"},
    {id: 3, name: "Jane"},
    {id: 6, name: "Larry"},
];

// Example dataset 3 - missing players edge case
const playerScores2 = [ // playerScores
    {id: 5, roundScores: [1, 1, 1, 0]},
    {id: 2, roundScores: [-2, -1, -1, -1]},
    {id: 6, roundScores: null},
    {id: 3, roundScores: [0, 0, -2, -1]},
    {id: 4, roundScores: [0, 0, -1, -1]},
    {id: 1, roundScores: [1, 0, -2, -1]},
];
  
const playerNames2 = [ // playerNames
    {id: 2, name: "Sue"},
    {id: 3, name: "Jane"},
    {id: 6, name: "Larry"},
];
generateLeaderboard(playerScores, playerNames);
generateLeaderboard(playerScores1, playerNames1); // error
generateLeaderboard(playerScores2, playerNames2); // error