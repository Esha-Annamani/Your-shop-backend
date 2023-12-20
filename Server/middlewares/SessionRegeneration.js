const session = require('express-session');
const express = require("express");

const sessionRegeneration=(req, res, next) =>{

    // Check if the user is authenticated and the session is active
    if (req.session) {

      // Calculate the time remaining before the session expires
      const currentTime = new Date().getTime();
      const sessionExpirationTime = req.session.cookie.expires.getTime();
  
      if (sessionExpirationTime - currentTime < 300000) {
        // Regenerate the session by resetting the expiration time
        req.session.cookie.expires = new Date(Date.now() + 24* 60* 60000); // Extend by 1 day
        
        req.session.save();
      }
    }
  
    next();
  }
  
  module.exports = sessionRegeneration