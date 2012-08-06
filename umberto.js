var Bot = require('ttapi');
var dateFormat = require('dateformat');
var clone = require('clone');


//
// Init the bot
//

var botBootstrapData = {
	auth: 'auth+live+30494244aa45aacabdf9b60e9e313133bfceff25',
	userId: '4fb6caa6aaa5cd2e92000029',
	homeRoomId: '5007b2f6eb35c17ea20000fe'
};

var bot = new Bot(botBootstrapData.auth, botBootstrapData.userId, botBootstrapData.homeRoomId);

bot.personality = {
    name: 'Umberto the Bot',
	aliases: ['Umberto', 'Berto', 'Bert', '@Umberto the bot'],
	//            bb                           zombie ian                  lvr
	superusers: ['4fb58549aaa5cd6de10000de', '4fe17646eb35c12d6d00016f', '4e7c40f3a3f75116580312d6'],
	fanof: [],
	fans: [],
	bouncerMode: false,
	isDJ: false
};

bot.cache = {
    currentSong: {},
    currentDJ: {},
    currentPlaylist: {},
    cleanRoom: false,
    usernameReference: []
};

bot.dictionary = {
    commands: [
        {
            name: 'addDj',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to DJ.',
            call: function(data, callback){bot.addDjShell(data, callback);}
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
            call: function(data, callback){bot.becomeFanShell(data, function() { callback() });}
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
            name: 'bouncer',
            type: 'alias',
            desc: 'Alias of "bouncerMode".',
            aliasOf: 'bouncerMode'
        },
        {
            name: 'bouncerMode',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to kick out any one it is not a fan of.',
            call: function(data, callback){bot.bouncerModeShell(data, true, function() { callback() });}
        },
        {
            name: 'bouncerModeOff',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to go back to a normal mode.',
            call: function(data, callback){bot.bouncerModeShell(data, false, function() { callback() });}
        },
        {
            name: 'bouncer off',
            type: 'alias',
            desc: 'Alias of "bouncerModeOff".',
            aliasOf: 'bouncerModeOff'
        },
        {
            name: 'close the room',
            type: 'alias',
            desc: 'Alias of "bouncerModeOn".',
            aliasOf: 'bouncerModeOn'
        },
        {
            name: 'comeHere',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to come to the room you are in.',
            call: function(data, callback){bot.comeHereShell(data, function() { callback() });}
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
            call: function(data, callback){bot.vote('down', function() { callback() });}
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
            desc: 'Alias of "playlistRemove".',
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
            call: function(data, callback){bot.listFanOfShell(data, function() { callback() });}
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
            call: function(data){bot.followShell(data, function() { callback() });}
        },
        {
            name: 'getFans',
            type: 'command',
            privs: 'everyone',
            desc: 'Command bot to list the users who are fans of the bot.',
            call: function(data, callback){bot.listFansShell(data, function() { callback() });}
        },
        {
            name: 'goHome',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to go to it\'s home room.',
            call: function(data, callback){bot.roomRegister(bot.personality.homeRoomId, function() { callback() });}
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
            privs: 'everyone',
            desc: 'Command the bot to list it\'s available commands',
            call: function(data, callback){bot.listCommandsShell(data, function() { callback() });}
        },
        {
            name: 'next',
            type: 'alias',
            desc: 'Alias of "stopSong".',
            aliasOf: 'stopSong'
        },
        {
            name: 'open the room',
            type: 'alias',
            desc: 'Alias of "bouncerModeOff".',
            aliasOf: 'bouncerModeOff'
        },
        {
            name: 'playlistAdd',
            type: 'command',
            desc: 'Command the bot to add the current song to it\'s palylist.',
            privs: 'superuser',
            call: function(data, callback){bot.playlistAddShell(data, function() { callback() });}
        },
        {
            name: 'playlistRemove',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to remove the song from it\'s playlist and skip it\'s song.',
            call: function(data, callback){bot.playlistRemoveShell(data, function() { callback() });}
        },
        {
            name: 'playlistReorder',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to reorder (shuffle) it\'s playlist.',
            call: function(data, callback){bot.playlistReorderShell(data, function() { callback() });}
        },
        {
            name: 'remDj',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to stop DJ-ing.',
            call: function(data, callback){bot.remDjShell(data, callback);}
        },
        {
            name: 'removeFan',
            type: 'command',
            privs: 'superuser',
            desc: 'Command the bot to un-fan <username>.',
            call: function(data, callback){bot.removeFanShell(data, function() { callback() });}
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
            call: function(data, callback){bot.showPlaylistShell(data, function() { callback() });}
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
            call: function(data, callback){bot.stopSong(function() { callback() });}
        },
        {
            name: 'tellTime',
            type: 'command',
            privs: 'everyone',
            desc: 'Command the bot to tell the time.',
            call: function(data, callback){bot.tellTimeShell(data, function() { callback() });}
        },
        {
            name: 'testRemoveSong',
            type: 'command',
            privs: 'superuser',
            desc: '',
            call: function(data, callback){bot.testRemoveSong(data, callback)}
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
            call: function(data, callback){bot.vote('up', function() {callback()});}
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
            {'text': ':zzz: You can do better, right $DJ?'},
            {'text': ':-1: <sad trombone>'},
            {'text': 'Can we flush this one? :toilet:'},
            {'text': 'Shoot me now.:gun:'},
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
            {'text': 'You don\'t mind, do you $DJ?'},
            {'text': 'Don\'t mind if I do!'}
        ],
        playlistRemove: [
            {'text': 'Where did THAT come from?!'},
            {'text': 'Pewey!'},
            {'text': ':poop:'},
        ],
        addDj: [
            {'text': 'Move it! I\'m headed up!'},
            {'text': 'I can spin with the best of them!'},
            {'text': ':warning:Warning, bot on stage!:warning:'},
        ],
        remDj: [
            {'text': 'Stepping down.'},
            {'text': 'Break it on down.'}
        ],
        bouncerMode: [
            {'text': 'Closing down the room.'},
        ],
        bouncerModeOff: [
            {'text': 'Opening up the room.'},
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
            {'text': 'I <3 this song $DJ!'},
            {'text': 'Hold my :beer: $USERNAME and I\'ll bop my head off!'},
            {'text': 'Is That Freedom Rock $USERNAME? Well Turn It Up Man.'},
            {'text': 'A+ :star: $DJ.'},
            {'text': 'You\'re a :star2: up there, $DJ.'},
            {'text': ':thumbsup: Great song!'},
            {'text': 'I feel like dancin\'! :dancers:'},
            {'text': ':mega: Here Ye! Here Ye! $DJ\'s song ROCKS!'},
            {'text': 'You \'da :bomb: $DJ.'},
            {'text': ':checkered_flag: Winner!'},
            
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
        {'text': 'I\'m seeing :sparkles: from THAT one $USERNAME. Ouch.'},
        {'text': 'Huh? :confounded:'},
        {'text': 'Uhhhh, uhhhh, uhhhhh, whaaaa?'},
        {'text': 'I\'m sorry $USERNAME I\'m a little confused and lost.'},
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
    ],
    bouncerMessages: [
        {'text' : 'Sorry, we\'re hosting a private event. Please come back later.'},
        {'text' : 'Clean room environment. Potentially hazardous. Keep out.'}
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
        var self = this;
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
                        dictCommand.call(data, function() {
                            self.findCommandResponse(data, dictCommand.name, 'success');
                        });
  	                    
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

Bot.prototype.findCommandResponse = function(data, foundCommand, type) {
    try {
        var self = this;
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
                var now = new Date();
                //limit the responses in open chatCommand
                var clearToSpeak = true;
                var i = 0;
                for (i in this.cache.usernameReference) {
                	var cacheRef = this.cache.usernameReference[i];
                	if (cacheRef && (cacheRef.username == data.name || cacheRef.username == this.cache.currentDJ.name) && cacheRef.timestamp.getTime() + 3500 > now.getTime() ) {
                		clearToSpeak = false;
                	}
                }
                if (clearToSpeak) {
                	this.speak(response);
                	this.cache.usernameReference.push({'username':data.name, 'timestamp': now});
                	this.cache.usernameReference.push({'username':this.cache.currentDJ.name, 'timestamp': now});
                	setTimeout(function() {
                		cleanUsernameReferenceCache();
                	}, 4000);
                }
            }
        }
        function cleanUsernameReferenceCache() {
        	var now = new Date();
        	if (self.cache.usernameReference[0] && self.cache.usernameReference[0].timestamp.getTime() + 3500 < now.getTime()) {
        		self.cache.usernameReference.shift();
        		cleanUsernameReferenceCache();
        	}
        }
    } catch (e) {
        this.logger('ERROR: Cannot find command response: ' + e);
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
        var self = this;
        this.logger('INFO: Updating fan lists.');
        var getNamesAttempts = 0;
        //reset fans
        this.personality.fanof = [];
        this.getFanOf(function(data){
            var i = 0;
            for (i in data.fanof) {
                self.personality.fanof[i] = {};
                self.personality.fanof[i].userid = data.fanof[i];
            }
            populateUserNames(self.personality.fanof);
        });
        this.getFans(function(data) {
            var i = 0;
            for (i in data.fans) {
                self.personality.fans[i] = {};
                self.personality.fans[i].userid = data.fans[i];
            }
            populateUserNames(self.personality.fans);
        });
    } catch (e) {
        this.logger('ERROR: Cannot update fans: ' + e);
    }
    
    function populateUserNames(userArray) {
        try {
            var i = 0;
            for (i in userArray) {
                if (typeof userArray[i].name == 'undefined') {
                    self.getProfile(userArray[i].userid, function(profileData) {
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

Bot.prototype.updateCacheSongAndDJ = function() {
    try {
        var self = this;
        this.roomInfo(true, function(roomData){
            self.cache.currentSong = clone(roomData.room.metadata.current_song);
            
            self.getProfile(roomData.room.metadata.current_dj, function(profileData) {
                self.cache.currentDJ = clone(profileData);
                if(self.cache.currentDJ.userid == self.personality.userId && self.cache.currentSong) {
                	self.logger('INFO: Playing song: ' + self.cache.currentSong.metadata.artist + ' "' + self.cache.currentSong.metadata.song + '" ' + self.cache.currentSong._id);
                	self.updateCachePlaylist();
                }
            });
        });
    } catch (e) {
        this.logger('ERROR: Cannot update song data in cache: ' + e);
    }
};

Bot.prototype.updateCachePlaylist = function() {
    try { 
        var self = this;
        this.playlistAll(function(data){
            self.logger('INFO: Updating cache playlist.');
            self.cache.currentPlaylist = clone(data);
        });
    } catch (e) {
        this.logger('ERROR: Cannot update playlist data in cache: ' + e);
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

Bot.prototype.bouncerTheRoom = function() {
    try { 
        var self = this;
		
		if (this.personality.bouncerMode == true) {
        	this.roomInfo(false, function(data) {
            	var usersInRoom = data.users;
            	var i = 0;
            	for (i in usersInRoom) {
                	var userMatchMade = false;
                	var userInRoom = usersInRoom[i].userid;
                	var j = 0;
                
                	for (j in self.personality.fanof) {
                    	if (userInRoom == self.personality.fanof[j].userid && !self.cache.cleanRoom ) {
                        	userMatchMade = true;
                    	}
                	}
               	 	var k = 0;
                	for (k in self.personality.superusers) {
                    	if (userInRoom == self.personality.superusers[k]) {
                        	userMatchMade = true;
                    	}
                	}
                	if (userInRoom == self.personality.userId) {
                    	userMatchMade = true;
                	}
                	if (!userMatchMade) {
                    	if (!self.cache.cleanRoom) {
                        	self.bootUser(userInRoom, self.dictionary.bouncerMessages[0].text);
                    	} else {
                        	self.bootUser(userInRoom, self.dictionary.bouncerMessages[1].text);
                    	}
                	}
            	}
            });
    	}
    } catch (e) {
        this.logger('ERROR: Cannot bouncer the room: ' +e);
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

Bot.prototype.addDjShell = function(speakData, callback) {
    try {
        var self = this;
        this.addDj(function() {
            self.personality.isDJ = true;
            callback();
        });
    } catch(e) {
        this.logger('ERROR: Cannot execute addDj: ' + e);
    }
};

Bot.prototype.remDjShell = function(speakData, callback) {
    try {
        var self = this;
        this.remDj(this.personality.userId, function() {
            self.personality.isDJ = false;
            callback();
        });
    } catch(e) {
        this.logger('ERROR: Cannot execute remDj: ' + e);
    }
};



Bot.prototype.playlistAddShell = function(speakData, callback) {
    try {
        var self = this;
        bot.playlistAll(function(data){
            self.playlistAdd('default', self.cache.currentSong._id, data.list.length, function() {
                self.updateCachePlaylist();
                callback();
            });
        });
    } catch(e) {
        this.logger('ERROR: Cannot add to playlist: ' + e);
    }
};

Bot.prototype.playlistRemoveShell = function(speakData, callback) {
    try {
        
    } catch(e) {
        this.logger('ERROR: Cannot remove from playlist: ' + e);
    }
};

Bot.prototype.showPlaylistShell = function(speakData, callback) {
    try{
        var self = this;
        var response = 'My next 10 songs are: ';
        bot.playlistAll('default', function(data){
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
            //This is responsible for both showPlaylist and playlistReorder
            self.dictionary.commandResponses.showPlaylist[0] = {'text' : response};
            self.dictionary.commandResponses.playlistReorder[0] = {'text' : response};
            callback();
        });
    } catch (e) {
         this.logger('ERROR: Cannot show playlist: ' + e);
    }
};

Bot.prototype.playlistReorderShell = function(speakData, callback) {
    try{
        var self = this;
        var songMaxIndex;
        var numberOfShuffles = 0;
        bot.playlistAll('default', function(data){
            songMaxIndex = data.list.length -1;
            reorder();
        });
        
        function reorder() {
            try {
                if (numberOfShuffles < 20) {
                    //get 2 random numbers in the range of the playlist length
                    var from = self.getRandomIndex(songMaxIndex);
                    // always put the randomized song into top 10
                    var to = self.getRandomIndex(9);
                    self.playlistReorder('default', from, to, function(data) {
                        reorder();
                        numberOfShuffles++;
                    });
                } else {
                    self.showPlaylistShell(speakData, callback);
                    self.updateCachePlaylist();
                }
            } catch(e) {
                self.logger('ERROR: Cannot execute reorder inner function: ' + e);
            }
        }  
        
    } catch(e) {
        this.logger('ERROR: Cannot reorder playlist ' + e);
    }
};

Bot.prototype.becomeFanShell = function(speakData, callback) {
    try {
        var self = this;
        this.roomInfo(false, function(data) {
            var usersInRoom = data.users;
            var i = 0;
            for (i in usersInRoom) {
                var userInRoom = usersInRoom[i];
                var userRegExp = new RegExp(userInRoom.name, 'i');
                if (userRegExp.test(speakData.text)) {
                    self.becomeFan(userInRoom.userid, function(){
                        self.updateFans();
                    });
                }
            }
            callback();
        });
        
    } catch(e) {
        this.logger('ERROR: Cannot execute becomeFan: ' + e);
    }
};

Bot.prototype.removeFanShell = function(speakData, callback) {
    try {
        var self = this;
        var i = 0;
        for (i in this.personality.fanof) {
            var userRegExp = new RegExp(this.personality.fanof[i].name, 'i');
            if (userRegExp.test(speakData.text)) {
                this.removeFan(this.personality.fanof[i].userid, function(){
                    self.updateFans();
                });
            }
        }
        callback();
    } catch(e) {
        this.logger('ERROR: Cannot execute becomeFan (' + mode + '): ' + e);
    }
};

Bot.prototype.listFanOfShell = function(speakData, callback) {
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
        callback();
    } catch (e) {
        this.logger('ERROR: Cannot list fans: ' + e);
    }
};

Bot.prototype.listFansShell = function(speakData, callback) {
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
        callback();
    } catch (e) {
        this.logger('ERROR: Cannot list fans: ' + e);
    }
};


Bot.prototype.comeHereShell = function(speakData, callback) {
    try {
        var self = this;
        this.stalk(speakData.userid, function(stalkData) {
            self.roomRegister(stalkData.roomId, function() {
                callback();
            });
        });
    } catch(e) {
        this.logger('ERROR: Cannot follow: ' + e);
    }
};


Bot.prototype.followShell = function(speakData, callback) {
    try {
        var self = this;
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
                self.roomRegister(stalkData.roomId, function() {
                    self.logger('INFO: Room move successful.');
                    callback();
                });
            });
        }
    } catch(e) {
        this.logger('ERROR: Cannot follow: ' + e);
    }
};


Bot.prototype.listCommandsShell = function(speakData, callback) {
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
                //this.logger(command.name + ': ' + command.desc + ' -- ' + privs);
            }
        }
        this.dictionary.commandResponses.listCommands[0] = {'text' : 'You can find my commands here: https://sites.google.com/site/umbertothebot/'};
        callback();
    } catch (e) {
        this.logger('ERROR: Cannot list commands: ' + e);
    }
};

Bot.prototype.tellTimeShell = function(speakData, callback) {
    try{
        var now = new Date();
        this.dictionary.commandResponses.tellTime[0] = {'text' : ':clock' + dateFormat(now, 'h') + ': The time is ' + dateFormat(now, 'h:MM TT Z')};
        callback();
    } catch (e) {
        this.logger('ERROR: Cannot tell time ' + e);
    }
};

Bot.prototype.bouncerModeShell = function (speakData, mode, callback) {
    try{
        if (mode == true) {
            this.personality.bouncerMode = true;
            this.bouncerTheRoom();
        } else {
            this.personality.bouncerMode = false;
        }
        callback();
    } catch (e) {
        this.logger('ERROR: Can\'t enter into or out of bouncer mode ' + e);
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
    bot.updateCachePlaylist();
    if (data.room.roomid == bot.personality.homeRoomId) {
        this.cache.cleanRoom = true;
        this.personality.bouncerMode = true;
        this.bouncerTheRoom();
    } else {
    	this.cache.cleanRoom = false;
    	this.personality.bouncerMode = false;
    }
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

bot.on('registered', function(data) {
    if (bot.personality.bouncerMode && data.user[0].userid != this.personality.userId) {
        bot.bouncerTheRoom();
    }
    var userRegExp = new RegExp('tt_stats', 'i');
    if (userRegExp.test(data.user.name)) {
        this.bootUser(data.user.userid, self.dictionary.bouncerMessages[0].text);
    }
});