// document.addEventListener("DOMContentLoaded", function () {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter/";
var FORM = document.getElementById("form");
FORM.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var SEND_REQUEST, test;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                if (!FORM.checkValidity()) {
                    alert('Please fill out all required fields.');
                    return [2 /*return*/];
                }
                SEND_REQUEST = {
                    // position: (FORM.elements.namedItem('select') as HTMLSelectElement).value,
                    position: "PG",
                    twoPercent: 4,
                    // twoPercent: + ((FORM.elements.namedItem('towpercent') as HTMLInputElement).value),
                    threePercent: 30,
                    // threePercent: + ((FORM.elements.namedItem('threepercent') as HTMLInputElement).value),
                    points: 10000
                    // points: + ((FORM.elements.namedItem('points') as HTMLInputElement).value),
                };
                return [4 /*yield*/, getPlayers(SEND_REQUEST)];
            case 1:
                test = _a.sent();
                console.log("testttt", test);
                return [2 /*return*/];
        }
    });
}); });
function getPlayers(sendRequest) {
    return __awaiter(this, void 0, void 0, function () {
        var response, players, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BASE_URL, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(sendRequest)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to send player");
                    }
                    console.log(response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    players = _a.sent();
                    renderPlayers(players);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Server is unavailable.', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderPlayers(players) {
    var playersTable = document.getElementById('tbody');
    playersTable.innerHTML = '';
    players.forEach(function (player) {
        var playerForACtion = {
            position: player.position,
            twoPercent: player.twoPercent,
            threePercent: player.threePercent,
            points: player.points,
            playerName: player.playerName,
        };
        var newRow = document.createElement('tr');
        var playerField = document.createElement('td');
        playerField.className = "td";
        playerField.textContent = player.playerName;
        var positionField = document.createElement('td');
        positionField.className = "td";
        positionField.textContent = player.position;
        var pointsField = document.createElement('td');
        pointsField.className = "td";
        pointsField.textContent = player.points.toString();
        var fgField = document.createElement('td');
        fgField.className = "td";
        fgField.textContent = player.twoPercent.toString();
        var threeField = document.createElement('td');
        threeField.className = "td";
        threeField.textContent = player.threePercent.toString();
        var acField = document.createElement('td');
        acField.className = "td";
        var addButton = document.createElement('button');
        addButton.className = 'actButton';
        addButton.innerText = "Add ".concat(player.playerName, " to Current Team");
        addButton.addEventListener('click', function () { return addPlayerToDiv(playerForACtion); });
        acField.appendChild(addButton);
        newRow.append(playerField, positionField, pointsField, fgField, threeField, acField);
        playersTable.appendChild(newRow);
    });
}
function addPlayerToDiv(player) {
    if (player) {
        var currentPosition = player.position;
        var currentDiv = document.getElementById(currentPosition);
        var para = document.createElement('p');
        para.innerHTML = "\n    <p>".concat(player.playerName, "</p>\n    <p>").concat("Three Percent:" + " " + player.threePercent, "</p>\n    <p>").concat("Two Percent:" + " " + player.twoPercent, "</p>\n    <p>").concat("Points:" + " " + player.points, "</p>\n    ");
        // `
        // <p>${player.playerName}</p>
        // <p>${player.threePercent}</p>
        // <p>${player.twoPercent }</p>
        // <p>${player.points}</p>
        // `;
        currentDiv === null || currentDiv === void 0 ? void 0 : currentDiv.innerText = '';
        currentDiv.appendChild(para);
    }
}
