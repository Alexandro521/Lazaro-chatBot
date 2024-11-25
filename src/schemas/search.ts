export const titokSearchTextSchema = ()=>{
 return { head: (id: string, Search: string) => `[t:ttk ${id}]

  *TIK TOK Search*

🔍Resultados de *${Search}*
`,
  body: (
    count,
    title: string,
    duration: number,
    likes: number,
    author: string
  ) => `\n
『${count}』⤵
- title: *${title}*
- duration: *${duration}*
- Likes: *${likes}*
- author: *${author}*
- - - - - - - - - - - - - - -
`,
}
}

export const youtubeResultsSchema = () => {
  return {
    head: (id: string, Search: string) => `[t:yts ${id}]

  *Youtube Search*
🔍Resultados de *${Search}*
`,
    body: (
      count,
      title: string,
      duration: string,
      url: string,
      canal: string
    ) => `\n
『${count}』⤵
  ␥✒title: *${title}*
  ␥🕙duration: *${duration}*
  ␥📎 url: *${url}*
  ␥📺canal: *${canal}*
_ _ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _`,
  };
};