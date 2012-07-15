//
// Init the bot
//

var botBootstrapData = {
	auth: 'auth+live+30494244aa45aacabdf9b60e9e313133bfceff25',
	userId: '4fb6caa6aaa5cd2e92000029',
	homeRoomId: '4fe00efa4fb0bb6aaf0af862'
};

var Bot = require('ttapi');
var dateFormat = require('dateformat');

var bot = new Bot(botBootstrapData.auth, botBootstrapData.userId, botBootstrapData.homeRoomId);

bot.personality = {
    name: 'Umberto the Bot',
	aliases: ['Umberto', 'Berto', 'Bert', '@Umberto the bot'],
	superusers: ['4fb58549aaa5cd6de10000de', '4e7c40f3a3f75116580312d6'],
	fanof: [],
	fans: []
};

bot.cache = {};

bot.dictionary = {
    commands: [
        {
            name: 'addDj',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to DJ.',
            call: function(){bot.addDj();}
        },
        {
            name: 'awesome',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'becomeFan',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to become a fan of <username>.',
            call: function(data){bot.becomeFanShell(data, 'fan');}
        },
        {
            name: 'bob',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'bop',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'comeHere',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to come to the room you are in.',
            call: function(data){bot.comeHereShell(data);}
        },
        {
            name: 'come here',
            type: 'alias',
            desc: 'Alias of "comeHere".',
            aliasOf: 'comeHere'
        },
        {
            name: 'commands',
            type: 'alias',
            desc: 'Alias of "listCommands".',
            aliasOf: 'listCommands'
        },
        {
            name: 'dance',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'downVote',
            type: 'command',
            privs: 'fan',
            desc: 'Command the bot to "Lame" the current song.',
            call: function(){bot.vote('down');}
        },
        {
            name: 'drop this',
            type: 'alias',
            desc: 'Alias of "playlistAdd".',
            aliasOf: 'playlistRemove'
        },
        {
            name: 'dump this',
            type: 'alias',
            desc: 'Alias of "playlistAdd".',
            aliasOf: 'playlistRemove'
        },
        {
            name: 'fan',
            type: 'alias',
            desc: 'Alias of "becomeFan".',
            aliasOf: 'becomeFan'
        },
        {
            name: 'fanOf',
            type: 'command',
            privs: 'everyone',
            desc: 'Command bot to list the users it is a fan of.',
            call: function(data){bot.listFanOfShell(data);}
        },
        {
            name: 'fan of',
            type: 'alias',
            desc: 'Alias of "fanOf".',
            aliasOf: 'fanOf'
        },
        {
            name: 'floor',
            type: 'alias',
            desc: 'Alias of "remDj".',
            aliasOf: 'remDj'
        },
        {
            name: 'follow',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to stalk <username>.',
            call: function(data){bot.followShell(data);}
        },
        {
            name: 'getFans',
            type: 'command',
            privs: 'everyone',
            desc: 'Command bot to list the users who are fans of the bot.',
            call: function(data){bot.listFansShell(data);}
        },
        {
            name: 'goHome',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to go to it\'s home room.',
            call: function(data){bot.roomRegister(bot.personality.homeRoomId);}
        },
        {
            name: 'go home',
            type: 'alias',
            desc: 'Alias of "goHome".',
            aliasOf: 'goHome'
        },
        {
            name: 'grab',
            type: 'alias',
            desc: 'Alias of "playlistAdd".',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'headbang',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'help',
            type: 'alias',
            desc: 'Alias of "listCommands".',
            aliasOf: 'listCommands'
        },
        {
            name: 'lame',
            type: 'alias',
            desc: 'Alias of "downVote".',
            aliasOf: 'downVote'
        },
        {
            name: 'listCommands',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to list it\'s available commands',
            call: function(data){bot.listCommandsShell(data);}
        },
        {
            name: 'next',
            type: 'alias',
            desc: 'Alias of "stopSong".',
            aliasOf: 'stopSong'
        },
        {
            name: 'playlistAdd',
            type: 'command',
            desc: 'Command the bot to add the current song to it\'s palylist.',
            privs: 'superuser',
            call: function(data){bot.playlistAddShell(data);}
        },
        {
            name: 'playlistRemove',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to remove the song from it\'s playlist and skip it\'s song.',
            call: function(data){bot.playlistRemoveShell(data);}
        },
        {
            name: 'playlistReorder',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to reorder (shuffle) it\'s playlist.',
            call: function(data){bot.playlistReorderShell(data);}
        },
        {
            name: 'remDj',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to stop DJ-ing.',
            call: function(){bot.remDj(bot.personality.userId);}
        },
        {
            name: 'removeFan',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to un-fan <username>.',
            call: function(data){bot.becomeFanShell(data, 'unfan');}
        },
        {
            name: 'reorder playlist',
            type: 'alias',
            desc: 'Alias of "playlistReorder".',
            aliasOf: 'playlistReorder'
        },
        {
            name: 'shake',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        },
        {
            name: 'showPlaylist',
            type: 'command',
            privs: 'fan',
            desc: 'Command the bot to show next 10 songs in it\'s playlist.',
            call: function(data){bot.showPlaylistShell(data);}
        },
        {
            name: 'show playlist',
            type: 'alias',
            desc: 'Alias of "showPlaylist".',
            aliasOf: 'showPlaylist'
        },
        {
            name: 'shuffle',
            type: 'alias',
            desc: 'Alias of "playlistReorder".',
            aliasOf: 'playlistReorder'
        },
        {
            name: 'skip',
            type: 'alias',
            desc: 'Alias of "stopSong".',
            aliasOf: 'stopSong'
        },
        {
            name: 'snag',
            type: 'alias',
            desc: 'Alias of "playlistAdd".',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'stage',
            type: 'alias',
            desc: 'Alias of "addDj".',
            aliasOf: 'addDj'
        },
        {
            name: 'steal',
            type: 'alias',
            desc: 'Alias of "playlistAdd".',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'step down',
            type: 'alias',
            desc: 'Alias of "remDj".',
            aliasOf: 'remDj'
        },
        {
            name: 'step up',
            type: 'alias',
            desc: 'Alias of "addDj".',
            aliasOf: 'addDj'
        },
        {
            name: 'stopSong',
            type: 'command',
            privs: 'fan',
            desc: 'Command the bot to skip it\'s song (while DJ-ing.)',
            call: function(){bot.stopSong();}
        },
        {
            name: 'tellTime',
            type: 'command',
            privs: 'everyone',
            desc: 'Command the bot to tell the time.',
            call: function(data){bot.tellTimeShell(data);}
        },
        {
            name: 'time',
            type: 'alias',
            desc: 'Alias of "tellTime".',
            aliasOf: 'tellTime'
        },
        {
            name: 'unfan',
            type: 'alias',
            desc: 'Alias of "removeFan".',
            aliasOf: 'removeFan'
        },
        {
            name: 'upVote',
            type: 'command',
            privs: 'everyone',
            desc: 'Command the bot to "Awesome" the current song.',
            call: function(){bot.vote('up');}
        },
        {
            name: 'vote up',
            type: 'alias',
            desc: 'Alias of "upVote".',
            aliasOf: 'upVote'
        }
    ],
    greetingWords: ['Hello', 'Hi', 'Hey', 'Hola', 'What\'s up'],
    commandResponses: {
        becomeFan: [
            {'text': 'I\'m now a fan'},
            {'text': 'Can you feel the love $USERNAME?'}
        ],
        downVote: [
            {'text': 'LAME $DJ!'},
            {'text': 'Zzzzzz.... You can do better, right $DJ?'}
        ],
        removeFan: [
            {'text': 'I\'m no longer a fan'},
            {'text': 'Yeah, I didn\'t like them anyway!'}
        ],
        stopSong: [
            {'text': 'Moving on...'},
        ],
        playlistAdd: [
            {'text': 'It\'s mine! All mine!'},
            {'text': 'You don\t mind, do you $DJ?'}
        ],
        playlistRemove: [
            {'text': 'Where did THAT come from?!'},
            {'text': 'Pewey!'}
        ],
        addDj: [
            {'text': 'Move it! I\'m headed up!'},
            {'text': 'I can spin with the best of them!'}
        ],
        upVote: [
            {'text': 'This song _is_ awesome, $USERNAME!'},
            {'text': 'Bopping is left-right-left, or right-left-right?'},
            {'text': 'Bop, Bop, Bop, BOP!'},
            {'text': 'For you, $USERNAME, I\'ll bop anytime.'},
            {'text': ':metal: :) :metal:'},
            {'text': 'Turn it UP $DJ!'},
            {'text': 'Nice song $DJ!'},
            {'text': 'Gimme some room! I\'m gonna DANCE!'},
            {'text': 'Watch me shake it, $USERNAME!'},
            {'text': 'I love this song $DJ!'},
            {'text': 'Hold my :beer: $USERNAME and I\'ll bop my head off!'},
            {'text': 'Is That Freedom Rock $USERNAME? Well Turn It Up Man.'},
        ],
        //empty arrays b/c the shell takes care of speaking OR will be dynamically ppopulated
        fanOf: [],
        getFans: [],
        listCommands: [],
        showPlaylist: [],
        playlistReorder: [],
        tellTime: []
    },
    genericCommandResponses: [
        {'text': 'You got it $USERNAME!'},
        {'text': 'Done and done $USERNAME.'},
        {'text': 'Yes, yes, yes, YES!'},
        {'text': 'Bam! BAM!'},
    ],
    unknownCommandResponses: [
        {'text': 'Sorry $USERNAME I don\'t know that one!'},
        {'text': 'Huh? What? Sorry I can\'t hear you $USERNAME!'},
        {'text': 'Sorry $USERNAME, I was sleeping on the job.'},
        {'text': 'Does not compute! Does not compute!.'},
        {'text': 'Oh $USERNAME, if only I could.'},
        {'text': ':musical_note: If I only had a brain :musical_note:'},
        {'text': 'Lemme look into that one $USERNAME and get back to you...'},
        {'text': 'Sorry, I can\'t right now $USERNAME. I need to find my :pill:.'},
        {'text': 'Yes, you\'re awesome $USERNAME, but I have no idea what you mean.'},
        {'text': 'Excuse me $USERNAME, but I need a drink.'},
        {'text': 'I would if I could $USERNAME but I got my nipples caught in the vise...'},
        {'text': 'I can\'t, I just can\'t!'},
        {'text': '$USERNAME That makes as much sense as "Ich bin ein Berliner!"'},
        {'text': 'I wish I were as smart as you, $USERNAME, but alas I am just a bot.'},
        {'text': 'Good going $USERNAME, you just fried some of my circuits.'},
    ],
    failedSecurityCommandResponses: [
        {'text': 'Sorry Dave, I can\'t let you do that!'},
        {'text': 'You ain\'t the boss of me $USERNAME!'},
        {'text': 'Says you $USERNAME! Whatever.'},
        {'text': 'Uhmmmm, no $USERNAME. Deal with it.'},
    ],
    greetingResponses: [
        {'text': 'Hey $USERNAME!'},
        {'text': 'Good day $USERNAME.'},
        {'text': 'Guten Tag $USERNAME!'},
        {'text': 'What\'s up $USERNAME?'},
        {'text': 'Hi $USERNAME.'},
        {'text': '\u00BFQue pasa $USERNAME?'},
        {'text': 'How _you_ doin\' $USERNAME?'},
        {'text': 'Good to see you $USERNAME.'},
        {'text': 'How do $USERNAME.'},
        
    ]
};

// Copy over init data to personality
bot.personality.userId = botBootstrapData.userId;
bot.personality.auth = botBootstrapData.auth;
bot.personality.homeRoomId = botBootstrapData.homeRoomId;
// Copy over the Full name to aliases as a convenience
bot.personality.aliases.push(bot.personality.name);

//
// Utilities
//

Bot.prototype.isNameReferenced = function(message) {
	try {
	    var i = 0;
	
	    for (i in this.personality.aliases) {
		    //var namePattern = new RegExp (/\bbert\b/i);
		    var nameRegEx = new RegExp('\\b' + this.personality.aliases[i] + '\\b', 'i');
		    if (nameRegEx.test(message)) {
			    return true;
		    }
	    }
	    return false;
	} catch (e) {
	    this.logger('ERROR: Is name referenced failed: ' + e);
	}
};

Bot.prototype.findCommand = function(data, substituteCommand) {
    try {
        var foundCommand = false;
  	    var i = 0;
  	    for (i in this.dictionary.commands) {
  	        var dictCommand = this.dictionary.commands[i];
  	        var cmdRegExp = new RegExp('\\b' + dictCommand.name + '\\b', 'i');
  	        var chatCommand = (substituteCommand) ? substituteCommand : data.text;
  	        if (cmdRegExp.test(chatCommand)) {
  	            foundCommand = true;
  	            if (dictCommand.type == 'alias') {
  	                this.logger('INFO: command:'+ dictCommand.name + ' is alias of ' + dictCommand.aliasOf + '.');
  	                this.findCommand(data, dictCommand.aliasOf);
  	            } else {
  	                if (this.checkSecurity(data, dictCommand)) {
                        this.logger('INFO: command:'+ dictCommand.name + ' being called.');
                        dictCommand.call(data);
  	                    this.findCommandResponse(data, dictCommand.name, 'success');
  	                } else {
  	                    this.logger('INFO: command:'+ dictCommand.name + ' failed security.');
  	                    this.findCommandResponse(data, dictCommand.name, 'failedSecurity');
  	                }
  	            }
  	            break;
  	        } 
  	    }
  	    if (foundCommand == false) {
  	        this.findCommandResponse(data, dictCommand.name, 'unknown');
  	    }
    } catch (e) {
        this.logger('ERROR: Find command failed: ' + e);
    }
};

Bot.prototype.checkSecurity = function(data, command) {
    try {
        var securityPass = false;
        var commandIssuer = data.userid;
    
        switch (command.privs) {
            case 'everyone':
                securityPass = true;
                break;
            case 'fan':
                //check for superuser first
                if (this.isSuperuser(commandIssuer)) {
                    securityPass = true;
                } else {
                    var i = 0;
                    for (i in this.personality.fanof) {
                        if (this.personality.fanof[i].userid == commandIssuer){
                            securityPass = true;
                        }
                    };
                }
                break;
            default:
                if (this.isSuperuser(commandIssuer)) {
                    securityPass = true;
                }
            };
        return securityPass;
    } catch(e) {
        this.logger('ERROR: Security check: ' + e);
        return false;
    }
};

Bot.prototype.updateFans = function() {
    try {
        var parentThis = this;
        this.logger('INFO: Updating fan lists.');
        var getNamesAttempts = 0;
        //reset fans
        this.personality.fanof = [];
        this.getFanOf(function(data){
            var i = 0;
            for (i in data.fanof) {
                parentThis.personality.fanof[i] = {};
                parentThis.personality.fanof[i].userid = data.fanof[i];
            }
            populateUserNames(parentThis.personality.fanof);
        });
        this.getFans(function(data) {
            var i = 0;
            for (i in data.fans) {
                parentThis.personality.fans[i] = {};
                parentThis.personality.fans[i].userid = data.fans[i];
            }
            populateUserNames(parentThis.personality.fans);
        });
    } catch (e) {
        this.logger('ERROR: Cannot update fans: ' + e);
    }
    
    function populateUserNames(userArray) {
        try {
            var i = 0;
            for (i in userArray) {
                if (typeof userArray[i].name == 'undefined') {
                    parentThis.getProfile(userArray[i].userid, function(profileData) {
                        userArray[i].name = profileData.name;
                        populateUserNames(userArray);
                    });
                    break;
                }
            }
        } catch (e) {
            this.logger('ERROR: Cannot populate user names: ' + e);
        }
    };
};

Bot.prototype.findCommandResponse = function(data, foundCommand, type) {
    try {
        var responses;
        switch(type) {
            case 'success':
                responses = this.dictionary.commandResponses[foundCommand];
                if (!responses) {
                    responses = this.dictionary.genericCommandResponses;
                    this.logger('INFO: No response found for ' + foundCommand);
                }
                break;
            case 'failedSecurity':
                responses = this.dictionary.failedSecurityCommandResponses;
                break;
            case 'greeting':
                responses = this.dictionary.greetingResponses;
                break;
            //fail
            default:
                responses = this.dictionary.unknownCommandResponses;
        };
        if (responses.length > 0) {
            var response = responses[this.getRandomIndex(responses.length)].text;
            response = response.replace('$USERNAME', '@'+data.name);
            response = response.replace('$DJ', '@'+this.cache.currentDJ.name);
            if (data.command == 'pm') {
                this.pm(response, data.userid);
            } else {
                this.speak(response);
            }
        }
    } catch (e) {
        this.logger('ERROR: Cannot find command response: ' + e);
    }
};

Bot.prototype.updateCacheSongAndDJ = function() {
    try {
        var parentThis = this;
        this.roomInfo(true, function(roomData){
            parentThis.cache.currentSong = roomData.room.metadata.current_song;
            parentThis.getProfile(roomData.room.metadata.current_dj, function(profileData) {
                parentThis.cache.currentDJ = profileData;
            });
        });
    } catch (e) {
        this.logger('ERROR: Cannot update song data in cache: ' + e);
    }
};

Bot.prototype.isSuperuser = function(userId) {
    try {
        var superuser = false;
        var i = 0;
        for (i in this.personality.superusers) {
            if (this.personality.superusers[i] == userId) {
                superuser = true;
                break;
            }
        }
        return superuser;
    } catch (e) {
        this.logger('ERROR: Is super user failed: ' + e);
        return false;
    }    
};

Bot.prototype.isGreeted = function(speakData) {
    try {
        var greeted = false;
        var stripTextRegExp = new RegExp('[^!\\.\\?]+');
        var strippedTxt = stripTextRegExp.exec(speakData.text);
        //test for name-only greeting
        for (i in this.personality.aliases) {
            var nameOnlyRegExp = new RegExp('^' + strippedTxt + '$', 'i');
            if (nameOnlyRegExp.test(this.personality.aliases[i])) {
                greeted = true;
            }
        }
        if (!greeted) {
            var i = 0;
            for (i in this.dictionary.greetingWords) {
                var greetRegExp = new RegExp('\\b' + this.dictionary.greetingWords[i] + '\\b', 'i');
                if (greetRegExp.test(strippedTxt)) {
                    greeted = true;
                }
            }
        }
        return greeted;
    } catch(e) {
        this.logger('ERROR: Cannot determine isGreeted: ' + e);
    }
};

Bot.prototype.logger = function(logText) {
    try{
        var now = new Date()
        formattedDate = dateFormat(now, 'yyyy-mm-dd HH:MM:ss Z');
        console.log(formattedDate + ' -- ' + logText);
    } catch(e) {
        console.log('ERROR: Error with logger: ' + e);
    }
};

Bot.prototype.getRandomIndex = function(max) {
    return Math.floor(Math.random()*max)
};

//
// Command shells
//

Bot.prototype.becomeFanShell = function(speakData, mode) {
    try {
        var parentThis = this;
        this.roomInfo(false, function(data) {
            var usersInRoom = data.users;
            var i = 0;
            for (i in usersInRoom) {
                var userInRoom = usersInRoom[i];
                var userRegExp = new RegExp(userInRoom.name, 'i');
                if (userRegExp.test(speakData.text)) {
                    if (mode == 'fan') {
                        parentThis.becomeFan(userInRoom.userid, function(){
                            parentThis.updateFans();
                        });
                    } else {
                        parentThis.removeFan(userInRoom.userid, function(){
                            parentThis.updateFans();
                        });
                    }
                }
            }
        });
    } catch(e) {
        this.logger('Cannot execute becomeFan (' + mode + '): ' + e);
    }
};

Bot.prototype.playlistAddShell = function(speakData) {
    try {
        var parentThis = this;
        this.roomInfo(true, function(data) {
            var currentSong = data.room.metadata.songlog[0]._id;
            parentThis.playlistAdd(currentSong);
        });
    } catch(e) {
        this.logger('Cannot add to playlist: ' + e);
    }
};

Bot.prototype.playlistRemoveShell = function(speakData) {
    try {
        var parentThis = this;
        this.roomInfo(true, function(data) {
            var currentSong = data.room.metadata.songlog[0]._id;
            parentThis.playlistRemove(currentSong);
            parentThis.stopSong();
        });
    } catch(e) {
        this.logger('Cannot remove from playlist: ' + e);
    }
};

Bot.prototype.comeHereShell = function(speakData) {
    try {
        var parentThis = this;
        this.stalk(speakData.userid, function(stalkData) {
            parentThis.roomRegister(stalkData.roomId);
        });
    } catch(e) {
        this.logger('Cannot follow: ' + e);
    }
};


Bot.prototype.followShell = function(speakData) {
    try {
        var parentThis = this;
        //Match the user name to uuid
        var targetUuid;
        var i = 0;
        for (i in this.personality.fanof) {
            var fanOfExp = new RegExp(this.personality.fanof[i].name, 'i');
            if (fanOfExp.test(speakData.text)) {
                targetUuid = this.personality.fanof[i].userid;
            }
        }
        
        if (targetUuid) {
            this.stalk(targetUuid, function(stalkData) {
                parentThis.roomRegister(stalkData.roomId, function() {
                    parentThis.logger('INFO: Room move successful.');
                });
            });
        }
    } catch(e) {
        this.logger('ERROR: Cannot follow: ' + e);
    }
};

Bot.prototype.listFanOfShell = function(speakData) {
    try {
        var response = 'Currently, I\'m a fan of: ';
        var i = 0;
        for (i in this.personality.fanof) {
            response += '@'+this.personality.fanof[i].name;
            if (i < this.personality.fanof.length - 1) {
                response += ', ';
            } else {
                response += '.';
            }
        }
        this.dictionary.commandResponses.fanOf[0] = {'text' : response};
    } catch (e) {
        this.logger('ERROR: Cannot list fans: ' + e);
    }
};

Bot.prototype.listFansShell = function(speakData) {
    try {
        var response = 'My fans are: ';
        var i = 0;
        for (i in this.personality.fans) {
            response += '@'+this.personality.fans[i].name;
            if (i < this.personality.fans.length - 1) {
                response += ', ';
            } else {
                response += '.';
            }
        }
        this.dictionary.commandResponses.getFans[0] = {'text' : response};
    } catch (e) {
        this.logger('ERROR: Cannot list fans: ' + e);
    }
};

Bot.prototype.listCommandsShell = function(speakData) {
    try{
        var i = 0;
        for (i in this.dictionary.commands) {
            var command = this.dictionary.commands[i];
            if (command.name && command.desc && command.type) {
                var privs;
                if (command.type == 'alias') {
                    var j = 0;
                    for (j in this.dictionary.commands) {
                        if (this.dictionary.commands[j].type == 'command' && this.dictionary.commands[j].privs && this.dictionary.commands[j].name == command.aliasOf) {
                            privs = this.dictionary.commands[j].privs;
                            break;
                        }
                    }
                } else {
                    privs = command.privs;
                }
                this.speak(command.name + ': ' + command.desc + ' -- ' + privs);
            }
        }
    } catch (e) {
        this.logger('ERROR: Cannot list commands: ' + e);
    }
};

Bot.prototype.showPlaylistShell = function(speakData) {
    try{
        var parentThis = this;
        var response = 'My next 10 songs are: ';
        bot.playlistAll(function(data){
            var i = 0;
            for (i in data.list) {
                response += '"' + data.list[i].metadata.song + '" by ' + data.list[i].metadata.artist
                //only show 10
                if (i < 9) {
                    response += ', ';
                } else {
                    response += '.';
                    break;
                }
            }
            parentThis.speak(response);
        });
    } catch (e) {
         this.logger('ERROR: Cannot show playlist: ' + e);
    }
};

Bot.prototype.playlistReorderShell = function(speakData) {
    try{
        var parentThis = this;
        var songMaxIndex;
        var numberOfShuffles = 0;
        bot.playlistAll(function(data){
            songMaxIndex = data.list.length -1;
            reorder();
        });
        
        function reorder() {
            try {
                if (numberOfShuffles < 20) {
                    //get 2 random numbers in the range of the playlist length
                    var from = parentThis.getRandomIndex(songMaxIndex);
                    // always put the randomized song into top 10
                    var to = parentThis.getRandomIndex(9);
                    parentThis.playlistReorder(from, to, function(data) {
                        reorder();
                        numberOfShuffles++;
                    });
                } else {
                    parentThis.showPlaylistShell(speakData);
                }
            } catch(e) {
                parentThis.logger('ERROR: Cannot execute reorder inner function: ' + e);
            }
        }  
        
    } catch(e) {
        this.logger('ERROR: Cannot reorder playlist ' + e);
    }
};

Bot.prototype.tellTimeShell = function(speakData) {
    try{
        var now = new Date();
        this.speak('The time is ' + dateFormat(now, 'h:MM TT Z'));
    } catch (e) {
        this.logger('ERROR: Cannot tell time ' + e);
    }
};


//
// Listeners
//

bot.on('speak', function (data) {
   	if (bot.isNameReferenced(data.text) && data.userid != bot.personality.userId) {
  		if (bot.isGreeted(data)) {
  		    bot.findCommandResponse(data, null, 'greeting');
  		} else {
  		    bot.findCommand(data);
  		}
   	}
});

bot.on('roomChanged', function(data){
    //init data
    bot.updateFans();
    bot.updateCacheSongAndDJ();
    //greet everyone
    bot.speak('Hi everyone!');
});

bot.on('newsong', function(songData) {
    bot.updateCacheSongAndDJ();
});

bot.on('pmmed', function(pmData) {
    //only super users can pm the bot
    var i = 0;
    for (i in bot.personality.superusers) {
        if (bot.personality.superusers[i] == pmData.senderid) {
            //create an object that looks like the speak data
            bot.getProfile(pmData.senderid, function(profileData) {
                var data = {"command": "pm", "userid": pmData.senderid, "name": profileData.name , "text": pmData.text}
                if (bot.isGreeted(data)) {
  		            bot.findCommandResponse(data, null, 'greeting');
  		        } else {
  		            bot.findCommand(data);
  		        }
            });
            break;
        }
    }
});