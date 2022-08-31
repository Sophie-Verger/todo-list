const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const { off } = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.createAnUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(error, hash) {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur hash." });
        }
        else {
            req.body.password = hash;

            let newUser = new User(req.body);
        
            newUser.save((error, user) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({ message: "Erreur serveur." });
                }
                else {
                    res.status(201);
                    // res.json({message: "Utilisateur crée: " + user.email});
                    res.json({ message: `Utilisateur crée: ${user.email}` });
                    console.log(user);
                }
            });
        }
    });
}

exports.loginAnUser = (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    let userData = {
                        email: user.email,
                        //role: "user"
                        role: user.role,
                    }
    
                    jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30 days' }, (error, token) => {
                        if (error) {
                            res.status(400);
                            console.log(error);
                            res.json({ message: "Impossible de génerer un token." });
                        }
                        else {
                            res.json({token});
                        }
                    });
                }
                else {
                    res.status(400);
                    console.log(error);
                    res.json({ message: "Mot de passe ou email erroné." });
                }
            });
        }
    });
}

exports.listAllUsers = (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(users);
        }
    });
}

exports.getAUser = (req, res) => {
    User.findById(req.params.user_id, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(user);
        }
    });
}

exports.updateAUser = (req, res) => {
    User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(user);
        }
    });
}

exports.deleteAUser = (req, res) => {
    User.findByIdAndRemove(req.params.user_id, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json({message: "User supprimé"});
        }
    });
}
