var room = HBInit({
	roomName: "Basic Real Soccer",
	public: true,
	maxPlayers: 10,
	noPlayer: false,
	playerName: "Referee"
});


var BALL_RADIUS = 10;
var PLAYER_RADIUS = 15;
var KICK_PAUSE = 7;
var PENALTY_TH = 0.0001;

var COLOR = {
	RED: 0xd11141,
	BLUE: 0x00aedb
};

var STADIUM_SIZE = {
	width: 700,
	height: 320
};

var GOALPOST_POS_ABS = {
	x: 700,
	y: 100
};

var CORNER_POS_ABS = {
	x: STADIUM_SIZE.width - BALL_RADIUS,
	y: STADIUM_SIZE.height - BALL_RADIUS
};

var GOALKICK_POS_ABS = {
	x: 600,
	y: 0
};

var THROWIN_POS_ABS = {
	x: 0,
	y: STADIUM_SIZE.height - BALL_RADIUS
};

var GOALAREA_POS_ABS = {
	x: 550,
	y: 150
};

var CORNER_AREA_ABS = {
	x: 550,
	y: 170
};

var PENALTY_AREA_ABS = {
	x: 400,
	y: 150
};

var PENALTY_POS_ABS = {
	x: 450,
	y: 0
};

var PENALTY_RESPAWN = {
	x: 350,
	y: 0
};

var THROWIN_RESPAWN = {
	x: 0,
	y: 250
};

var CORNER_RESPAWN = {
	x: 650,
	y: 150
};

var GOALKICK_RESPAWN = {
	x: 500,
	y: 0
};

var KICK_TYPE = {
	GOAL_KICK: 0,
	CORNER_KICK: 1,
	THROW_IN: 2,
	PENALTY_KICK: 3
};

var SIDE = {
	RED: -1,
	BLUE: 1
};

var TEAM = {
	RED: 1,
	BLUE: 2
};

var lastTouch = 0;
var ballInPlay = 1;
var outOfTime = 0;
var lastTimeInPlay = 0;

var stadium = '{ "name": "Huge3.2", "width": 800, "height": 400, "spawnDistance": 350, "bg": { "type": "grass", "width": 700, "height": 320, "kickOffRadius": 80, "cornerRadius": 0 }, "vertexes": [ { "x": -700, "y": 320, "trait": "ballArea" }, { "x": -700, "y": 100, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "trait": "ballArea" }, { "x": -700, "y": -100, "cMask": [ "c1", "c3" ], "trait": "ballArea", "color": "ffffff", "vis": true }, { "x": -700, "y": -320, "trait": "ballArea" }, { "x": 700, "y": 320, "trait": "ballArea" }, { "x": 700, "y": 100, "trait": "ballArea" }, { "x": 700, "y": -100, "trait": "ballArea" }, { "x": 700, "y": -320, "trait": "ballArea" }, { "x": 0, "y": 400, "trait": "kickOffBarrier" }, { "x": 0, "y": 80, "trait": "kickOffBarrier" }, { "x": 0, "y": -80, "trait": "kickOffBarrier" }, { "x": 0, "y": -400, "trait": "kickOffBarrier" }, { "x": -710, "y": -100, "cMask": [ "all" ], "trait": "goalNet" }, { "x": -730, "y": -80, "cMask": [ "all" ], "trait": "goalNet" }, { "x": -730, "y": 80, "cMask": [ "all" ], "trait": "goalNet" }, { "x": -710, "y": 100, "cMask": [ "all" ], "trait": "goalNet" }, { "x": 710, "y": -100, "cMask": [ "all" ], "trait": "goalNet" }, { "x": 730, "y": -80, "cMask": [ "all" ], "trait": "goalNet" }, { "x": 730, "y": 80, "cMask": [ "all" ], "trait": "goalNet" }, { "x": 710, "y": 100, "cMask": [ "all" ], "trait": "goalNet" }, { "x": -800, "y": -250, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "color": "000000", "vis": false }, { "x": 800, "y": -250, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "color": "000000", "vis": false }, { "x": -800, "y": 250, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "color": "000000", "vis": false }, { "x": 800, "y": 250, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "color": "000000", "vis": false }, { "x": -700, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "ffffff", "vis": true }, { "x": -550, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 700, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 550, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": -700, "y": 150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": -550, "y": 150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 700, "y": 150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 550, "y": 150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": -550, "y": 150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 550, "y": 150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": -700, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": true }, { "x": -550, "y": 320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": false }, { "x": 700, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": true }, { "x": 550, "y": 320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": true }, { "x": 700, "y": -170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": false }, { "x": 550, "y": -320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": true }, { "x": -700, "y": -170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": false }, { "x": -550, "y": -320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": false }, { "x": -550, "y": -150, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "curve": 180, "vis": true, "color": "FFFFFF" }, { "x": -550, "y": 150, "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "curve": 180, "vis": true, "color": "FFFFFF" }, { "x": -550, "y": -150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "curve": 180, "vis": true, "_data": { "mirror": {} } }, { "x": -550, "y": 150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "curve": 180, "vis": true, "_data": { "mirror": {} } }, { "x": -550, "y": -150, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": true, "curve": 180, "_data": { "mirror": {} } }, { "x": -550, "y": 150, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": true, "curve": 180, "_data": { "mirror": {} } }, { "x": -680, "y": -400, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": false }, { "x": -680, "y": 400, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": false }, { "x": 680, "y": -400, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": false }, { "x": 680, "y": 400, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": false }, { "x": -800, "y": -170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": -550, "y": -400, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": 550, "y": -320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": false }, { "x": 550, "y": -400, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": -700, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": -90, "vis": false }, { "x": -800, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": -550, "y": 400, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": 550, "y": 320, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": false }, { "x": 550, "y": 400, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": 800, "y": -170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": 700, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "curve": 90, "vis": false }, { "x": 800, "y": 170, "cMask": [ "c2" ], "cGroup": [ "wall" ], "vis": false }, { "x": 700, "y": -100, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "trait": "ballArea", "color": "ffffff", "vis": true }, { "x": 700, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "ffffff", "vis": true }, { "x": -700, "y": -100, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "trait": "ballArea", "color": "ffffff", "vis": true }, { "x": -700, "y": -150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "ffffff", "vis": true }, { "x": 700, "y": 100, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "trait": "ballArea" }, { "x": 700, "y": 150, "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "color": "FFFFFF", "vis": true }, { "x": 550, "y": -150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "curve": 180, "vis": true, "_data": { "mirror": {} } }, { "x": 550, "y": 150, "cMask": [ "c3" ], "cGroup": [ "wall" ], "curve": 180, "vis": true, "_data": { "mirror": {} } }, { "x": 550, "y": -150, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": true, "curve": -180, "_data": { "mirror": {} } }, { "x": 550, "y": 150, "cMask": [ "c1" ], "cGroup": [ "wall" ], "vis": true, "curve": -180, "_data": { "mirror": {} } } ], "segments": [ { "v0": 12, "v1": 13, "curve": -90, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 13, "v1": 14, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 14, "v1": 15, "curve": -90, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 16, "v1": 17, "curve": 90, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 17, "v1": 18, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 18, "v1": 19, "curve": 90, "cMask": [ "all" ], "trait": "goalNet" }, { "v0": 8, "v1": 9, "trait": "kickOffBarrier" }, { "v0": 9, "v1": 10, "curve": 180, "cGroup": [ "blueKO" ], "trait": "kickOffBarrier" }, { "v0": 9, "v1": 10, "curve": -180, "cGroup": [ "redKO" ], "trait": "kickOffBarrier" }, { "v0": 10, "v1": 11, "trait": "kickOffBarrier" }, { "v0": 20, "v1": 21, "vis": false, "color": "000000", "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "y": -250 }, { "v0": 22, "v1": 23, "vis": false, "color": "000000", "bCoef": 0.5, "cMask": [ "c0" ], "cGroup": [ "wall" ], "trait": "goalPost", "y": 250, "x": -800 }, { "v0": 24, "v1": 25, "vis": true, "color": "FFFFFF", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 26, "v1": 27, "vis": true, "color": "FFFFFF", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 28, "v1": 29, "vis": true, "color": "FFFFFF", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 30, "v1": 31, "vis": true, "color": "FFFFFF", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 34, "v1": 35, "curve": 90, "vis": true, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 36, "v1": 37, "curve": -90, "vis": true, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 38, "v1": 39, "curve": 90, "vis": true, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 40, "v1": 41, "curve": -90, "vis": true, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 46, "v1": 47, "curve": 180, "vis": true, "color": "FFFFFF", "cMask": [ "c1" ], "cGroup": [ "wall" ], "x": -550, "_data": { "mirror": {}, "arc": { "a": [ -550, -150 ], "b": [ -550, 150 ], "curve": 180, "radius": 150, "center": [ -550, 0 ], "from": -1.5707963267948966, "to": 1.5707963267948966 } } }, { "v0": 48, "v1": 49, "vis": false, "cMask": [ "c1" ], "cGroup": [ "wall" ], "x": -680 }, { "v0": 50, "v1": 51, "vis": false, "cMask": [ "c1" ], "cGroup": [ "wall" ], "x": 680 }, { "v0": 40, "v1": 52, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 41, "v1": 53, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 54, "v1": 55, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ], "x": 550 }, { "v0": 56, "v1": 57, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ], "y": 170 }, { "v0": 35, "v1": 58, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 59, "v1": 60, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ], "x": 550 }, { "v0": 38, "v1": 61, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ] }, { "v0": 62, "v1": 63, "vis": false, "color": "FFFFFF", "cMask": [ "c2" ], "cGroup": [ "wall" ], "y": 170 }, { "v0": 24, "v1": 2, "vis": true, "color": "ffffff", "cMask": [ "c1", "c3" ] }, { "v0": 65, "v1": 64, "vis": true, "color": "ffffff", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "x": 700 }, { "v0": 67, "v1": 66, "vis": true, "color": "ffffff", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 1, "v1": 28, "vis": true, "color": "ffffff", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ] }, { "v0": 68, "v1": 69, "vis": true, "color": "ffffff", "cMask": [ "c1", "c3" ], "cGroup": [ "wall" ], "x": 700 }, { "v0": 45, "v1": 44, "vis": true, "color": "FFFFFF", "cMask": [ "c3" ], "cGroup": [ "wall" ], "_data": { "mirror": {}, "arc": { "a": [ -550, 150 ], "b": [ -550, -150 ], "radius": null, "center": [ null, null ], "from": null, "to": null } } }, { "v0": 71, "v1": 70, "vis": true, "color": "FFFFFF", "cMask": [ "c3" ], "cGroup": [ "wall" ], "x": 550, "_data": { "mirror": {}, "arc": { "a": [ 550, 150 ], "b": [ 550, -150 ], "radius": null, "center": [ null, null ], "from": null, "to": null } } }, { "v0": 72, "v1": 73, "curve": -180, "vis": true, "color": "FFFFFF", "cMask": [ "c1" ], "cGroup": [ "wall" ], "x": 550, "_data": { "mirror": {}, "arc": { "a": [ 550, -150 ], "b": [ 550, 150 ], "curve": -180, "radius": 150, "center": [ 550, 0 ], "from": 1.5707963267948966, "to": -1.5707963267948966 } } } ], "goals": [ { "p0": [ -700, -100 ], "p1": [ -700, 100 ], "team": "red" }, { "p0": [ 700, 100 ], "p1": [ 700, -100 ], "team": "blue" } ], "discs": [ { "pos": [ -700, 100 ], "color": "FFCCCC", "trait": "goalPost" }, { "pos": [ -700, -100 ], "color": "FFCCCC", "trait": "goalPost" }, { "pos": [ 700, 100 ], "color": "CCCCFF", "trait": "goalPost" }, { "pos": [ 700, -100 ], "color": "CCCCFF", "trait": "goalPost" } ], "planes": [ { "normal": [ 0, 1 ], "dist": -400, "bCoef": 0.1, "_data": { "extremes": { "normal": [ 0, 1 ], "dist": -400, "canvas_rect": [ -892, -400, 893, 400 ], "a": [ -892, -400 ], "b": [ 893, -400 ] } } }, { "normal": [ 0, -1 ], "dist": -400, "bCoef": 0.1, "_data": { "extremes": { "normal": [ 0, -1 ], "dist": -400, "canvas_rect": [ -892, -400, 893, 400 ], "a": [ -892, 400 ], "b": [ 893, 400 ] } } }, { "normal": [ 1, 0 ], "dist": -800, "bCoef": 0.1, "_data": { "extremes": { "normal": [ 1, 0 ], "dist": -800, "canvas_rect": [ -892, -400, 893, 400 ], "a": [ -800, -400 ], "b": [ -800, 400 ] } } }, { "normal": [ -1, 0 ], "dist": -800, "bCoef": 0.1, "_data": { "extremes": { "normal": [ -1, 0 ], "dist": -800, "canvas_rect": [ -892, -400, 893, 400 ], "a": [ 800, -400 ], "b": [ 800, 400 ] } } } ], "traits": { "ballArea": { "vis": false, "bCoef": 1, "cMask": [ "ball" ] }, "goalPost": { "radius": 8, "invMass": 0, "bCoef": 0.5 }, "goalNet": { "vis": true, "bCoef": 0.1, "cMask": [ "ball" ] }, "kickOffBarrier": { "vis": false, "bCoef": 0.1, "cGroup": [ "redKO", "blueKO" ], "cMask": [ "red", "blue" ] } }, "joints": [], "redSpawnPoints": [], "blueSpawnPoints": [], "cameraWidth": 0, "cameraHeight": 0, "maxViewWidth": 0, "cameraFollow": "ball", "canBeStored": false, "kickOffReset": "partial", "playerPhysics": { "radius": 15, "bCoef": 0.5, "invMass": 0.5, "damping": 0.96, "cGroup": [ "red", "blue" ], "acceleration": 0.1, "gravity": [ 0, 0 ], "kickingAcceleration": 0.07, "kickingDamping": 0.96, "kickStrength": 5, "kickback": 0 }, "ballPhysics": { "radius": 10, "bCoef": 0.5, "cMask": [ "all" ], "damping": 0.99, "invMass": 1, "gravity": [ 0, 0 ], "color": "ffffff", "cGroup": [ "ball" ] } }';

room.setCustomStadium(stadium);
room.setTeamColors(1, 0, 0xFFFFFF, [0xD83A37, 0x2C0E0A, 0xD83A37]);
room.setTeamColors(2, 0, 0xEEDD77, [0x114F9C, 0x282E44, 0x114F9C]);
room.setScoreLimit(3);
room.setTimeLimit(3);

function updateAdmins() {
	var players = room.getPlayerList().slice(1);
	if (players.length == 0)
		return; // No players left, do nothing.
	if (players.find((player) => player.admin) != null)
		return; // There's an admin left so do nothing.
	room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

function setKick(kickType, team, sideX, sideY) {
	var ballPos = room.getBallPosition();
	var checkFun;
	var respawnPoint;
	var useRespawn = {
		x: true,
		y: true
	};
	var respawnTeams = [];
	var cf = room.CollisionFlags;
	var cg;

	switch (kickType) {
		case KICK_TYPE.CORNER_KICK:
			room.setDiscProperties(0, {
				x: CORNER_POS_ABS.x * sideX,
				y: CORNER_POS_ABS.y * sideY,
				xspeed: 0,
				yspeed: 0
			});

			checkFun = cornerPosCheck;
			respawnPoint = CORNER_RESPAWN;
			useRespawn.x = true;
			useRespawn.y = true;
			respawnTeams = [getOpposingTeam(team)];
			cg = cf.c2;

			break;

		case KICK_TYPE.GOAL_KICK:
			room.setDiscProperties(0, {
				x: GOALKICK_POS_ABS.x * sideX,
				y: GOALKICK_POS_ABS.y,
				xspeed: 0,
				yspeed: 0
			});

			checkFun = goalKickPosCheck;
			respawnPoint = GOALKICK_RESPAWN;
			useRespawn.x = true;
			useRespawn.y = false;
			respawnTeams = [getOpposingTeam(team)];
			cg = cf.c3;

			break;

		case KICK_TYPE.THROW_IN:

			room.setDiscProperties(0, {
				x: ballPos.x,
				y: (THROWIN_POS_ABS.y * sideY),
				xspeed: 0,
				yspeed: 0
			});

			checkFun = throwInPosCheck;
			respawnPoint = THROWIN_RESPAWN;
			useRespawn.x = false;
			useRespawn.y = true;
			respawnTeams = [getOpposingTeam(team)];
			cg = cf.c0;

			break;

		case KICK_TYPE.PENALTY_KICK:
			room.setDiscProperties(0, {
				x: (PENALTY_POS_ABS.x * sideX),
				y: PENALTY_POS_ABS.y,
				xspeed: 0,
				yspeed: 0
			});

			checkFun = penaltyPosCheck;
			respawnPoint = PENALTY_RESPAWN;
			useRespawn.x = true;
			useRespawn.y = false;
			respawnTeams = [TEAM.RED, TEAM.BLUE];
			cg = cf.c1;

			break;

		default:
			break;
	}

	movePlayers(checkFun, respawnPoint, useRespawn, respawnTeams, sideX, sideY, cg);

	if (kickType != KICK_TYPE.PENALTY_KICK)
		return;

	setUpPenaltyKick(team, sideX);
}

function setUpPenaltyKick(team, sideX) {
	var players = room.getPlayerList();
	var shooter = players.find(player => (player.team == team));
	var goalie = players.find(player => (player.team == getOpposingTeam(team)));

	if ((goalie == null) || (shooter == null))
		return;

	room.setPlayerDiscProperties(shooter.id, {
		x: PENALTY_POS_ABS.x * sideX - PLAYER_RADIUS,
		y: PENALTY_POS_ABS.y,
		xspeed: 0,
		yspeed: 0
	});

	room.setPlayerDiscProperties(goalie.id, {
		x: STADIUM_SIZE.width * sideX,
		y: 0,
		xspeed: 0,
		yspeed: 0
	});
}

function movePlayers(checkFun, respawnPoint, useRespawn, respawnTeams, sideX, sideY, cg) {
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) { // Iterate over all the players
		var player = players[i];

		if (player.position == null) continue; // Skip players that don't have a position

		if (!(respawnTeams.includes(player.team)))
			continue;

		var discProps = room.getPlayerDiscProperties(player.id);

		room.setPlayerDiscProperties(player.id, {
			cGroup: discProps.cGroup | cg
		});

		if (checkFun(player.position, sideX, sideY))
			continue;

		room.setPlayerDiscProperties(player.id, {
			x: discProps.x * !useRespawn.x + respawnPoint.x * useRespawn.x * sideX - PLAYER_RADIUS * 2 * useRespawn.x,
			y: discProps.y * !useRespawn.y + respawnPoint.y * useRespawn.y * sideY - PLAYER_RADIUS * 2 * useRespawn.y,
			xspeed: 0,
			yspeed: 0
		});
	}
}

function cornerPosCheck(pos, sideX, sideY) {
	if ((pos.x * sideX) <= 0)
		return true;

	if ((pos.y * sideY) <= 0)
		return true;

	if ((Math.abs(pos.y) < (CORNER_AREA_ABS.y - PLAYER_RADIUS)) || ((Math.abs(pos.x) < (CORNER_AREA_ABS.x - PLAYER_RADIUS))))
		return true;

	return false;
}

function penaltyPosCheck(pos, sideX, sideY) {
	if ((pos.x * sideX) <= 0)
		return true;

	if ((Math.abs(pos.y) > (PENALTY_AREA_ABS.y + PLAYER_RADIUS)) || (Math.abs(pos.x) < (PENALTY_AREA_ABS.x - PLAYER_RADIUS)))
		return true;

	return false;
}

function goalKickPosCheck(pos, sideX, sideY) {
	if ((pos.x * sideX) <= 0)
		return true;

	if ((Math.abs(pos.y) > (GOALAREA_POS_ABS.y + PLAYER_RADIUS)) || (Math.abs(pos.x) < (GOALAREA_POS_ABS.x - PLAYER_RADIUS)))
		return true;

	return false;
}

function throwInPosCheck(pos, sideX, sideY) {
	if ((pos.y * sideY) <= 0)
		return true;

	if (Math.abs(pos.y) < (THROWIN_RESPAWN.y - PLAYER_RADIUS))
		return true;

	return false;
}

function checkBallOutBack(ballPos) {

	// check if the ball is out, goal side

	var color;

	var sideX, sideY;

	if (Math.abs(ballPos.x) < (STADIUM_SIZE.width + BALL_RADIUS))
		return;

	if (Math.abs(ballPos.y) < (GOALPOST_POS_ABS.y + BALL_RADIUS))
		return;

	sideX = ballPos.x / Math.abs(ballPos.x);
	sideY = ballPos.y / Math.abs(ballPos.y);

	color = (lastTouch == TEAM.RED) ? COLOR.BLUE : COLOR.RED;

	if (sideX == SIDE.RED) {
		if (lastTouch == TEAM.RED) {
			// corner kick for blue
			setKick(KICK_TYPE.CORNER_KICK, TEAM.BLUE, sideX, sideY);
		}
		else {
			// goal kick for red
			setKick(KICK_TYPE.GOAL_KICK, TEAM.RED, sideX, sideY);
		}
	}
	else if (sideX == SIDE.BLUE) {
		if (lastTouch == TEAM.BLUE) {
			// corner kick for red
			setKick(KICK_TYPE.CORNER_KICK, TEAM.RED, sideX, sideY);
		}
		else {
			// goal kick for blue
			setKick(KICK_TYPE.GOAL_KICK, TEAM.BLUE, sideX, sideY);
		}

	}

	setBallOutOfPlay(color);
}

function checkBallOutSide(ballPos) {
	if ((Math.abs(ballPos.y) < (STADIUM_SIZE.height + BALL_RADIUS)))
		return;

	var sideY = ballPos.y / Math.abs(ballPos.y);
	var team = (lastTouch == TEAM.RED) ? TEAM.BLUE : TEAM.RED;
	var color = (lastTouch == TEAM.RED) ? COLOR.BLUE : COLOR.RED;

	setKick(KICK_TYPE.THROW_IN, team, 1, sideY);
	setBallOutOfPlay(color);
}

function checkPenalty(ballPos) {
	if ((Math.abs(ballPos.x) < GOALAREA_POS_ABS.x) || (Math.abs(ballPos.x) > STADIUM_SIZE.width))
		return;

	if ((Math.abs(ballPos.y) > GOALAREA_POS_ABS.y))
		return;

	if (!ballInPlay)
		return;

	var penalty = (Math.random() < PENALTY_TH);

	if (!penalty)
		return;

	var sideX = ballPos.x / Math.abs(ballPos.x);
	var color = (sideX == SIDE.RED) ? COLOR.BLUE : COLOR.RED;
	var team = (sideX == SIDE.RED) ? TEAM.BLUE : TEAM.RED;

	setKick(KICK_TYPE.PENALTY_KICK, team, sideX, 1);

	setBallOutOfPlay(color);
}

function checkBallOut() {
	var ballPos = room.getBallPosition();
	checkBallOutBack(ballPos);
	checkBallOutSide(ballPos);
	checkPenalty(ballPos);
}

function updateLastTouch() {
	var players = room.getPlayerList();
	var ballPosition = room.getBallPosition();
	var ballRadius = 10;
	var playerRadius = 15;
	var triggerDistance = ballRadius + playerRadius + 0.01;

	for (var i = 0; i < players.length; i++) { // Iterate over all the players
		var player = players[i];
		if (player.position == null) continue; // Skip players that don't have a position

		var distanceToBall = pointDistance(player.position, ballPosition);

		if (distanceToBall < triggerDistance) {
			if (player.team != lastTouch) {
				lastTouch = player.team;
			}
		}
	}
}

function resetCollisionGroups() {
	var players = room.getPlayerList();

	for (var i = 0; i < players.length; i++) { // Iterate over all the players
		var player = players[i];

		if (player.position == null) continue; // Skip players that don't have a position

		var cf = room.CollisionFlags;
		var teamCf = (player.team == TEAM.RED) ? cf.red : cf.blue;

		room.setPlayerDiscProperties(player.id, {
			cGroup: teamCf
		});
	}
}

function setBallOutOfPlay(color) {
	var cf = room.CollisionFlags;

	room.setDiscProperties(0, {
		cMask: cf.all ^ (cf.blue | cf.red),
		color: color,
	});

	var time = room.getScores().time;

	lastTimeInPlay = time;
	ballInPlay = 0;
}

function setBallInPlay() {
	var cf = room.CollisionFlags;

	room.setDiscProperties(0, {
		cMask: cf.all,
		color: 0xFFFFFF
	});
	ballInPlay = 1;
	outOfTime = 0;
}

function updateBallInPlay() {
	if (ballInPlay || outOfTime)
		return;

	var time = room.getScores().time;
	var timer = time - lastTimeInPlay;

	if (timer > KICK_PAUSE) // reset normal playing conditions
	{
		resetCollisionGroups();
		outOfTime = 1;
	}
}

function pointDistance(p1, p2) {
	var d1 = p1.x - p2.x;
	var d2 = p1.y - p2.y;
	return Math.sqrt(d1 * d1 + d2 * d2);
}

function getOpposingTeam(team) {
	return (team == TEAM.RED) ? TEAM.BLUE : TEAM.RED;
}

room.onPlayerBallKick = function (player) {
	if (ballInPlay)
		return;

	setBallInPlay();
	resetCollisionGroups();
}

room.onGameTick = function () {
	updateLastTouch();
	checkBallOut();
	updateBallInPlay();
}

room.onPlayerJoin = function (player) {
	updateAdmins();
}

room.onPlayerLeave = function (player) {
	updateAdmins();
}
