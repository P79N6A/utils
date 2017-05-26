%lex
%%
\s+             { /* skip */ }
\d+(?:\.\d+)?   { return 'NUMBER'; }
'+'             { return '+'; }
'-'             { return '-'; }
'*'             { return '*'; }
'/'             { return '/'; }
'('             { return '('; }
')'             { return ')'; }
\w+             { return 'ID'; }
%%
/lex

%left '+' '-'
%left '*' '/'

%start main

%%
  main
      : e
      { return $1 }
  ;
  e
        : NUMBER
        { $$ = parseInt(yytext) }
        | '-' e
        { $$ = { opt: '-', left: 0, right: $2 } }
        | e '-' e
        { $$ = { opt: '-', left: $1, right: $3 } }
        | e '+' e
        { $$ = { opt: '+', left: $1, right: $3 } }
        | e '*' e
        { $$ = { opt: '*', left: $1, right: $3 } }
        | e '/' e
        { $$ = { opt: '/', left: $1, right: $3 } }
        | '(' e ')'
        { $$ = $2 }
        | ID '(' e ')'
        { $$ = { opt: 'fn', id: $1, left: $3 } }
  ;
%%
