import { addBookmark, removeBookmark, updateBookmark } from "../lib/bookmarks";

export const addAction = async ({
  params,
  request,
}: {
  params: any;
  request: Request;
}) => {
  console.log(" /ADD ", params);

  if (request.method !== "POST") throw { error: " POST request only " };

  const { url }: { url?: string } = Object.fromEntries(
    await request.formData()
  );

  console.log("/ action ", params);

  if (!url) throw { error: 'req requires "url" ' };
  addBookmark(url);
};

export const rmvAction = async ({
  params,
  request,
}: {
  params: any;
  request: Request;
}) => {
  console.log(" /rmv ", params);

  if (request.method !== "POST") throw { error: " POST request only " };

  const { timestamp }: { timestamp?: string } = Object.fromEntries(
    await request.formData()
  );

  if (!timestamp) throw { error: 'req requires "timestamp" ' };

  try {
    const ts = parseInt(timestamp);
    removeBookmark(ts);
  } catch (e) {
    throw { error: "invalid timestamp" };
  }
};

export const updAction = async ({
  params,
  request,
}: {
  params: any;
  request: Request;
}) => {
  if (request.method !== "POST") throw { error: " POST request only " };

  const { url, timestamp }: { url?: string; timestamp?: string } =
    Object.fromEntries(await request.formData());

  if (!timestamp || !url) throw { error: " req requires url & timestamp" };

  try {
    const ts = parseInt(timestamp);
    updateBookmark(url, ts);
  } catch (e) {
    throw { error: "invalid timestamp" };
  }

  console.log(" update ", url, timestamp);
};
