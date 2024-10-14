/**
 * Represents an artist.
 */
interface Artist {
    name: string
    url: string
    avatar: string
    verified: boolean
  }
  
  /**
   * Represents a song.
   */
  interface Song {
    title: string
    fullTitle: string
    url: string
    thumbnail: string
    image: string
    id: number
    endpoint: string
    instrumental: boolean
    publish: string
    artist: Artist
  }
  
  /**
   * Response object for the Genius search API.
   */
  type GeniusSearchResponse = Song[]
  
  /**
   * Response object for the lyrics API.
   */
  interface LyricsResponse {
    lyrics: string
  }
  
  /**
   * Represents a TikTok video.
   */
  interface TikTokVideo {
    id: string
    title: string
    region: string
    hd: string
    duration: number
    play: number
    coment: number
    share: number
    like: number
    download: number
    publish: number
    url: string
    author: {
      id: string
      username: string
      nickname: string
      avatar: string
    }
    music: {
      id: string
      title: string
      play: string
      author: string
    }
  }
  
  /**
   * Response object for the TikTok search API.
   */
  type TikTokSearchResponse = {
    creator: string
    status: number
    meta: TikTokVideo[]
  }
  
  /**
   * Represents a YouTube video.
   */
  interface YouTubeVideo {
    type: string
    videoId: string
    url: string
    title: string
    description: string
    image: string
    thumbnail: string
    seconds: number
    timestamp: string
    duration: {
      seconds: number
      timestamp: string
    }
    ago: string
    views: number
    author: {
      name: string
      url: string
    }
  }
  
  /**
   * Response object for the YouTube search API.
   */
  type YouTubeSearchResponse = YouTubeVideo[]
  
  /**
   * Represents a Spotify track.
   */
  interface SpotifyTrack {
    id: string
    title: string
    artist: string
    album: string
    duration: string
    popularity: string
    publish: string
    url: string
    image: string
  }
  
  /**
   * Response object for the Spotify search API.
   */
  interface SpotifySearchResponse {
    creator: string
    status: boolean
    data: SpotifyTrack[]
  }
  
  /**
   * Represents a track response.
   */
  interface TrackResponse {
    isYtMusic: boolean
    title: string
    artist: string
    id: string
    url: string
    album: string
    duration: {
      seconds: number
      label: string
    }
    image: string
  }
  
  /**
   * Response object for Pinterest image search API.
   */
  interface PinterestImageResponse {
    title: string
    media: {
      width: number
      height: number
      url: string
    }
    created_at: string
    id: string
    domain: string
    usernameAvatar: string
    idUser: string
    fullname: string
    username: string
    seguidores: number
    descriptionImage: string
  }
  
  /**
   * Response object for Apple Music search API.
   */
  interface AppleMusicResponse {
    title: string
    url: string
    artists: string
    type: string
    image: string
  }
  
  /**
   * Response object for Rule 34 search API.
   */
  interface Rule34Response {
    creator: string
    status: boolean
    images: string[]
  }
  
  /**
   * Represents a Google image result.
   */
  interface GImageResult {
    url: string
    width: number
    height: number
    preview: string
    origin: {
      title: string
      website: {
        domain: string
        url: string
      }
    }
  }
  
  /**
   * Response object for Google image search API.
   */
  interface GImageResponse {
    creator: string
    status: boolean
    data: GImageResult[]
  }
  
  /**
   * Represents a Google search result.
   */
  interface GoogleSearchResult {
    title: string
    url: string
    description: string
  }
  
  /**
   * Response object for Google search API.
   */
  interface GoogleSearchResponse {
    creator: string
    status: boolean
    data: GoogleSearchResult[]
  }
  
  /**
   * Response object for the Movie Database search API.
   */
  interface MovieResponse {
    creator: string
    status: boolean
    data: MovieData[]
  }
  
  /**
   * Represents movie data returned by the Movie Database search API.
   */
  interface MovieData {
    adult: boolean
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    image: string
  }
  
  /**
   * Response object for Bing search API.
   */
  interface BingSearchResponse {
    currHref: string
    results: BingSearchResult[]
  }
  
  /**
   * Represents a Bing search result.
   */
  interface BingSearchResult {
    title: string
    url: string
    description: string
  }
  
  /**
   * Response object for Bing image search API.
   */
  interface BingImageResponse {
    thumbnail: string
    source: string
    direct: string
    description: string
    title: string
  }
  
  /**
   * Response object for SoundCloud search API.
   */
  interface SoundCloudResponse {
    creator: string
    status: boolean
    data: SoundCloudTrack[]
  }
  
  /**
   * Represents a SoundCloud track.
   */
  interface SoundCloudTrack {
    title: string
    genre: string
    duration: number
    likes: number
    play: number
    comments: number
    id: number
    created: string
    link: string
  }
  
  /**
   * Response object for Deezer search API.
   */
  interface DeezerResponse {
    creator: string
    status: boolean
    data: DeezerTrack[]
  }
  
  /**
   * Represents a Deezer track.
   */
  interface DeezerTrack {
    id: number
    title: string
    artist: string
    duration: string
    rank: string
    preview: string
    image: string
    url: string
    explicit_lyrics: boolean
  }
  
  /**
   * Response object for Tenor GIF search API.
   */
  interface TenorResponse {
    creator: string
    status: boolean
    data: TenorGIF[]
  }
  
  /**
   * Represents a Tenor GIF.
   */
  interface TenorGIF {
    title: string
    created: string
    mp4: string
    gif: string
  }
  
  /**
   * Response object for the npm search API.
   */
  interface NPMResponse {
    creator: string
    status: boolean
    total: string
    limit: string
    results: NPMPackage[]
  }
  
  /**
   * Represents a package returned by the npm search API.
   */
  interface NPMPackage {
    package: string
    author: string
    email: {
      name: string
      gmail: string
    }
    publish: string
    version: string
    description: string
    keywords: string[]
    url: string
    maintainers: {
      username: string
      email: string
    }[]
  }
  
  /**
   * Response object for the App Store search API.
   */
  interface AppStoreResponse {
    creator: string
    status: boolean
    data: AppStoreApp[]
  }
  
  /**
   * Represents an app returned by the App Store search API.
   */
  interface AppStoreApp {
    id: number
    title: string
    url: string
    image: string
    genre: string[]
    rating: string
    size: string
    released: string
    updated: string
    version: string
    price: string
    currency: string
    developer: string
    score: number
    reviews: string
    currentVersionScore: number
    screenshots: string[]
    currentVersionReviews: number
    website: string
  }
  
  /** Response object for the URL checking tool API. */
  interface URLCheckResponse {
    creator: string
    status: boolean
    data: URLCheckData
  }
  
  /** Represents data returned by the URL checking tool API. */
  interface URLCheckData {
    redirect: string
    method: string
    status: number
    type: string
    server: string
    cache: string
    headers: Record<string, string>
  }
  
  /** Interface representing the structure of the HTML extraction response from the API. */
  interface HTMLExtractResponse {
    creator: string
    status: boolean
    html: string
  }
  
  /** Interface representing the translation response from the translation API. */
  interface TranslationResponse {
    creator: string
    status: boolean
    data: string
  }
  
  /** Interface for the response from the Mojito API */
  interface MojitoResponse {
    creator: string
    status: boolean
    result: Buffer
  }
  
  /** Interface for the response from the Simi API when generating a response for a given text. */
  interface SimiResponse {
    creator: string
    status: boolean
    data: {
      code: string
      id: string
      text: string
      message: string
    }
  }
  
  interface NoticiasResponse {
    creator: string
    status: boolean
    headline_stories: HeadlineStory[]
  }
  interface HeadlineStory {
    title: string
    url: string
    published: string
    by: string
  }
  
  interface TikTokProfile {
    username: string
    nickname: string
    url: string
    avatarLarger: string
    avatarThumb: string
    avatarMedium: string
    signature: string
    verified: boolean
    privateAccount: boolean
    region: string
    commerceUser: boolean
    usernameModifyTime: number
    nicknameModifyTime: number
  }
  interface TikTokStats {
    followerCount: number
    followingCount: number
    heartCount: number
    videoCount: number
    likeCount: number
    friendCount: number
  }
  interface TikTokStalkResponse {
    status: boolean
    creator: string
    result: {
      users: TikTokProfile
      stats: TikTokStats
    }
  }
  
  interface MixedEmojiResponse {
    creator: string
    status: boolean
    data: {
      url: string
    }
  }
  
  interface ChannelInfoResponse {
    creator: string
    status: boolean
    data: {
      data_post: string
      data_view: string
      user_url: string
      user_photo: string
      user_name: string
      message_url: string
      message_text: string
      message_photo: any[]
      message_video: any[]
      views: string
      datetime: string
    }[]
  }
  
  interface EmojiInfoResponse {
    creator: string
    host: string
    data: {
      apple: string
      google: string
      facebook: string
      twitter: string
      samsung: string
      microsoft: string
      whatsapp: string
      mesengger: string
      joypixels: string
      openmoji: string
      emojidex: string
      htc: string
      lg: string
      mozilla: string
      softbank: string
      au_kddi: string
    }
  }
  
  interface CountryResponse {
    status: boolean
    creator: string
    result: CountryInfo
  }
  interface CountryInfo {
    code: string
    name: string
    emoji: string
    number: string
  }
  
  export {
    GeniusSearchResponse,
    LyricsResponse,
    TikTokSearchResponse,
    YouTubeSearchResponse,
    SpotifySearchResponse,
    TrackResponse,
    PinterestImageResponse,
    AppleMusicResponse,
    Rule34Response,
    GImageResult,
    GImageResponse,
    GoogleSearchResponse,
    MovieResponse,
    BingSearchResponse,
    BingImageResponse,
    SoundCloudResponse,
    DeezerResponse,
    TenorResponse,
    NPMResponse,
    AppStoreResponse,
    URLCheckResponse,
    HTMLExtractResponse,
    TranslationResponse,
    MojitoResponse,
    SimiResponse,
    NoticiasResponse,
    TikTokStalkResponse,
    MixedEmojiResponse,
    ChannelInfoResponse,
    EmojiInfoResponse,
    CountryResponse
  }