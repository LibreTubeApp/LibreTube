# nextube

A self-hosted YouTube player

Problem: Most of the world's video content is hosted in YouTube. You don't
have a google account, but still wish to follow your favourite channels' videos.

Solution: Use self-hosted software to register your channels, then use YouTube's
data API to fetch them. No Google account required!

Current plan:
- Server which reads from the YouTube API
- Client where user sets an API token
- Server which fetches the registered user's subscriptions
- PWA client which lists subscriptions' new videos
- Clicking on a video shows a youtube-nocookie.com iframe

## How does it work?

Create an API key for consuming API data, then register it in the app. If
worried about privacy, you can create a throwaway google account for the
purpose of consuming from the YouTube API.

### But how is that different from having a throwaway YouTube account?

It isn't. Creating an account for the purpose of consuming from the YouTube API
is the same idea as having a throwaway google account that you have your
subscriptions in. If that seems like a more

The difference is how these accounts are treated in your browser

Not tracked around the web

Not possible for google to know how many users are on the other side of the
server

## Setup

The GraphQL server assumes a PGSQL database that is accessible. Configure the
settings using the environment variables `DBHOST`, `DBUSER`, `DBDATABASE` and
`DBPASSWORD`.

## Disclaimer

**I ONLY CONDONE THE USE OF THIS SOFTWARE FOR PERSONAL USE.**

This is because

