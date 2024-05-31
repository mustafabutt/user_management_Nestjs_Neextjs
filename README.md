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
- <a href="https://www.npmjs.com/package/cookies-next">cookies-next</a>. For keeping JWT tokens in cookies.
- Users can upload their profile picture using a drag & drop interface.
- User Roles


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
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/calculate.png" width="350px" height="200" /></td>
</table>

**Order & Invoice Management**

This module enable users enter their the data of the clients along with their order details. Once an order is created, you can download the invoice of the order in PDF file format to share with your client.  

<table>
  <tr>
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/OM.png" width="400px" height="200" /></td>
<td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/OL.png" width="400px" height="200" /></td>
    <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/CO.png" width="400px" height="200" /></td>
        <td><img src="https://github.com/mustafabutt/export_intelligence/blob/main/screens/invoices.png" width="400px" height="200" /></td>
</table>

 ### Getting Started

 **Prerequisites**

 - Node.js
 - Git
 - MongoDB
 - Redis

**Installation**

1. Clone this repo.
3. Start the Redis server.
4. Go into the root directory and run the following commands to run the backend server:
- _npm install_ 
- _npm run start:dev_
5. Open another terminal and run the following commands:
- _npm install_
- _npm run dev_
<p>Now, open the application in the web browser by navigating to http://localhost:3000/.</p>

<p>You can use the default credentials to log in as an admin.</p>

**email**: test@gmail.com

**password**: qwerty




