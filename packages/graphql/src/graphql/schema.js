export default [`
scalar Date

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
  # A set of thumbnails illustrating this video
  thumbnails: [Thumbnail]
  # Subtitles in different languages
  subtitles: [Caption]
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
  username: String!
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
  # The channels this user has subscribed to
  channels: [Channel]!
  # A video
  video(id: ID!): Video
  # The videos of the current user's subscriptions
  videos: [Video]!
}

# The root mutation in which all mutations are held
type Mutation {
  # Adds a channel into the channel set
  addChannel(username: String!): Channel
}

schema {
  # The root queries in which all queries are held
  query: Query
  # The root mutation in which all mutations are held
  mutation: Mutation
}
`];
