export interface BookmarkI {
  url: string;
  id: string;
}

export interface getBookmarksReturnI {
  data: BookmarkI[];
}

export const emptyBookmark = {
  url: "abc",
  id: "#0",
};

export const fetchBookmarksPage = async (
  page: number
): Promise<getBookmarksReturnI> => {
  const all = readBookmarkStorage();

  return { data: all };
};

const STORAGE_ID = "bookmarks_app_storage";

const readBookmarkStorage = () => {
  const data = localStorage.getItem(STORAGE_ID);
  console.log(" loc ", data);

  if (!data) return { data: [] };

  try {
    const storage = JSON.parse(data);
    return storage;
  } catch (e) {
    return { data: [] };
  }
};
