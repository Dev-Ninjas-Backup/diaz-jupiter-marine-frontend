export interface BlogApiResponse {
  id: string;
  blogTitle: string;
  blogDescription: string;
  sharedLink: string;
  readTime: number;
  postStatus: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  pageViewCount?: number;
  blogImage?: {
    url: string;
  };
}

export interface BlogDetails {
  id: string;
  blogTitle: string;
  blogDescription: string;
  sharedLink: string;
  readTime: number;
  postStatus: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  pageViewCount: number;
  blogImage?: {
    url: string;
    mimeType: string;
  };
}

export const getBlogs = async (): Promise<BlogApiResponse[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/blogs`, {
      method: 'GET',
      next: { tags: ['BLOGS'] },
    });

    if (!res.ok) {
      throw new Error(`Blog fetch failed: ${res.status}`);
    }

    const allBlogs: BlogApiResponse[] = await res.json();
    // Filter only published blogs for public view
    return allBlogs.filter(blog => blog.postStatus === 'PUBLISHED');
  } catch (error) {
    console.error('Blog API Error:', error);
    throw new Error('Failed to load blogs');
  }
};

export const getBlogDetails = async (id: string): Promise<BlogDetails> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    method: 'GET',
    next: { tags: ['BLOG_DETAILS'] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog details: ${res.status}`);
  }

  return res.json();
};
