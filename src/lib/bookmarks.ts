export interface BookmarkI {
  url: string;
  timestamp: number;
}

export interface getBookmarksReturnI {
  data: BookmarkI[];
}

export const emptyBookmark = {
  url: "abc",
  timestamp: 123,
};

// mock fetcher to be replaced with real query later
export const fetchBookmarksPage = async (
  page: number
): Promise<getBookmarksReturnI> => {
  return { data: readBookmarkStorage() };
};

const STORAGE_ID = "bookmarks_app_storage";

export const readBookmarkStorage = (): BookmarkI[] => {
  const data = localStorage.getItem(STORAGE_ID);

  if (!data) return [];

  try {
    const storage = JSON.parse(data);
    return storage.data;
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
  bookmarks.push(_new);
  writeBookmarkStorage(bookmarks);
};
