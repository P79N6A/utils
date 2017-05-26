%lex
%%
\s+       { /* skip */ }
[0-9]+    { return 'NUMBER'; }
'+'       { return '+' }
'-'       { return '-' }
'*'       { return '*' }
'/'       { return '/' }
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
        | e '-' e
        { $$ = $1 - $3 }
        | e '+' e
        { $$ = $1 + $3 }
        | e '*' e
        { $$ = $1 * $3 }
        | e '/' e
        { $$ = $1 / $3 }
  ;
%%
