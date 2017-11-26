export default [`
scalar Date

type CurrentUser {
  loggedIn: Boolean!
  user: User
}

# A registered user
type User {
  # The internal ID of this user
  id: ID!
  # The user's chosen username
  username: String!
  # If this user is marked as active - inactive users cannot login
  active: Boolean
  # The user's email
  email: String
}

# A YouTube Video
type Video {
  # The internal ID of this video
  id: ID!
  # The title of the video
  title: String!
  # A textual description of the video
  description: String!
  # The date the video was published
  publishedAt: Date!
  # The most recent etag returned from the YouTube API
  etag: ID
  # The channel this video is posted by
  channel: Channel!
  # More detailed information fetched on demand from youtube
  details: VideoDetails
  # A set of thumbnails illustrating this video
  thumbnails: [Thumbnail]
  # Subtitles in different languages
  subtitles: [Caption]
}

# The raw video details data fetched with ytdl-core
type VideoDetails {
  # The title
  title: String
  # The full unabbreaviated description
  description: String
  # Any keywords placed on this video
  keywords: [String]
  # How any views this video currently has
  view_count: String
  # The length of the video in seconds
  length_seconds: String
  # The rating of the video. A floating point number between 0 and 5
  avg_rating: String
  # The YouTube URL of this video
  video_url: String
}

# A subtitle track
type Caption {
  # The human-readable name of this track
  name: String!
  # A BCP 47 code of this language
  languageCode: String!
  # The original URL of this resource
  remoteUrl: String!
  # The local resource which converts this transcript to vtt
  url: String!
  vssId: String!
  isTranslatable: Boolean!
}

# A YouTube Channel
type Channel {
  # A unique identifier of this channel
  id: ID!
  # The username of the channel
  username: String
  # The title of the channel
  title: String!
  # A textual description of the channel
  description: String!
  # The most recent etag returned from the YouTube API
  etag: ID
  # The videos this channel has posted
  videos: [Video]!
  # A set of thumbnails illustrating this channel
  thumbnails: [Thumbnail]
}

type Thumbnail {
  type: String!
  url: String!
  width: Int
  height: Int
}

# The root queries in which all queries are held
type Query {
  # Returns the currently logged in user
  currentUser: CurrentUser!
  # The channels this user has subscribed to
  channels: [Channel]!
  # Searches for channels directly against YouTube
  channelsSearch(searchTerm: String): [Channel]!
  # A video
  video(id: ID!): Video
  # The videos of the current user's subscriptions
  videos: [Video]!
}

# The input required to create a user
input UserInput {
  # The user's chosen username
  username: String!
  # The password to be used for login
  password: String!
  # An email the user can be contacted on
  email: String
}

# The root mutation in which all mutations are held
type Mutation {
  # Authenticates a user
  loginUser(username: String!, password: String!): CurrentUser
  # Erases the current user's session
  logout: CurrentUser
  # Adds a channel into the channel set
  addChannel(id: String!): Channel
  # Adds a user to the database of registered users
  addUser(user: UserInput!): User
}

schema {
  # The root queries in which all queries are held
  query: Query
  # The root mutation in which all mutations are held
  mutation: Mutation
}
`];
