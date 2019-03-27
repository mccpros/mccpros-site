import contentful from "contentful";

const client = contentful.createClient({
  space: "dho7sc7ndcip",
  accessToken:
    "c0d0a70d532a294dcc876dc52538c3483a24080ed10b155070214b573067b8d4"
});

client
  .getContentType("superhero")
  .then(response => console.log(response))
  .catch(console.error);
