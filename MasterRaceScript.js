// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chat.clubelek.fr/*
// @grant        none
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
    for (var i in flipTable) {
        flipTable[flipTable[i]] = i;
    }

    {
        let call=Meteor.call;
       
        Meteor.call=function(type) {
            if(type=='sendMessage') {
                console.log(arguments);
                if(arguments[1].msg[0]==='!' || arguments[1].msg[0]===':'|| arguments[1].msg[0]==".")
                {
                    if(arguments[1].msg==="!b")
                    {
                        arguments[1].msg="!bang";
                    }
                    if(arguments[1].msg[0]===".")
                    {

                        arguments[1].msg=flipString(arguments[1].msg.substr(1));
                    }

                }
                else
                {
                    if(arguments[1].msg[0]===".")
                    {

                        arguments[1].msg=flipString(arguments[1].msg.substr(1));
                    }
                    //arguments[1].msg="_"+arguments[1].msg+"_";
                }

             
                
            }
            call(...arguments);
        };
    }
})();
