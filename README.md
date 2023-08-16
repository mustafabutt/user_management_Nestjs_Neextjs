                        Instructions

This is a working sign in/sign up module built using the following stack:
 <br />
Nestjs <br />
MongoDB <br />
Redis <br />
Nextjs <br />

It uses JWT tokens and built-in JwtAuthGuard. 

Make sure you have installed Nodejs, Redis and MongoDB.
Clone the source code and run the following commands in to the root directory. 

First, start the Redis server by running the following command

**redis-server**

npm install <br />
npm run start
make request 
localhost:3001/auth/login
{
"username":"mustafa butt",
"password": "qwerty"
}

After that run the following commands to start the cleint server 

cd public/nextjs-blog<br />
npm install <br />
npm run dev

Now open app in thee browser http://localhost:3000/




