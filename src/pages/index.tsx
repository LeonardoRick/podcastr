export default function Home(props: {episodes: object}) {
  return (
    <>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

// SSG
// next.js server default function. Executed before component to make SSG
// executed verytime a user access our homepage. Only works on production
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const episodes = await response.json()
  return {
    // props is a default key
    props: {
      episodes
    },
    // each 8 hours a new call is maded, otherwise, the static generated is
    // sent to every user
    revalidate: 60 * 60 * 8  // seconds
  }
}
