import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getUsers(token) {
  console.log("users called")
  let t = '';
  if (token == '')
    t =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzk1MDA1OTQsImV4cCI6MTYzOTU2MDU5NH0.5yThfRdN7OEwnTY_YsQ7SkX5m4nfmCKro_-uELRUZqM';
  else t = token;
  const res = await fetch('http://localhost:3001/users', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + t,
    },
  });
  const data = await res.json();
  return data;
}

export async function login() {
  const res = await fetch('http://localhost:3001/auth/login ', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
