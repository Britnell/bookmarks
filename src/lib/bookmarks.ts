const PAGE_SIZE = 10;

export interface BookmarkI {
  url: string;
  timestamp: number;
}

export interface getBookmarksReturnI {
  data: BookmarkI[];
  pages: number;
}

export const emptyBookmark = {
  url: "abc",
  timestamp: 123,
};

// mock fetcher to be replaced with real query later
export const fetchBookmarks = async (
  page: number
): Promise<getBookmarksReturnI> => {
  const bookmarks = readBookmarkStorage().sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  });

  const pages = getNumPages(bookmarks);

  // get slice of page
  const beg = (page - 1) * PAGE_SIZE;
  const end = beg + PAGE_SIZE;
  const pageBookmarks = bookmarks.slice(beg, end);

  return { data: pageBookmarks, pages };
};

const STORAGE_ID = "bookmarks_app_storage";

export const readBookmarkStorage = (): BookmarkI[] => {
  const data = localStorage.getItem(STORAGE_ID);

  if (!data) return [];

  try {
    const storage = JSON.parse(data);
    const bookmarks = storage?.data;
    if (!bookmarks || !Array.isArray(bookmarks)) return [];
    // clean data array? - check if url and timestamp exist
    return bookmarks;
  } catch (e) {
    console.log(" Error parsing local storage JSON ", data);
    return [];
  }
};

export const writeBookmarkStorage = (data: BookmarkI[]) => {
  localStorage.setItem(STORAGE_ID, JSON.stringify({ data: data }));
};

export const addBookmark = async (url: string) => {
  const bookmarks = readBookmarkStorage();
  const _new = {
    timestamp: Date.now(),
    url,
  };
  // TODO - check if timestamp exist already
  bookmarks.push(_new);
  writeBookmarkStorage(bookmarks);
};

export const removeBookmark = async (timestamp: number) => {
  const bookmarks = readBookmarkStorage();
  const _bookmarks = bookmarks.filter((bm) => bm.timestamp !== timestamp);
  writeBookmarkStorage(_bookmarks);
};

export const updateBookmark = async (url: string, timestamp: number) => {
  const bookmarks = readBookmarkStorage();

  bookmarks.forEach((bm) => {
    if (bm.timestamp === timestamp) {
      bm.url = url;
    }
  });
  writeBookmarkStorage(bookmarks);
};

export const getNumPages = (bookmarks: any[]) =>
  Math.ceil(bookmarks.length / PAGE_SIZE);
