//
// Init the bot
//

var botBootstrapData = {
	auth: 'auth+live+30494244aa45aacabdf9b60e9e313133bfceff25',
	userId: '4fb6caa6aaa5cd2e92000029',
	homeRoomId: '4fe00efa4fb0bb6aaf0af862'
};

var Bot = require('ttapi');
var bot = new Bot(botBootstrapData.auth, botBootstrapData.userId, botBootstrapData.homeRoomId);

bot.personality = {
    name: 'Umberto the Bot',
	aliases: ['Umberto', 'Berto', 'Bert', '@Umberto the bot'],
	superusers: ['4fb58549aaa5cd6de10000de', '4e7c40f3a3f75116580312d6'],
	fanof: []
};

bot.cache = {};

bot.dictionary = {
    commands: [
        {
            name: 'addDj',
            type: 'command',
            privs: 'superuser',
            call: function(){bot.addDj();}
        },
        {
            name: 'awesome',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'becomeFan',
            type: 'command',
            privs: 'superuser',
            call: function(data){bot.becomeFanShell(data, 'fan');}
        },
        {
            name: 'bob',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'bop',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'dance',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'downVote',
            type: 'command',
            privs: 'fan',
            call: function(){bot.vote('down');}
        },
        {
            name: 'fan',
            type: 'alias',
            aliasOf: 'becomeFan'
        },
        {
            name: 'fanOf',
            type: 'command',
            privs: 'everyone',
            call: function(data){bot.listFanOfShell(data);}
        },
        {
            name: 'fan of',
            type: 'alias',
            aliasOf: 'fanOf'
        },
        {
            name: 'floor',
            type: 'alias',
            aliasOf: 'remDj'
        },
        {
            name: 'follow',
            type: 'command',
            privs: 'superuser',
            call: function(data){bot.followShell(data);}
        },
        {
            name: 'goHome',
            type: 'command',
            privs: 'superuser',
            call: function(data){bot.roomRegister(bot.personality.homeRoomId);}
        },
        {
            name: 'go home',
            type: 'alias',
            aliasOf: 'goHome'
        },
        {
            name: 'grab',
            type: 'alias',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'headbang',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'lame',
            type: 'alias',
            aliasOf: 'downVote'
        },
        {
            name: 'next',
            type: 'alias',
            aliasOf: 'stopSong'
        },
        {
            name: 'playlistAdd',
            type: 'command',
            privs: 'superuser',
            call: function(data){bot.playlistAddShell(data);}
        },
        {
            name: 'remDj',
            type: 'command',
            privs: 'superuser',
            call: function(){bot.remDj(bot.personality.userId);}
        },
        {
            name: 'removeFan',
            type: 'command',
            privs: 'superuser',
            call: function(data){bot.becomeFanShell(data, 'unfan');}
        },
        {
            name: 'shake',
            type: 'alias',
            aliasOf: 'upVote'
        },
        {
            name: 'skip',
            type: 'alias',
            aliasOf: 'stopSong'
        },
        {
            name: 'snag',
            type: 'alias',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'stage',
            type: 'alias',
            aliasOf: 'addDj'
        },
        {
            name: 'steal',
            type: 'alias',
            aliasOf: 'playlistAdd'
        },
        {
            name: 'step down',
            type: 'alias',
            aliasOf: 'remDj'
        },
        {
            name: 'step up',
            type: 'alias',
            aliasOf: 'addDj'
        },
        {
            name: 'stopSong',
            type: 'command',
            privs: 'fan',
            call: function(){bot.stopSong();}
        },
        {
            name: 'unfan',
            type: 'alias',
            aliasOf: 'removeFan'
        },
        {
            name: 'upVote',
            type: 'command',
            privs: 'everyone',
            call: function(){bot.vote('up');}
        },
        {
            name: 'vote up',
            type: 'alias',
            aliasOf: 'upVote'
        }
    ],
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
        fanOf: []
    },
    genericCommandResponses: [
        {'text': 'You got it!'},
        {'text': 'Done and done.'},
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
    ],
    failedSecurityCommandResponses: [
        {'text': 'Sorry Dave, I can\'t let you do that!'},
        {'text': 'You ain\'t the boss of me $USERNAME!'},
        {'text': 'Says you $USERNAME! Whatever.'},
        {'text': 'Uhmmmm, no $USERNAME. Deal with it.'},
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
	
	    for (i in bot.personality.aliases) {
		    //var namePattern = new RegExp (/\bbert\b/i);
		    var nameRegEx = new RegExp('\\b' + bot.personality.aliases[i] + '\\b', 'i');
		    if (nameRegEx.test(message)) {
			    return true;
		    }
	    }
	    return false;
	} catch (e) {
	    console.log('Error: Is name referenced failed: ' + e);
	};
};

Bot.prototype.findCommand = function(data, substituteCommand) {
    try {
        var foundCommand = false;
  	    var i = 0;
  	    for (i in bot.dictionary.commands) {
  	        var dictCommand = bot.dictionary.commands[i];
  	        var cmdRegExp = new RegExp('\\b' + dictCommand.name + '\\b', 'i');
  	        var chatCommand = (substituteCommand) ? substituteCommand : data.text;
  	        if (cmdRegExp.test(chatCommand)) {
  	            foundCommand = true;
  	            if (dictCommand.type == 'alias') {
  	                console.log('command:'+ dictCommand.name + ' is alias of ' + dictCommand.aliasOf + '.');
  	                bot.findCommand(data, dictCommand.aliasOf);
  	            } else {
  	                if (bot.checkSecurity(data, dictCommand)) {
                        console.log('command:'+ dictCommand.name + ' being called.');
                        dictCommand.call(data);
  	                    bot.findCommandResponse(data, dictCommand.name, 'success');
  	                } else {
  	                    console.log('command:'+ dictCommand.name + ' failed security.');
  	                    bot.findCommandResponse(data, dictCommand.name, 'failedSecurity');
  	                }
  	            }
  	            break;
  	        } 
  	    }
  	    if (foundCommand == false) {
  	        bot.findCommandResponse(data, dictCommand.name, 'unknown');
  	    }
    } catch (e) {
        console.log('Error: Find command failed: ' + e);
    };
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
                if (bot.isSuperuser(commandIssuer)) {
                    securityPass = true;
                } else {
                    var i = 0;
                    console.log('bot.personality.fanof.length: ' + bot.personality.fanof.length);
                    for (i in bot.personality.fanof) {
                        if (bot.personality.fanof[i].userid == commandIssuer){
                            securityPass = true;
                        }
                    };
                }
                break;
            default:
                if (bot.isSuperuser(commandIssuer)) {
                    securityPass = true;
                }
            };
        return securityPass;
    } catch(e) {
        console.log('Error: Security check: ' + e);
        return false;
    };
};

Bot.prototype.updateFans = function() {
    try {
        console.log('in update');
        var getNamesAttempts = 0;
        //reset fans
        bot.personality.fanof = [];
        bot.getFanOf(function(data){
            var i = 0;
            for (i in data.fanof) {
                bot.personality.fanof[i] = {};
                bot.personality.fanof[i].userid = data.fanof[i];
            }
            populateUserNames();
        });
    } catch (e) {
        console.log('Cannot update fans: ' + e);
    };
    
    function populateUserNames() {
        try {
            var nextUuid;
            var position;
            var i = 0;
            for (i in bot.personality.fanof) {
                if (typeof bot.personality.fanof[i].name == 'undefined') {
                    nextUuid = bot.personality.fanof[i].userid;
                    position = i;
                    break;
                }
            };
            if (nextUuid, position) {
                getNamesAttempts++;
                //Protection agains infinitely trying to get user names
                if (getNamesAttempts < bot.personality.fanof.length * 2) {
                    bot.getProfile(nextUuid, function(profileData) {
                        bot.personality.fanof[position].name = profileData.name;
                        populateUserNames();
                    });
                }
            }
        } catch (e) {
            console.log('Error: Cannot populate user names: ' + e);
        };
    };
};

Bot.prototype.findCommandResponse = function(data, foundCommand, type) {
    try {
        if (data.command != 'pm') {
            var responses;
            switch(type) {
                case 'success':
                    responses = bot.dictionary.commandResponses[foundCommand];
                    if (!responses) {
                        responses = bot.dictionary.genericCommandResponses;
                        console.log('No response found for ' + foundCommand);
                    }
                    break;
                case 'failedSecurity':
                    responses = bot.dictionary.failedSecurityCommandResponses;
                    break;
                //fail
                default:
                    responses = bot.dictionary.unknownCommandResponses;
            };
            var response = responses[bot.getRandomIndex(responses.length)].text;
            response = response.replace('$USERNAME', '@'+data.name);
            response = response.replace('$DJ', '@'+bot.cache.currentDJ.name);
            bot.speak(response);
        }
    } catch (e) {
        console.log('Cannot findCommandResponse: ' + e);
    };
};

Bot.prototype.updateCacheSongAndDJ = function() {
    try {
        bot.roomInfo(true, function(roomData){
            bot.cache.currentSong = roomData.room.metadata.current_song;
            //console.log('bot.cache.currentSong: %j', bot.cache.currentSong);
            bot.getProfile(roomData.room.metadata.current_dj, function(profileData) {
                bot.cache.currentDJ = profileData;
                //console.log('bot.cache.currentDJ: %j', bot.cache.currentDJ);
            });
        });
    } catch (e) {
        console.log('Error: Cannot update song data in cache: ' + e);
    };
};

Bot.prototype.isSuperuser = function(userId) {
    try {
        var superuser = false;
        var i = 0;
        for (i in bot.personality.superusers) {
            if (bot.personality.superusers[i] == userId) {
                superuser = true;
                break;
            }
        }
        return superuser;
    } catch (e) {
        console.log('Error: Is super user failed: ' + e);
        return false;
    };    
};

Bot.prototype.getRandomIndex = function(max) {
    return Math.floor(Math.random()*max)
};

//
// Command shells
//

Bot.prototype.becomeFanShell = function(speakData, mode) {
    try {
        bot.roomInfo(false, function(data) {
            var usersInRoom = data.users;
            var i = 0;
            for (i in usersInRoom) {
                var userInRoom = usersInRoom[i];
                var userRegExp = new RegExp(userInRoom.name, 'i');
                if (userRegExp.test(speakData.text)) {
                    if (mode == 'fan') {
                        bot.becomeFan(userInRoom.userid, function(){
                            bot.updateFans();
                        });
                    } else {
                        bot.removeFan(userInRoom.userid, function(){
                            bot.updateFans();
                        });
                    }
                }
            }
        });
    } catch(e) {
        console.log('Cannot execute becomeFan (' + mode + '): ' + e);
    };
};

Bot.prototype.playlistAddShell = function(speakData) {
    try {
        bot.roomInfo(true, function(data) {
            var currentSong = data.room.metadata.songlog[0]._id;
            bot.playlistAdd(currentSong);
        });
    } catch(e) {
        console.log('Cannot add to playlist: ' + e);
    };
};

Bot.prototype.followShell = function(speakData) {
    try {
        //Match the user name to uuid
        var targetUuid;
        var i = 0;
        for (i in bot.personality.fanof) {
            var fanOfExp = new RegExp(bot.personality.fanof[i].name, 'i');
            if (fanOfExp.test(speakData.text)) {
                targetUuid = bot.personality.fanof[i].userid;
            }
        }
        
        if (targetUuid) {
            bot.stalk(targetUuid, function(stalkData) {
                console.log('stalkData: %j', stalkData)
                bot.roomRegister(stalkData.roomId, function() {
                    console.log('Room move successful.');
                });
            });
        }
    } catch(e) {
        console.log('Cannot follow: ' + e);
    };
};

Bot.prototype.listFanOfShell = function(speakData) {
    try {
        var response = 'Currently, I\'m a fan of: ';
        var i = 0;
        for (i in bot.personality.fanof) {
            response += '@'+bot.personality.fanof[i].name;
            if (i < bot.personality.fanof.length - 1) {
                response += ', ';
            } else {
                response += '.';
            }
        }
        bot.dictionary.commandResponses.fanOf[0] = {'text' : response};
        console.log('fanof: %j', bot.personality.fanof)
    } catch (e) {
        console.log('Error: Cannot list fans: ' + e);
    };
};


//
// Listeners
//

bot.on('speak', function (data) {
   	if (bot.isNameReferenced(data.text) && data.userid != bot.personality.userId) {
  		bot.findCommand(data);
   	}
});

bot.on('roomChanged', function(data){
    //init data
    bot.updateFans();
    bot.updateCacheSongAndDJ();
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
                bot.findCommand(data);
            });
            break;
        }
    }
});






