#!/bin/bash

alias ..='cd ..'
alias ...='cd ../../'
alias ptime='gawk '"'"'{ print strftime("\033[01;30m[%Y-%m-%d %H:%M:%S]\033[0m"), $0 }'"'"''
