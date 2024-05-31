<img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/rates.png" width="600px" height="300" />
<p>I developed an export business automation web app based on NextJS and Tailwind CSS as a self-challenge using Nestjs as the backend.</p>

### Built With
- Nextjs
- Tailwind
- Nestjs
- MongoDB
- Redis

### Project Overview
I developed this software to facilitate the people who belong to the export business. This solution will eradicate the hectic activity of calculating the prices in different currencies and they put their time and effort into performing this calculation on daily basis. This is version 1.0 which is more like an MVP, and looking forward to extending it in the future.

### Screens 
**Users & Authentication**

<table>
  <tr>
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/signin.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/signup.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/forget.png" width="400px" height="200" /></td>
  </tr>
  <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/users.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/profile.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/upload.png" width="400px" height="200" /></td>
  </tr>
</table>
<p>User authentication & authorization is implemented using the following:</p>

- <a href="https://next-auth.js.org/getting-started/example">next-auth</a>
- Google OAuth
- <a href="https://sendgrid.com/en-us">SendGrid</a> for sending code via email for password reset.


**Rates Management**

<table>
  <tr>
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/rates.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/items.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/CM.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/shipping.png" width="400px" height="200" /></td>
</table>

This module lets users enter the pricing of raw materials and shipping companies. In addition, users can set the profit margins attached to every item they manufacture.

**Price Generator**
This tool is an integral part of this application where users can enter their order details along with foreign currency rate and with a single click they will be presented with the in-house production cost along with the price in foreign currency. 
<table>
  <tr>
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/price.png" width="600px" height="300" /></td>

</table>
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




