// ==UserScript==
// @name		 RocketScripts
// @namespace	http://tampermonkey.net/
// @version	  0.2
// @description  try to take over the world!
// @author	   You
// @match		https://chat.clubelek.fr/*
// @grant		none
// ==/UserScript==

(function() {
	'use strict';
	function flip() {
		var result = flipString(document.f.original.value.toLowerCase());
		document.f.flipped.value = result;
	}
	function flipString(aString) {
		var last = aString.length - 1;
		var result = new Array(aString.length);
		for (var i = last; i >= 0; --i) {
			var c = aString.charAt(i);
			var r = flipTable[c];
			result[last - i] = r != undefined ? r : c;
		}
		return result.join('');
	}
	var flipTable = {
		a : '\u0250',
		b : 'q',
		c : '\u0254',
		d : 'p',
		e : '\u01DD',
		f : '\u025F',
		g : '\u0183',
		h : '\u0265',
		i : '\u0131',
		j : '\u027E',
		k : '\u029E',
		//l : '\u0283',
		m : '\u026F',
		n : 'u',
		r : '\u0279',
		t : '\u0287',
		v : '\u028C',
		w : '\u028D',
		y : '\u028E',
		'.' : '\u02D9',
		'[' : ']',
		'(' : ')',
		'{' : '}',
		'?' : '\u00BF',
		'!' : '\u00A1',
		"\'" : ',',
		'<' : '>',
		'_' : '\u203E',
		';' : '\u061B',
		'\u203F' : '\u2040',
		'\u2045' : '\u2046',
		'\u2234' : '\u2235',
		'\r' : '\n'
	};
	var emojitable = {};
	function fillEmoTable(emojis) {
		for (var i = 0; i < emojis.length; i++) {
			if (!(emojis[i].name[0].toLowerCase() in emojitable)){
				emojitable[emojis[i].name[0].toLowerCase()] = [];
			}
			emojitable[emojis[i].name[0].toLowerCase()].push(":" + emojis[i].name + ":");
			for (var j = 0; j < emojis[i].aliases.length; j++) {
				if (!(emojis[i].aliases[j][0].toLowerCase() in emojitable)){
					emojitable[emojis[i].aliases[j][0].toLowerCase()] = [];
				}
				emojitable[emojis[i].aliases[j][0].toLowerCase()].push(":" + emojis[i].aliases[j] + ":");
			}
		}
	}
	function emojify(msg) {
		var res = [], wrk = msg.toLowerCase();
		for (var i = 0; i < wrk.length; i++) {
			if (wrk.charCodeAt(i) >= 0x61 && wrk.charCodeAt(i) <= 0x7A) {
				if (wrk[i] in emojitable) {
					res.push(emojitable[wrk[i]][Math.floor(Math.random() * emojitable[wrk[i]].length)] + ' ');
				} else res.push(wrk[i] + ' ');
			} else if (wrk.charCodeAt(i) >= 0x30 && wrk.charCodeAt(i) <= 0x39) res.push(wrk[i] + ' ');
			else if (wrk[i] === ' ') res.push('   ');
			else res.push(wrk[i]);
		}
		return res.join('');
	}
	Meteor.call('listEmojiCustom',(err,emojis)=>{fillEmoTable(emojis);});
	for (var i in flipTable) {
		flipTable[flipTable[i]] = i;
	}

	{
		let call=Meteor.call;
	   
		Meteor.call=function(type) {
			if(type=='sendMessage') {
				//console.log(arguments);
				if(arguments[1].msg[0]==".")
				{
					arguments[1].msg=flipString(arguments[1].msg.substr(1));
				} else if (arguments[1].msg[0]==='!') {
					if(arguments[1].msg[1]==="b")
					{
						arguments[1].msg="!bang";
					} else if(arguments[1].msg[1]==="r")
					{
						arguments[1].msg="!reload";
					} else if(arguments[1].msg[1]==="s")
					{
						arguments[1].msg="!shop " + arguments[1].msg.substr(2);
					} else if(arguments[1].msg[1]==="d")
					{
						arguments[1].msg="!duckstats";
					} else if(arguments[1].msg[1]==="l")
					{
						arguments[1].msg="!lastduck";
					}
				} else if (arguments[1].msg.substr(0,2) === '&&') {
					arguments[1].msg=emojify(arguments[1].msg.substr(2));
				}
			}
			call(...arguments);
		};
	}
})();
