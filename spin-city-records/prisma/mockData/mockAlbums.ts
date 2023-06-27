export const mockAlbums = [
    {
      artist: "Michael Jackson",
      name: "Thriller",
      year: 1982,
      label: "Epic",
      artwork: "https://i.discogs.com/YOGZe043GsAPj4N7NOJLh1DKrBHxo6wrGWXYEREdbrM/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5MTEy/OTMtMTU5NDI0NTgx/Mi03OTMxLmpwZWc.jpeg",
    },
    // {
    //   id: "cuid2",
    //   name: "The Dark Side of the Moon",
    //   artist: "Pink Floyd",
    //   year: 1973,
    //   label: "Harvest",
    //   artwork: "https://i.discogs.com/MtH7LE3wnNYlZUxQsHhvstE5h127g7Ol3hiZp2tBWFw/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NzMw/MTMtMTY2NzIwODk0/MC01NTc3LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid3",
    //   name: "Abbey Road",
    //   artist: "The Beatles",
    //   year: 1969,
    //   label: "Apple",
    //   artwork: "https://i.discogs.com/KDZ4ZR11fK9shninqQhAz_BCNH_ZwrZ_Bs3sCGzExnc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2MDc0/MjQtMTYzMDYwMTA4/Ny0xMTk5LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid4",
    //   name: "Rumours",
    //   artist: "Fleetwood Mac",
    //   year: 1977,
    //   label: "Warner Bros.",
    //   artwork: "https://i.discogs.com/G6m29qejKKfkqdipfDtVcD-HSuUQV-QNv5efCTHjR2w/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3NDg4/MS0xMTkzMDMzNzU0/LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid5",
    //   name: "Born to Run",
    //   artist: "Bruce Springsteen",
    //   year: 1975,
    //   label: "Columbia",
    //   artwork: "https://i.discogs.com/ikiF45mr0UouK57yhsg6td18GxpeLg0lkAE7iHFTGTk/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjc5/NDEyLTE2MTA3MjMx/OTUtNjM2MC5qcGVn.jpeg",
    // },
    // {
    //   id: "cuid6",
    //   name: "Back in Black",
    //   artist: "AC/DC",
    //   year: 1980,
    //   label: "Atlantic",
    //   artwork: "https://i.discogs.com/MUegvQIYSTkZtTyAB7Rks-H4zR7k5WPkKWZhsZEZzRo/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwMDU5/MS0xNTM3MDM1ODI5/LTEzOTEuanBlZw.jpeg",
    // },
    // {
    //   id: "cuid7",
    //   name: "The Joshua Tree",
    //   artist: "U2",
    //   year: 1987,
    //   label: "Island",
    //   artwork: "https://i.discogs.com/EdZsFyv_u7cHjUgagVTEqjqT1qVzpNA8iPbuGnCarek/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNDE0/MzEtMTIxNTE1Mjgz/MC5qcGVn.jpeg",
    // },
    // {
    //   id: "cuid8",
    //   name: "Hotel California",
    //   artist: "Eagles",
    //   year: 1976,
    //   label: "Asylum",
    //   artwork: "https://i.discogs.com/Az-iavpt0_TB9MjsnoWC8Yx87F1umqTxKBeuRw_yD6s/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNTQ4/MTYtMTM4MzkwOTE3/MC0xNzEyLmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid9",
    //   name: "Nevermind",
    //   artist: "Nirvana",
    //   year: 1991,
    //   label: "DGC",
    //   artwork: "https://i.discogs.com/hvfZdQNxeDBIy1bSnhcIFO67sWd5Q4PEqU444mumOGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NzA4/NC0xMjYzMDk1NTUz/LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid10",
    //   name: "The Eminem Show",
    //   artist: "Eminem",
    //   year: 2002,
    //   label: "Aftermath",
    //   artwork: "https://i.discogs.com/jcTx6YqGXO_eKuU71R11H9vKuH0o80dXXzPIDAZESjs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MzQx/NzEtMTU4MzM5NTg5/MS05MjI1LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid11",
    //   name: "Bad",
    //   artist: "Michael Jackson",
    //   year: 1987,
    //   label: "Epic",
    //   artwork: "https://i.discogs.com/ewA6WMp_LI_IPqfNc2-jJxRkavgjy6aFCdaOUf-S_r0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1OTYw/Ni0xNDUwMzg5NDI1/LTg4NTIuanBlZw.jpeg",
    // },
    // {
    //   id: "cuid12",
    //   name: "Graceland",
    //   artist: "Paul Simon",
    //   year: 1986,
    //   label: "Warner Bros.",
    //   artwork: "https://i.discogs.com/42tDsOwy9pec7rLnWJYo9muVJ9LCtby0uuA3jkQkidE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMzEz/ODgtMTI1MzMxNjQ5/MS5qcGVn.jpeg",
    // },
    // {
    //   id: "cuid13",
    //   name: "Pet Sounds",
    //   artist: "The Beach Boys",
    //   year: 1966,
    //   label: "Capitol",
    //   artwork: "hhttps://i.discogs.com/xJnEFNmShyWQoKkPZPgasJmWX91pCTFQiS6ZIFYDazc/rs:fill/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNTQ0/NzktMTM0NjM4NzAy/Ny00Nzc0LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid14",
    //   name: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars",
    //   artist: "David Bowie",
    //   year: 1972,
    //   label: "RCA",
    //   artwork: "https://i.discogs.com/XcVKJQ3x3F7aTPK6wK67GJVkXo6BQKdTIuYGcv9Ohgo/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYxODk1/Mi0xNDQzNDUxNDcz/LTc4ODkuanBlZw.jpeg",
    // },
    // {
    //   id: "cuid15",
    //   name: "Appetite for Destruction",
    //   artist: "Guns N' Roses",
    //   year: 1987,
    //   label: "Geffen",
    //   artwork: "https://i.discogs.com/qkRos3SqeaDBstgqw9j8nv70MoY4aRlqHnr_QeuViOQ/rs:fill/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM4Mzc3/Ny0xMTczNTQzMzU5/LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid16",
    //   name: "Led Zeppelin IV",
    //   artist: "Led Zeppelin",
    //   year: 1971,
    //   label: "Atlantic",
    //   artwork: "https://i.discogs.com/2rh7HpKYD0-Aqe1wR9fQcGx2xLjY4wc4vvkxBtbpQ1Q/rs:fill/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTU0/NjUtMTM2NjMxMTg2/Ny0yNzg1LmpwZWc.jpeg",
    // },
    // {
    //   id: "cuid17",
    //   name: "The Chronic",
    //   artist: "Dr. Dre",
    //   year: 1992,
    //   label: "Death Row",
    //   artwork: "https://i.discogs.com/SFcMgi_AjUNMj0YbC5ZhFKfde7OKTEsSGkzzJXKxVbc/rs:fill/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyNjA4/Mi0xMjM5ODk0Mjcx/LmpwZWc.jpeg",
    // }
  ]