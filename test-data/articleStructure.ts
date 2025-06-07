import { expect } from '@playwright/test';

export const expectedArticleObjectStructure = {
  slug: expect.any(String),
  title: expect.any(String),
  description: expect.any(String),
  body: expect.any(String),
  tagList: expect.any(Array),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  favorited: expect.any(Boolean),
  favoritesCount: expect.any(Number),
  author: {
    username: expect.any(String),
    bio: null,
    image: expect.any(String),
    following: expect.any(Boolean),
  },
};

export default expectedArticleObjectStructure
