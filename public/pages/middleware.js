import { NextResponse } from 'next/server';
import {UserService} from "@/services/user.service";


export default function authMiddleware(url) {
    
    const innerURL = url.asPath;
    const publicPaths = ['/login', '/signup','/forget'];
    const path = innerURL.split('?')[0];
    if (!UserService().isUserLoggedIn() && !publicPaths.includes(path))
        url.push({ pathname: "/login"})
        else if(UserService().isUserLoggedIn()){
        if(UserService().isAdmin){
            if(publicPaths.includes("/dashboard"))
                url.push({ pathname: "/dashboard"})
            if(publicPaths.includes("/rates"))
                url.push({ pathname: "/rates"})
        } 
        else
            url.push({ pathname: "/"})
    }
}