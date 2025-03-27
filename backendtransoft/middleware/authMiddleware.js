// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';



export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token,process.env.TOKEN_KEY,(err, User)=>{
               if (err) {
                return res.status(403).json({ message: 'Token invalide.' });
                 req.User = User;
                        } 
                          next(); 
                                                           })
                         }else{
                             return res.status(401).json({ message: 'Accès refusé. Token non fourni.' });

                         }

    
  };
  
 // jwt.verify('<votre_token>', process.env.JWT_SECRET, (err, decoded) => {
  //  if (err) console.error('Token invalide', err);
  //  else console.log('Token valide', decoded);
  //});
