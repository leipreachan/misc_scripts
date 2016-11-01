# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
# ... or force ignoredups and ignorespace
HISTCONTROL=ignoredups:ignorespace

# append to the history file, don't overwrite it
shopt -s histappend

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

if [ -f /etc/bash.bashrc ]; then
⇥   . /etc/bash.bashrc
fi
if [ -f ~/.bash_aliases ]; then
⇥   . ~/.bash_aliases
fi·····················
if [ -f ~/bin/phpunit-completion.bash ]; then
    . ~/bin/phpunit-completion.bash
fi
complete -F _command wrap.·

LOC="HOSTNAME"
PROMPT_COMMAND='prompt_status="$? "; if [[ $prompt_status == "0 " ]]; then prompt_status=; fi'
PS1="\[$(color 202)\]\${prompt_status}$txtgrn\u@`/bin/hostname -f`$txtblu \w\$(__git_ps1 \" (%s)\") $bldylw\$\[\033[00m\] "
GNOME_TITLE='echo -ne "\033]0;[$LOC] ${PWD/#$HOME/\~}\007"'

export SCREEN_MSG_FILE=/home/leipreachan/.screen.status
export GIT_MERGE_AUTOEDIT=no
export EDITOR=vim

