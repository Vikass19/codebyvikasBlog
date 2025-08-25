// ======= CONFIG =======
const BASE = import.meta.env.VITE_SHEETS_WEBAPP_URL; // e.g. your deployed web app URL
const SHARED_KEY = import.meta.env.VITE_SHEETS_SHARED_KEY; // admin key

// === GET blogs (optionally filter by category) ===
export async function getBlogs(category) {
  try {
    const url = category
      ? `${BASE}?category=${encodeURIComponent(category)}`
      : BASE;

    const res = await fetch(url, { method: 'GET' }); // GET avoids preflight
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to fetch blogs');
    return json.data;
  } catch (err) {
    console.error('getBlogs error:', err);
    throw err;
  }
}

// === ADD new blog (admin only) ===
export async function addBlog(blog) {
  try {
    const body = { ...blog, apiKey: SHARED_KEY };
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // avoids CORS preflight
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to add blog');
    return json;
  } catch (err) {
    console.error('addBlog error:', err);
    throw err;
  }
}

// === UPDATE existing blog (admin only) ===
export async function updateBlog(blogId, blogData) {
  try {
    const body = { id: blogId, ...blogData, apiKey: SHARED_KEY };
    const res = await fetch(BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to update blog');
    return json;
  } catch (err) {
    console.error('updateBlog error:', err);
    throw err;
  }
}

// === DELETE blog (admin only) ===
export async function deleteBlog(blogId) {
  try {
    const body = { id: blogId, apiKey: SHARED_KEY };
    const res = await fetch(BASE, {
      method: 'DELETE',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to delete blog');
    return json;
  } catch (err) {
    console.error('deleteBlog error:', err);
    throw err;
  }
}

// === GET comments for a blog ===
export async function getComments(blogId) {
  try {
    const url = `${BASE}?blogId=${encodeURIComponent(blogId)}`;
    const res = await fetch(url, { method: 'GET' });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to fetch comments');
    return json.data.filter(c => c.blogId === blogId);
  } catch (err) {
    console.error('getComments error:', err);
    throw err;
  }
}

// === ADD comment to a blog ===
export async function addComment(comment) {
  try {
    const body = { ...comment }; // comments don't need admin key
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Failed to add comment');
    return json;
  } catch (err) {
    console.error('addComment error:', err);
    throw err;
  }
}
