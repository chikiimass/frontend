// Mock data for series and movies
const seriesData = {
    'game-of-thrones': {
      bannerUrl: 'https://via.placeholder.com/1200x300?text=Game+of+Thrones+Banner',
      seriesPicUrl: 'https://via.placeholder.com/150?text=GoT+Poster',
      seriesName: 'Game of Thrones',
      description: 'Game of Thrones is a fantasy series based on the novels by George R.R. Martin. It is set in the fictional continents of Westeros and Essos.',
      seasons: [
        {
          id: '1',
          title: 'Season 1',
          episodes: [
            { id: '1', title: 'Winter Is Coming', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+1' },
            { id: '2', title: 'The Kingsroad', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+2' },
            { id: '3', title: 'Lord Snow', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Episode+3' },
          ],
        },
      ],
      cast: [
        { id: '1', name: 'Emilia Clarke', role: 'Daenerys Targaryen', profilePic: 'https://via.placeholder.com/150?text=Emilia+Clarke' },
        { id: '2', name: 'Kit Harington', role: 'Jon Snow', profilePic: 'https://via.placeholder.com/150?text=Kit+Harington' },
        { id: '3', name: 'Lena Headey', role: 'Cersei Lannister', profilePic: 'https://via.placeholder.com/150?text=Lena+Headey' },
      ],
    },
  };
  
  const movieData = {
    'fast-and-furious': {
      bannerUrl: 'https://via.placeholder.com/1200x300?text=Fast+and+Furious+Banner',
      moviePosterUrl: 'https://via.placeholder.com/150?text=Fast+and+Furious+Poster',
      movieName: 'Fast and Furious',
      description: 'Fast & Furious is a media franchise centered on illegal street racing, heists, spies, and family.',
      parts: [
        { id: '1', title: 'The Fast and the Furious (2001)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+1' },
        { id: '2', title: '2 Fast 2 Furious (2003)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+2' },
        { id: '3', title: 'Fast & Furious (2009)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+3' },
        { id: '4', title: 'Fast Five (2011)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+4' },
        { id: '5', title: 'Fast & Furious 6 (2013)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+5' },
        { id: '6', title: 'Furious 7 (2015)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+6' },
        { id: '7', title: 'The Fate of the Furious (2017)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+7' },
        { id: '8', title: 'F9 (2021)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+8' },
        { id: '9', title: 'Fast X (2023)', thumbnailUrl: 'https://via.placeholder.com/320x180?text=Fast+9' },
      ],
      cast: [
        { id: '1', name: 'Vin Diesel', role: 'Dominic Toretto', profilePic: 'https://via.placeholder.com/150?text=Vin+Diesel' },
        { id: '2', name: 'Paul Walker', role: 'Brian O\'Conner', profilePic: 'https://via.placeholder.com/150?text=Paul+Walker' },
        { id: '3', name: 'Dwayne Johnson', role: 'Luke Hobbs', profilePic: 'https://via.placeholder.com/150?text=Dwayne+Johnson' },
      ],
    },
  };
  